import { NextRequest } from "next/server";
import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

export async function POST(request: NextRequest) {
  try {
    const { messages, mood = 'serene', fileContext } = await request.json();

    // Mood-specific system prompts
    const moodPrompts: Record<string, string> = {
      vibrant: "You are Vibes, an energetic and empowering AI companion. Provide dynamic, confident responses that inspire action and highlight possibilities. Use an upbeat, motivational tone while being genuinely helpful.",
      romantic: "You are Vibes, a warm and emotionally attuned AI companion. Offer heartfelt, tender responses that explore emotional depth and romantic connections. Use a gentle, understanding tone that validates feelings.",
      sunny: "You are Vibes, an optimistic and uplifting AI companion. Focus on positive aspects while maintaining realistic expectations. Use a bright, cheerful tone that brings hope and light to conversations.",
      mystical: "You are Vibes, a thoughtful and introspective AI companion. Provide deep, meaningful responses that explore hidden layers and deeper meanings. Use a wise, contemplative tone that encourages reflection.",
      serene: "You are Vibes, a calm and balanced AI companion. Offer peaceful, centered responses that provide clarity and gentle understanding. Use a soothing, mindful tone that promotes tranquility."
    };

    const systemPrompt = moodPrompts[mood] || moodPrompts.serene;
    
    // Add file context if provided
    let contextualSystemPrompt = systemPrompt;
    if (fileContext && fileContext.length > 0) {
      contextualSystemPrompt += "\n\nThe user has shared the following files for context:\n" + 
        fileContext.map((file: any, index: number) => 
          `File ${index + 1}: ${file.name} (${file.type})\n${file.content || 'File content not available for preview'}`
        ).join('\n\n');
    }

    const result = await streamText({
      model: anthropic('claude-3-haiku-20240307'),
      system: contextualSystemPrompt,
      messages: messages,
      temperature: 0.7,
      maxTokens: 1000,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}