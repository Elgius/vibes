"use client";

import { useState, useEffect } from "react";
import SituationshipForm from "@/components/situationship-form";
import ColorPaletteModal from "@/components/color-palette-modal";
import { Palette, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import Link from "next/link";

type MoodType = "vibrant" | "romantic" | "sunny" | "mystical" | "serene";

interface MoodContent {
  title: string;
  subtitle: string;
}

const moodContent: Record<MoodType, MoodContent> = {
  vibrant: {
    title: "Rose Quartz Love Guide",
    subtitle:
      "Channel the loving energy of rose quartz to manifest clarity and passion in your connection.",
  },
  romantic: {
    title: "Moonstone Intuition",
    subtitle:
      "Let moonstone's gentle energy guide you to deeper emotional understanding and connection.",
  },
  sunny: {
    title: "Citrine Abundance",
    subtitle:
      "Harness citrine's bright energy to attract positive relationship energy and manifest your desires.",
  },
  mystical: {
    title: "Amethyst Wisdom",
    subtitle:
      "Tap into amethyst's spiritual energy for deeper insights into your relationship journey.",
  },
  serene: {
    title: "Aquamarine Clarity",
    subtitle:
      "Find peace and emotional balance through aquamarine's soothing energy and wisdom.",
  },
};

export default function Search() {
  const [showPaletteModal, setShowPaletteModal] = useState(false);
  const [currentPalette, setCurrentPalette] = useState<MoodType>("romantic");

  useEffect(() => {
    // Check if user has already selected a palette
    const savedPalette = localStorage.getItem("selectedPalette");
    if (savedPalette) {
      setCurrentPalette(savedPalette as MoodType);
      document.documentElement.setAttribute("data-theme", savedPalette);
    } else {
      setShowPaletteModal(true);
    }
  }, []);

  const handlePaletteChange = (palette: string) => {
    setCurrentPalette(palette as MoodType);
    document.documentElement.setAttribute("data-theme", palette);
    localStorage.setItem("selectedPalette", palette);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-start)] to-[var(--gradient-end)]">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPaletteModal(true)}
                className="flex items-center gap-2"
              >
                <Palette className="w-4 h-4" />
                Change Mood
              </Button>
            </div>

            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                {moodContent[currentPalette].title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {moodContent[currentPalette].subtitle}
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border/50">
              <SituationshipForm />
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border/50">
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground">
                  Difficulties in coming up with words? Look at the community
                  section to see what others like yourself are feeling.
                </p>
                <div className="flex justify-center mt-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" className="group relative">
                          Community
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Coming soon</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>

            {/* Mood Explanations Section */}
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border/50">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">
                  Understanding the Moods
                </h2>
                <p className="text-center text-muted-foreground">
                  Each mood offers a unique lens through which to view your
                  relationship situation. Choose the one that best matches your
                  current emotional state or the perspective you're seeking.
                </p>
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-primary">
                      ⚡ Vibrant
                    </h3>
                    <p className="text-muted-foreground">
                      Perfect for when you're feeling energetic and ready to
                      take action. This mood provides bold, confident insights
                      that help you see the dynamic potential in your
                      connection. It's ideal for those who want straightforward,
                      empowering advice.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-primary">
                      💕 Romantic
                    </h3>
                    <p className="text-muted-foreground">
                      When your heart is leading the way, this mood offers
                      tender, heartfelt perspectives. It's designed for those
                      who want to explore the emotional depth and romantic
                      possibilities in their connection.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-primary">
                      ☀️ Sunny
                    </h3>
                    <p className="text-muted-foreground">
                      For those seeking optimism and hope. This mood provides
                      uplifting, positive insights that focus on the bright side
                      of your situation while maintaining realistic
                      expectations.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-primary">
                      🌙 Mystical
                    </h3>
                    <p className="text-muted-foreground">
                      When you're looking for deeper meaning and intuitive
                      understanding. This mood offers thoughtful, introspective
                      analysis that helps you explore the less obvious aspects
                      of your connection.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-primary">
                      ☁️ Serene
                    </h3>
                    <p className="text-muted-foreground">
                      For moments when you need calm, balanced perspective. This
                      mood provides gentle, centered insights that help you find
                      clarity and peace in your situation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Example Cards Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-center">
                See How Different Moods Affect Your Analysis
              </h2>
              <p className="text-center text-muted-foreground mb-6">
                Each mood provides a unique perspective on your situation. Try
                them out!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(moodContent).map(([mood, content]) => (
                  <Link key={mood} href={`/example/${mood}`} className="block">
                    <div
                      className="bg-card/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer h-full"
                      onClick={() => {
                        document.documentElement.setAttribute(
                          "data-theme",
                          mood
                        );
                        localStorage.setItem("selectedPalette", mood);
                      }}
                    >
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold">
                          {content.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {content.subtitle}
                        </p>
                        <div className="flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary"
                          >
                            View Example
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ColorPaletteModal
          open={showPaletteModal}
          onOpenChange={setShowPaletteModal}
          onSelect={handlePaletteChange}
        />
      </div>
    </>
  );
}
