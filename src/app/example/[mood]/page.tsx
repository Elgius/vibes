"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnalysisCard from "@/components/analysiscard";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

const moodIcons = {
  vibrant: "⚡",
  romantic: "💕",
  sunny: "☀️",
  mystical: "🌙",
  serene: "☁️",
};

const moodTitles = {
  vibrant: "Your Situationship Analysis",
  romantic: "Your Love Story Analysis",
  sunny: "Your Relationship Analysis",
  mystical: "Your Connection Analysis",
  serene: "Your Bond Analysis",
};

const moodDescriptions = {
  vibrant: "Here's the breakdown of your situation ⚡",
  romantic: "Here's the story of your connection 💕",
  sunny: "Here's the bright side of your situation ☀️",
  mystical: "Here's the deeper meaning of your connection 🌙",
  serene: "Here's the peaceful perspective on your situation ☁️",
};

export default function ExamplePage() {
  const params = useParams();
  const mood = params.mood as keyof typeof moodIcons;

  useEffect(() => {
    // Ensure the correct theme is applied
    document.documentElement.setAttribute("data-theme", mood);
  }, [mood]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-start)] to-[var(--gradient-end)]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/">
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
              <span className="text-4xl">{moodIcons[mood]}</span>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                {moodTitles[mood]}
              </h1>
              <span className="text-4xl">{moodIcons[mood]}</span>
            </div>
            <p className="text-lg text-muted-foreground">
              {moodDescriptions[mood]}
            </p>
          </div>

          <div className="space-y-8">
            <AnalysisCard
              title="Your Current Situation"
              content="Let's take a moment to understand where you are right now. Every relationship journey is unique, and your feelings are valid. Whether you're feeling hopeful, confused, or somewhere in between, we're here to help you make sense of it all.

Take a deep breath and know that you're not alone in this. Many people have been where you are, and there's always a way forward that honors your needs and feelings."
              className="border-primary/20"
            />

            <AnalysisCard
              title="The Real Talk"
              content="It's time for some honest reflection. Situationships can be tricky to navigate because they often exist in that gray area between casual dating and a committed relationship. 

The key is to understand what you truly want and need from this connection. Are you looking for something more defined? Or are you comfortable with how things are? There's no right or wrong answer - it's about what feels right for you."
              className="border-accent/20"
            />

            <AnalysisCard
              title="Moving Forward"
              content="Here's your personalized action plan:

1. Reflect on Your Needs
   - What do you truly want from this connection?
   - What are your non-negotiables?
   - What are you willing to compromise on?

2. Communication is Key
   - Find a comfortable way to express your feelings
   - Be honest with yourself and your partner
   - Listen actively to their perspective

3. Set Your Boundaries
   - Know your limits
   - Communicate them clearly
   - Stick to them

4. Take Care of Yourself
   - Practice self-care
   - Maintain your independence
   - Keep your support system close

5. Be Open to All Possibilities
   - The conversation might go better than expected
   - You might discover new aspects of yourself
   - Growth often comes from challenging situations

Remember: You deserve a relationship that makes you feel valued, respected, and happy. Trust your instincts and know that whatever happens, you have the strength to handle it."
              className="border-primary/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
