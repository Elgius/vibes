"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowUp,
  Sparkles,
  User,
  Palette,
  Zap,
  Heart,
  Sun,
  Moon,
  Cloud,
  X,
  Volume2,
  VolumeX,
} from "lucide-react";
import Link from "next/link";
import { useColorPalette } from "@/context/color-palette-context";
import Contexts from "@/components/contexts";

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

export default function Main() {
  const [message, setMessage] = useState("");
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isContextsOpen, setIsContextsOpen] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const { currentPalette, setCurrentPalette } = useColorPalette();
  const [isMuted, setIsMuted] = useState(false);

  const handlePaletteClick = () => {
    // Close other drawers and open palette
    setIsContextsOpen(false);
    setIsPaletteOpen(true);
    setActiveButton("palette");
  };

  const handleClosePalette = () => {
    setIsPaletteOpen(false);
    setActiveButton(null);
  };

  const handleContextsClick = () => {
    // Close other drawers and open contexts
    setIsPaletteOpen(false);
    setIsContextsOpen(!isContextsOpen);
    setActiveButton(isContextsOpen ? null : "contexts");
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClosePalette();
    }
  };

  return (
    <div
      className={`min-h-screen flex relative ${
        currentPalette === "vibrant"
          ? "bg-blue-50"
          : currentPalette === "romantic"
          ? "bg-pink-50"
          : currentPalette === "sunny"
          ? "bg-yellow-50"
          : currentPalette === "mystical"
          ? "bg-purple-50"
          : currentPalette === "serene"
          ? "bg-teal-50"
          : "bg-[#f5f1e8]"
      }`}
    >
      <div className="absolute top-0 right-0 flex items-center gap-2 p-4 mr-10">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Community</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Coming soon</p>
            </TooltipContent>
          </Tooltip>
        </div>
        {isMuted ? (
          <VolumeX
            className={`w-6 h-6 text-[#6b7280]`}
            onClick={() => setIsMuted(!isMuted)}
          />
        ) : (
          <Volume2
            className={`w-6 h-6 text-[#059669]`}
            onClick={() => setIsMuted(!isMuted)}
          />
        )}
      </div>
      {/* Left Sidebar */}
      <div className="w-20 bg-[#f5f1e8] flex flex-col items-center py-6 space-y-8 border-r border-[#e5e7eb] z-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleContextsClick}
                className={`w-12 h-12 rounded-xl hover:bg-[#e5e7eb] text-[#6b7280] ${
                  activeButton === "contexts"
                    ? "bg-[#d1d5db]"
                    : "bg-transparent"
                }`}
              >
                <Sparkles className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Contexts</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePaletteClick}
                className={`w-12 h-12 rounded-xl hover:bg-[#e5e7eb] text-[#6b7280] ${
                  activeButton === "palette" ? "bg-[#d1d5db]" : "bg-transparent"
                }`}
              >
                <Palette className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Mood Palette</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-xl bg-transparent hover:bg-[#e5e7eb] text-[#6b7280]"
              >
                <User className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Sliding Palette Sidebar */}
      {isPaletteOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={handleOverlayClick}
        >
          <div
            className={`fixed left-20 top-0 h-full w-[420px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-hidden ${
              isPaletteOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-6 max-w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#2d5016] flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Choose Your Mood Palette
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClosePalette}
                  className="text-[#6b7280] hover:bg-[#e5e7eb]"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-3 max-w-full">
                {palettes.map((palette) => (
                  <div
                    key={palette.id}
                    className="w-full border border-[#e5e7eb] rounded-lg p-4 hover:bg-[#f9fafb] cursor-pointer transition-colors"
                    onClick={() => {
                      setCurrentPalette(palette.id as any);
                      handleClosePalette();
                    }}
                  >
                    <div className="flex items-start gap-3 max-w-full">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f3f4f6] flex-shrink-0">
                        <palette.icon className="w-5 h-5 text-[#6b7280]" />
                      </div>
                      <div className="flex-1 min-w-0 max-w-[300px]">
                        <div className="font-medium text-[#2d5016] mb-2 truncate">
                          {palette.name}
                        </div>
                        <div className="text-sm text-[#6b7280] leading-relaxed break-words hyphens-auto">
                          {palette.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex ">
        {/* Left Content Panel - Only show when Contexts is clicked */}
        {isContextsOpen && <Contexts />}

        {/* Right Chat Panel */}
        <div className="flex-1 flex flex-col border-l  border-[#e5e7eb]">
          {/* Chat Messages */}
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="max-w-2xl">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e5e7eb]">
                <p className="text-lg text-[#374151] leading-relaxed">
                  Welcome to vibes, please give me some context via screen shots
                  or type what you feel below and i can see how i can help you
                  analyse the situation.
                </p>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-8 pt-0">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="follow up questions"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-14 px-6 pr-14 text-lg bg-white border-2 border-[#e5e7eb] rounded-full placeholder:text-[#9ca3af] focus:border-[#059669] focus:ring-0"
                />
                <Button
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#e5e7eb] hover:bg-[#d1d5db] text-[#6b7280] rounded-full"
                >
                  <ArrowUp className="w-5 h-5" />
                </Button>
              </div>

              <p className="text-center text-sm text-[#6b7280]">
                By using vibes, you agree to our{" "}
                <Link href="#" className="text-[#059669] hover:underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-[#059669] hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
