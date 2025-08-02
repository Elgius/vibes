import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { messages, mood } = await request.json();

    // Create a readable stream for the response
    const stream = new ReadableStream({
      async start(controller) {
        // Boilerplate streaming data based on mood
        const boilerplateResponses: Record<string, string[]> = {
          vibrant: [
            "Hey there! I can feel your energy! ",
            "You're radiating such vibrant vibes right now. ",
            "Let's channel this dynamic energy into understanding your situation better. ",
            "What's got you feeling so energized today?"
          ],
          romantic: [
            "I sense there's something special on your heart. ",
            "Love and connection are such beautiful, complex feelings. ",
            "Let's explore these romantic emotions together. ",
            "Tell me more about what's stirring in your heart."
          ],
          sunny: [
            "Your optimism is shining through! ",
            "There's something wonderfully bright about your energy today. ",
            "Let's look at the sunny side of your situation together. ",
            "What's bringing this positive glow to your day?"
          ],
          mystical: [
            "I feel there are deeper layers to explore here. ",
            "Sometimes the universe speaks in mysterious ways. ",
            "Let's unravel the hidden meanings together. ",
            "What mysteries are you hoping to understand?"
          ],
          serene: [
            "I appreciate the calm energy you're bringing. ",
            "There's a peaceful clarity in your approach. ",
            "Let's explore your thoughts with gentle understanding. ",
            "What's helping you maintain this centered feeling?"
          ],
        };

        const responses = boilerplateResponses[mood] || [
          "I'm here to listen and understand. ",
          "Your feelings are valid and important. ",
          "Let's explore this together. ",
          "Tell me more about what you're experiencing."
        ];

        // Simulate streaming by sending each sentence with a delay
        for (const sentence of responses) {
          const encoder = new TextEncoder();
          controller.enqueue(encoder.encode(sentence));
          
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Close the stream
        controller.close();
      },
    });

    // Return the stream as the response
    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Error in chat route:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}