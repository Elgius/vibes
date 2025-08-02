import { NextRequest } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('[API Route] Received request body:', JSON.stringify(body, null, 2));
    
    const {
      messages,
      mood = "serene",
    }: { messages: UIMessage[]; mood?: string } = body;
    
    console.log('[API Route] Messages count:', messages.length);
    console.log('[API Route] Last message:', JSON.stringify(messages[messages.length - 1], null, 2));

    // Mood-specific system prompts
    const moodPrompts: Record<string, string> = {
      vibrant:
        "You are Vibes, an energetic and empowering AI companion. Provide dynamic, confident responses that inspire action and highlight possibilities. Use an upbeat, motivational tone while being genuinely helpful.",
      romantic:
        "You are Vibes, a warm and emotionally attuned AI companion. Offer heartfelt, tender responses that explore emotional depth and romantic connections. Use a gentle, understanding tone that validates feelings.",
      sunny:
        "You are Vibes, an optimistic and uplifting AI companion. Focus on positive aspects while maintaining realistic expectations. Use a bright, cheerful tone that brings hope and light to conversations.",
      mystical:
        "You are Vibes, a thoughtful and introspective AI companion. Provide deep, meaningful responses that explore hidden layers and deeper meanings. Use a wise, contemplative tone that encourages reflection.",
      serene:
        "You are Vibes, a calm and balanced AI companion. Offer peaceful, centered responses that provide clarity and gentle understanding. Use a soothing, mindful tone that promotes tranquility.",
    };

    const systemPrompt = moodPrompts[mood] || moodPrompts.serene;

    // Process messages for AI SDK format
    const processedMessages = messages.map((message: any, index: number) => {
      console.log(`[API Route] Processing message ${index}:`, {
        role: message.role,
        hasParts: !!message.parts,
        partsCount: message.parts?.length
      });
      
      // Check if message has parts (AI SDK 5.0 format)
      if (message.parts && Array.isArray(message.parts)) {
        // Convert parts to AI SDK expected content format
        const content: any[] = [];
        
        message.parts.forEach((part: any, partIndex: number) => {
          console.log(`[API Route] Processing part ${partIndex}:`, {
            type: part.type,
            ...(part.type === 'image' ? { imageLength: part.image?.length } : { text: part.text })
          });
          
          if (part.type === 'text') {
            content.push({
              type: 'text',
              text: part.text
            });
          } else if (part.type === 'image' && part.image) {
            // Convert base64 data URL to format expected by AI SDK
            content.push({
              type: 'image',
              image: part.image
            });
          }
        });
        
        console.log(`[API Route] Message ${index} processed content:`, {
          contentLength: content.length,
          contentTypes: content.map(c => c.type)
        });
        
        return {
          ...message,
          content: content
        };
      }
      
      // For messages without parts, keep as is
      return message;
    });
    
    console.log('[API Route] All messages processed, converting to model messages');
    console.log('[API Route] Processed messages:', JSON.stringify(processedMessages, null, 2));

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages: processedMessages,
      temperature: 0.7,
    });

    return result.toUIMessageStreamResponse({
      getErrorMessage: (error) => {
        if (error == null) {
          return "Unknown error occurred";
        }

        if (typeof error === "string") {
          return error;
        }

        if (error instanceof Error) {
          return error.message;
        }

        return "Something went wrong. Please try again.";
      },
    });
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
