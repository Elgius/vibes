"use client";

import { useState } from "react";
import SituationshipForm from "@/components/situationship-form";
import ColorPaletteModal from "@/components/color-palette-modal";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useColorPalette } from "@/context/color-palette-context";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const moodContent = {
  vibrant: {
    title: "Vibrant Energy Analysis",
    subtitle: "Get bold, dynamic insights about your situation",
  },
  romantic: {
    title: "Romantic Vibes Analysis",
    subtitle: "Explore the emotional depth of your connection",
  },
  sunny: {
    title: "Sunny Outlook Analysis",
    subtitle: "Find the bright side of your relationship",
  },
  mystical: {
    title: "Mystical Mood Analysis",
    subtitle: "Unravel the deeper meaning of your connection",
  },
  serene: {
    title: "Serene State Analysis",
    subtitle: "Gain a peaceful perspective on your situation",
  },
};

export default function Search() {
  const [showPaletteModal, setShowPaletteModal] = useState(false);
  const { currentPalette } = useColorPalette();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-start)] to-[var(--gradient-end)]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPaletteModal(true)}
              className="flex items-center gap-2"
            >
              <Palette className="w-4 h-4" />
              Change Mood
            </Button>
            <Button
              variant="secondary"
              size="sm"
              asChild
              className="flex items-center gap-2"
            >
              <Link href="/mood_example">what are moods?</Link>
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
        </div>
      </div>

      <ColorPaletteModal
        open={showPaletteModal}
        onOpenChange={setShowPaletteModal}
      />
    </div>
  );
}
