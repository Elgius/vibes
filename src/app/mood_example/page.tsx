"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export default function MoodExamplePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-start)] to-[var(--gradient-end)]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
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
                    Perfect for when you're feeling energetic and ready to take
                    action. This mood provides bold, confident insights that
                    help you see the dynamic potential in your connection. It's
                    ideal for those who want straightforward, empowering advice.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-primary">
                    💕 Romantic
                  </h3>
                  <p className="text-muted-foreground">
                    When your heart is leading the way, this mood offers tender,
                    heartfelt perspectives. It's designed for those who want to
                    explore the emotional depth and romantic possibilities in
                    their connection.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-primary">
                    ☀️ Sunny
                  </h3>
                  <p className="text-muted-foreground">
                    For those seeking optimism and hope. This mood provides
                    uplifting, positive insights that focus on the bright side
                    of your situation while maintaining realistic expectations.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-primary">
                    🌙 Mystical
                  </h3>
                  <p className="text-muted-foreground">
                    When you're looking for deeper meaning and intuitive
                    understanding. This mood offers thoughtful, introspective
                    analysis that helps you explore the less obvious aspects of
                    your connection.
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
                      document.documentElement.setAttribute("data-theme", mood);
                      localStorage.setItem("selectedPalette", mood);
                    }}
                  >
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold">{content.title}</h3>
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
                          {/* You can add an icon here if you want */}
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
    </div>
  );
}
