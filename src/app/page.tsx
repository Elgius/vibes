"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, Heart, Sparkles, Zap, Moon, Cloud } from "lucide-react";
import Link from "next/link";

type MoodType = "vibrant" | "romantic" | "sunny" | "mystical" | "serene";

const features = [
  {
    icon: Heart,
    title: "Mood-Based Analysis",
    description:
      "Get insights that match your current emotional state, whether you're feeling hopeful, confused, or ready for clarity.",
  },
  {
    icon: Sparkles,
    title: "Personalized Guidance",
    description:
      "Receive tailored advice that understands the unique dynamics of modern relationships.",
  },
  {
    icon: Zap,
    title: "Instant Insights",
    description:
      "No waiting around - get immediate, thoughtful analysis of your situation.",
  },
  {
    icon: Moon,
    title: "Private & Secure",
    description: "Your thoughts and feelings are kept completely confidential.",
  },
  {
    icon: Cloud,
    title: "Emotionally Intelligent",
    description:
      "Our analysis considers the full spectrum of human emotions and relationship dynamics.",
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

  useEffect(() => {
    const savedMood = localStorage.getItem("selectedPalette");
    if (savedMood) {
      setCurrentMood(savedMood as MoodType);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-start)] to-[var(--gradient-end)]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Understand Your Situationship
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Get personalized insights about your relationship situation,
            tailored to your current mood and emotional state.
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
          <h2 className="text-3xl font-bold mb-6">
            Ready to Understand Your Situation?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of others who've found clarity in their
            relationships.
          </p>
          <Button
            size="lg"
            onClick={() => router.push("/search")}
            className="group"
          >
            Start Your Analysis Now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
