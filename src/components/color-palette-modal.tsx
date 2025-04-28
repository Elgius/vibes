"use client";

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
import { Palette, Zap, Heart, Sun, Moon, Cloud, Info } from "lucide-react";
import { useColorPalette } from "@/context/color-palette-context";

interface ColorPaletteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const palettes = [
  {
    id: "vibrant",
    name: "Vibrant Energy",
    description:
      "Bold and dynamic, perfect for when you're feeling confident and ready to take on the world!",
    icon: Zap,
    colors: {
      primary: "oklch(0.6 0.2 250)", // Vibrant blue
      accent: "oklch(0.6 0.15 200)", // Teal
    },
  },
  {
    id: "romantic",
    name: "Romantic Vibes",
    description:
      "Soft and dreamy, ideal for when you're feeling sentimental and hopeful.",
    icon: Heart,
    colors: {
      primary: "oklch(0.6 0.2 350)", // Pink
      accent: "oklch(0.6 0.15 300)", // Purple
    },
  },
  {
    id: "sunny",
    name: "Sunny Outlook",
    description:
      "Bright and cheerful, great for when you're feeling optimistic and positive!",
    icon: Sun,
    colors: {
      primary: "oklch(0.6 0.2 50)", // Yellow
      accent: "oklch(0.6 0.15 100)", // Orange
    },
  },
  {
    id: "mystical",
    name: "Mystical Mood",
    description:
      "Deep and mysterious, perfect for when you're feeling introspective and thoughtful.",
    icon: Moon,
    colors: {
      primary: "oklch(0.6 0.2 300)", // Purple
      accent: "oklch(0.6 0.15 250)", // Indigo
    },
  },
  {
    id: "serene",
    name: "Serene State",
    description:
      "Calm and peaceful, ideal for when you're feeling balanced and centered.",
    icon: Cloud,
    colors: {
      primary: "oklch(0.6 0.2 200)", // Teal
      accent: "oklch(0.6 0.15 150)", // Mint
    },
  },
];

export default function ColorPaletteModal({
  open,
  onOpenChange,
}: ColorPaletteModalProps) {
  const { setCurrentPalette } = useColorPalette();

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
                  onClick={() => {
                    setCurrentPalette(palette.id as any);
                    onOpenChange(false);
                  }}
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
