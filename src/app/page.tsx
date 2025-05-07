"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Heart,
  Sparkles,
  Zap,
  Moon,
  Cloud,
  Palette,
} from "lucide-react";
import Link from "next/link";
import ColorPaletteModal from "@/components/color-palette-modal";

type MoodType = "vibrant" | "romantic" | "sunny" | "mystical" | "serene";

const features = [
  {
    icon: Heart,
    title: "Mood-Based Vibes",
    description:
      "Switch up the vibe! Pick a mood palette and see the app transform to match your energy.",
  },
  {
    icon: Sparkles,
    title: "Real Talk, Real Advice",
    description:
      "Share your situationship and get honest, supportive advice from a caring community.",
  },
  {
    icon: Zap,
    title: "Instant Insights",
    description:
      "No waiting around—get thoughtful, mood-matched feedback right away.",
  },
  {
    icon: Moon,
    title: "Private & Safe",
    description: "Your stories and feelings are respected and confidential.",
  },
  {
    icon: Cloud,
    title: "Emotional Intelligence",
    description:
      "We get the full spectrum of human emotions. Every vibe is welcome here!",
  },
];

const testimonials = [
  {
    quote:
      "Finally, someone who gets it! The analysis was spot-on and helped me see things clearly.",
    author: "Alex, 24",
  },
  {
    quote:
      "The mood-based approach made me feel understood. It's like having a friend who really gets modern dating.",
    author: "Jordan, 22",
  },
  {
    quote:
      "I was so confused about my situationship, but this helped me understand what I really want.",
    author: "Taylor, 27",
  },
];

export default function Home() {
  const router = useRouter();
  const [currentMood, setCurrentMood] = useState<MoodType>("romantic");
  const [showPaletteModal, setShowPaletteModal] = useState(false);

  useEffect(() => {
    const savedMood = localStorage.getItem("selectedPalette");
    if (savedMood) {
      setCurrentMood(savedMood as MoodType);
    }
  }, []);

  const handlePaletteChange = (palette: string) => {
    setCurrentMood(palette as MoodType);
    document.documentElement.setAttribute("data-theme", palette);
    localStorage.setItem("selectedPalette", palette);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-start)] to-[var(--gradient-end)]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center mb-6">
            {/* will use this logo later */}
            {/* <img
              src="/logo/vibeLogo.png"
              alt="Vibes Logo"
              style={{ height: "100px", width: "auto" }}
            /> */}
          </div>
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPaletteModal(true)}
              className="flex items-center gap-2"
            >
              <Palette className="w-4 h-4" />
              Set Your Mood
            </Button>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Spill the Vibes
          </h1>
          <h2
            className="text-2xl md:text-3xl font-semibold mb-2"
            style={{ letterSpacing: "0.05em" }}
          >
            Understand Your Situationship
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground">
            A safe, vibrant space to share your story, get advice, and connect
            with others. Choose your mood to personalize your experience!
          </p>
          <p className="text-lg text-muted-foreground">
            Choose your mood above to customize your experience and get insights
            that match how you're feeling right now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => router.push("/search")}
              className="group"
            >
              Start Your Analysis
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/search")}
            >
              How It Works
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-card/50 backdrop-blur-sm py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background/50 p-6 rounded-xl border border-border/50 space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          What People Are Saying
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50"
            >
              <p className="text-lg mb-4">"{testimonial.quote}"</p>
              <p className="text-sm text-muted-foreground">
                — {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-card/50 backdrop-blur-sm py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Spill the Vibes?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands who've found clarity, support, and a place to be real
            about their relationships.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Button
              size="lg"
              onClick={() => router.push("/search")}
              className="group"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowPaletteModal(true)}
              className="flex items-center gap-2"
            >
              <Palette className="w-4 h-4" />
              Change Your Mood First
            </Button>
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
