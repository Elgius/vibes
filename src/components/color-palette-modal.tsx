"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Palette,
  Sparkles,
  Zap,
  Heart,
  Sun,
  Moon,
  Cloud,
  Info,
} from "lucide-react";

interface ColorPaletteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (palette: string) => void;
}

const palettes = [
  {
    id: "vibrant",
    name: "Rose Quartz Energy",
    description:
      "Like the vibrant energy of rose quartz, perfect for when you're feeling confident and ready to manifest love! This crystal-inspired theme brings warmth and passion to your analysis.",
    icon: Zap,
    colors: {
      primary: "oklch(0.6 0.2 350)", // Rose quartz pink
      accent: "oklch(0.6 0.15 300)", // Amethyst purple
    },
  },
  {
    id: "romantic",
    name: "Moonstone Magic",
    description:
      "Channel the gentle energy of moonstone, ideal for when you're feeling sentimental and hopeful. This theme brings intuitive insights and emotional clarity to your analysis.",
    icon: Heart,
    colors: {
      primary: "oklch(0.6 0.2 350)", // Moonstone blue
      accent: "oklch(0.6 0.15 300)", // Opal iridescence
    },
  },
  {
    id: "sunny",
    name: "Citrine Sunshine",
    description:
      "Embrace the bright energy of citrine, perfect for manifesting positivity and abundance in your relationships. This theme brings warmth and optimism to your analysis.",
    icon: Sun,
    colors: {
      primary: "oklch(0.6 0.2 50)", // Citrine yellow
      accent: "oklch(0.6 0.15 100)", // Carnelian orange
    },
  },
  {
    id: "mystical",
    name: "Amethyst Insight",
    description:
      "Tap into the deep wisdom of amethyst, perfect for spiritual growth and intuitive understanding. This theme brings mystical depth to your relationship analysis.",
    icon: Moon,
    colors: {
      primary: "oklch(0.6 0.2 300)", // Amethyst purple
      accent: "oklch(0.6 0.15 250)", // Lapis lazuli blue
    },
  },
  {
    id: "serene",
    name: "Aquamarine Calm",
    description:
      "Experience the soothing energy of aquamarine, perfect for finding clarity and emotional balance. This theme brings peaceful wisdom to your relationship analysis.",
    icon: Cloud,
    colors: {
      primary: "oklch(0.6 0.2 200)", // Aquamarine blue
      accent: "oklch(0.6 0.15 150)", // Amazonite green
    },
  },
];

export default function ColorPaletteModal({
  open,
  onOpenChange,
  onSelect,
}: ColorPaletteModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Choose Your Mood Palette
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          <TooltipProvider>
            {palettes.map((palette) => (
              <div key={palette.id} className="flex gap-2 items-center">
                <Button
                  variant="outline"
                  className="flex-1 flex items-center gap-3 p-3 h-auto"
                  onClick={() => onSelect(palette.id)}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                    <palette.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">{palette.name}</span>
                </Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 text-muted-foreground hover:text-foreground"
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-[200px]">
                    <p>{palette.description}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </TooltipProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
