"use client";

import { useState, useEffect } from "react";
import SituationshipForm from "@/components/situationship-form";
import ColorPaletteModal from "@/components/color-palette-modal";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

type MoodType = "vibrant" | "romantic" | "sunny" | "mystical" | "serene";

interface MoodContent {
  title: string;
  subtitle: string;
}

const moodContent: Record<MoodType, MoodContent> = {
  vibrant: {
    title: "Spark Your Situationship",
    subtitle:
      "Let's analyze your dynamic connection with bold insights and confident perspectives!",
  },
  romantic: {
    title: "Love Story Analyzer",
    subtitle:
      "Uncover the romantic potential and heartfelt possibilities in your connection.",
  },
  sunny: {
    title: "Bright Relationship Insights",
    subtitle:
      "Get a positive perspective on your situation with uplifting and optimistic analysis.",
  },
  mystical: {
    title: "Relationship Oracle",
    subtitle:
      "Dive deep into the mysteries of your connection with thoughtful and intuitive insights.",
  },
  serene: {
    title: "Peaceful Connection Guide",
    subtitle:
      "Find clarity and balance in your relationship situation with calm, centered analysis.",
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
        </div>
      </div>

      <ColorPaletteModal
        open={showPaletteModal}
        onOpenChange={setShowPaletteModal}
        onSelect={handlePaletteChange}
      />
    </div>
  );
}
