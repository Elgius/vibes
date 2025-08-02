import { NextRequest } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const {
      messages,
      mood = "serene",
    }: { messages: UIMessage[]; mood?: string } = await request.json();

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

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages: convertToModelMessages(messages),
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
