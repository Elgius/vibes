"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Palette, Sparkles, Zap, Heart, Sun, Moon, Cloud } from "lucide-react";

interface ColorPaletteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (palette: string) => void;
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
        <div className="grid gap-4 py-4">
          {palettes.map((palette) => (
            <Button
              key={palette.id}
              variant="outline"
              className="flex items-center gap-4 p-4 h-auto"
              onClick={() => onSelect(palette.id)}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <palette.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium">{palette.name}</div>
                <div className="text-sm text-muted-foreground">
                  {palette.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
