"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const analysisData = {
  mood: "vibrant",
  icon: "⚡",
  title: "Your Situationship Analysis",
  description: "Here's the breakdown of your situation ⚡",
  cards: [
    {
      title: "Your Current Situation",
      content:
        "Let's take a moment to understand where you are right now. Every relationship journey is unique, and your feelings are valid. Whether you're feeling hopeful, confused, or somewhere in between, we're here to help you make sense of it all.\n\nTake a deep breath and know that you're not alone in this. Many people have been where you are, and there's always a way forward that honors your needs and feelings.",
    },
    {
      title: "The Real Talk",
      content:
        "It's time for some honest reflection. Situationships can be tricky to navigate because they often exist in that gray area between casual dating and a committed relationship. \n\nThe key is to understand what you truly want and need from this connection. Are you looking for something more defined? Or are you comfortable with how things are? There's no right or wrong answer - it's about what feels right for you.",
    },
    {
      title: "Moving Forward",
      content:
        "Here's your personalized action plan:\n\n1. Reflect on Your Needs\n   - What do you truly want from this connection?\n   - What are your non-negotiables?\n   - What are you willing to compromise on?\n\n2. Communication is Key\n   - Find a comfortable way to express your feelings\n   - Be honest with yourself and your partner\n   - Listen actively to their perspective\n\n3. Set Your Boundaries\n   - Know your limits\n   - Communicate them clearly\n   - Stick to them\n\n4. Take Care of Yourself\n   - Practice self-care\n   - Maintain your independence\n   - Keep your support system close\n\n5. Be Open to All Possibilities\n   - The conversation might go better than expected\n   - You might discover new aspects of yourself\n   - Growth often comes from challenging situations\n\nRemember: You deserve a relationship that makes you feel valued, respected, and happy. Trust your instincts and know that whatever happens, you have the strength to handle it.",
    },
  ],
};

export default function ResultPage() {
  useEffect(() => {
    // Apply the mood theme
    document.documentElement.setAttribute("data-theme", analysisData.mood);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-start)] to-[var(--gradient-end)]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/search">
              <Button
                variant="ghost"
                className="pl-0 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to form
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-4xl">{analysisData.icon}</span>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                {analysisData.title}
              </h1>
              <span className="text-4xl">{analysisData.icon}</span>
            </div>
            <p className="text-lg text-muted-foreground">
              {analysisData.description}
            </p>
          </div>

          <div className="space-y-6">
            {analysisData.cards.map((card, index) => (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border/50"
              >
                <h2 className="text-2xl font-bold mb-4 text-primary">
                  {card.title}
                </h2>
                <div className="prose prose-invert max-w-none">
                  {card.content.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="text-muted-foreground mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
