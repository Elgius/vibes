import { NextResponse } from "next/server";
import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import { litmus_agent_prompt } from '../../../../prompts';

export async function POST(request: Request) {
  if (request === null) {
    return NextResponse.json({ error: "Request is null" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { mood, message } = body;

    // First, check if the message has enough context using the litmus agent
    const contextCheck = await generateText({
      model: anthropic('claude-3-haiku-20240307'),
      prompt: `${litmus_agent_prompt}\n\nMessage to analyze: ${message}`,
    });

    // Parse the response to check if it has context
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(contextCheck.text);
    } catch {
      parsedResponse = { response: "context", explanation: "Unable to parse response" };
    }

    if (parsedResponse.response === "no context") {
      return NextResponse.json({
        response: "no context",
        explanation: parsedResponse.explanation || "Please provide more details about your relationship situation."
      });
    }

    // If there's context, generate the analysis based on mood
    const moodPrompts: Record<string, string> = {
      vibrant: "Provide an energetic, empowering analysis that highlights dynamic possibilities and encourages confident action.",
      romantic: "Offer a heartfelt, emotionally attuned analysis that explores the romantic depth and emotional connections.",
      sunny: "Give an optimistic, uplifting analysis that focuses on positive aspects while maintaining realistic expectations.",
      mystical: "Provide a thoughtful, introspective analysis that explores deeper meanings and less obvious aspects.",
      serene: "Offer a calm, balanced analysis that provides clarity and peaceful perspective on the situation."
    };

    const analysisPrompt = `You are a relationship expert providing ${mood} advice. 
    ${moodPrompts[mood] || "Provide thoughtful relationship advice."}
    
    User's situation: ${message}
    
    Provide a helpful, supportive analysis of their situation.`;

    const analysis = await generateText({
      model: anthropic('claude-3-haiku-20240307'),
      prompt: analysisPrompt,
    });

    return NextResponse.json({
      response: "context",
      analysis: analysis.text,
      mood: mood
    });
  } catch (error) {
    console.error("Error in analyze route:", error);
    return NextResponse.json(
      { error: "Failed to analyze situation" },
      { status: 500 }
    );
  }
}
