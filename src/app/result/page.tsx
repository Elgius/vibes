"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowUp,
  Volume2,
  VolumeX,
  Sparkles,
  User,
  Palette,
  Zap,
  Heart,
  Sun,
  Moon,
  Cloud,
  X,
} from "lucide-react";
import Link from "next/link";
import { useColorPalette } from "@/context/color-palette-context";

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
  const [isMuted, setIsMuted] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const { currentPalette, setCurrentPalette } = useColorPalette();

  const topicCards = [
    {
      title: "Find joy",
      image: "/placeholder.svg?height=120&width=120",
      className: "bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600",
    },
    {
      title: "Sympathy vs. empathy",
      image: "/placeholder.svg?height=120&width=120",
      className: "bg-gradient-to-br from-red-400 to-orange-500",
    },
    {
      title: "Get philosophical",
      image: "/placeholder.svg?height=120&width=120",
      className: "bg-gradient-to-br from-green-400 to-blue-500",
    },
  ];

  const handlePaletteClick = () => {
    setIsPaletteOpen(true);
  };

  const handleClosePalette = () => {
    setIsPaletteOpen(false);
  };

  const handleDiscoverClick = () => {
    setIsDiscoverOpen(!isDiscoverOpen);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClosePalette();
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8] flex relative">
      {/* Left Sidebar */}
      <div className="w-20 bg-[#f5f1e8] flex flex-col items-center py-6 space-y-8 border-r border-[#e5e7eb]">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDiscoverClick}
                className={`w-12 h-12 rounded-xl hover:bg-[#d1d5db] text-[#6b7280] ${
                  isDiscoverOpen ? "bg-[#d1d5db]" : "bg-[#e5e7eb]"
                }`}
              >
                <Sparkles className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Discover</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePaletteClick}
                className="w-12 h-12 rounded-xl bg-transparent hover:bg-[#e5e7eb] text-[#6b7280]"
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
            className={`fixed left-20 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
              isPaletteOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-6">
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

              <div className="space-y-3">
                {palettes.map((palette) => (
                  <Button
                    key={palette.id}
                    variant="outline"
                    className="w-full flex items-center gap-3 p-4 h-auto border-[#e5e7eb] hover:bg-[#f9fafb] text-left justify-start"
                    onClick={() => {
                      setCurrentPalette(palette.id as any);
                      handleClosePalette();
                    }}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f3f4f6]">
                      <palette.icon className="w-5 h-5 text-[#6b7280]" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-[#2d5016]">
                        {palette.name}
                      </div>
                      <div className="text-sm text-[#6b7280] mt-1">
                        {palette.description}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Content Panel - Only show when Discover is clicked */}
        {isDiscoverOpen && (
          <div className="w-96 p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-[#2d5016]">
                Good evening, <em className="font-serif">James</em>
              </h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="text-[#6b7280] hover:bg-[#e5e7eb]"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>
            </div>

            {/* Download History Card */}
            <Card className="bg-white border-[#e5e7eb] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#ff6b35] rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#ff6b35] rounded-full"></div>
                      <div className="w-1 h-1 bg-[#ff6b35] rounded-full ml-1"></div>
                      <div className="w-1 h-1 bg-[#ff6b35] rounded-full ml-1"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#2d5016] mb-2">
                      Download your past conversations with Vibes
                    </h3>
                    <Link
                      href="#"
                      className="text-[#059669] hover:underline font-medium"
                    >
                      Manage history
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Topic Cards */}
            <div className="grid grid-cols-2 gap-4">
              {topicCards.map((topic, index) => (
                <Card
                  key={index}
                  className="bg-white border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <CardContent className="p-0">
                    <div className="aspect-square relative overflow-hidden rounded-t-lg">
                      <img
                        src={topic.image || "/placeholder.svg"}
                        alt={topic.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-[#2d5016] text-sm">
                        {topic.title}
                      </h4>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Topic Card */}
            <Card className="bg-white border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-0">
                <div className="aspect-[2/1] relative overflow-hidden rounded-t-lg">
                  <img
                    src="/placeholder.svg?height=100&width=200"
                    alt="Additional topic"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Right Chat Panel */}
        <div className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="max-w-2xl">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e5e7eb]">
                <p className="text-lg text-[#374151] leading-relaxed">
                  I hear you have an important conversation coming up. I can
                  help you prepare for it by roleplaying. Can you please tell me
                  what it is about and who you'll be speaking with?
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
                  placeholder="Talk with Pi"
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
                By using Pi, you agree to our{" "}
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
