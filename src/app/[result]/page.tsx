"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useColorPalette } from "@/context/color-palette-context";
import { useAnalysis } from "@/context/analysis-context";
import { useRouter } from "next/navigation";

const moodIcons = {
  vibrant: "⚡",
  romantic: "💕",
  sunny: "☀️",
  mystical: "🌙",
  serene: "☁️",
};

export default function ResultPage() {
  const { currentPalette } = useColorPalette();
  const { analysisData, isLoading } = useAnalysis();
  const router = useRouter();

  useEffect(() => {
    console.log("Result page mounted");
    console.log("Current analysis data:", analysisData);
    console.log("Loading state:", isLoading);

    if (!analysisData && !isLoading) {
      console.log("No data and not loading, redirecting to search");
      router.push("/search");
    }
  }, [analysisData, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-start)] to-[var(--gradient-end)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-lg text-muted-foreground">
            Analyzing your situation...
          </p>
        </div>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-start)] to-[var(--gradient-end)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            No analysis data available
          </p>
          <Button onClick={() => router.push("/search")} className="mt-4">
            Go Back to Form
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-start)] to-[var(--gradient-end)]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex justify-between">
            <Link href="/search">
              <Button
                variant="ghost"
                className="pl-0 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to form
              </Button>
            </Link>
            {/* implement magic summary later */}
            <Button variant="ghost">Magic summary 🪄</Button>
          </div>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-4xl">{analysisData.icon}</span>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                {analysisData.title}
              </h1>
              <span className="text-4xl">{analysisData.icon}</span>
            </div>
            <p className="text-lg text-muted-foreground">
              {analysisData.description}
            </p>
          </div>

          <div className="space-y-6">
            {analysisData.cards.map((card, index) => (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border/50"
              >
                <h2 className="text-2xl font-bold mb-4 text-primary">
                  {card.title}
                </h2>
                <div className="prose prose-invert max-w-none">
                  {card.content.split("\n").map((paragraph, i) => (
                    <p key={i} className="text-muted-foreground mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button
            className="mt-12"
            onClick={async () => {
              const shareText = `${analysisData.title}\n\n${
                analysisData.description
              }\n\n${analysisData.cards
                .map((card) => `${card.title}\n${card.content}`)
                .join("\n\n")}`;

              if (navigator.clipboard && window.isSecureContext) {
                try {
                  await navigator.clipboard.writeText(shareText);
                  alert(
                    "Analysis copied to clipboard! Share it on your favorite social media."
                  );
                } catch (err) {
                  alert("Failed to copy text. Please try again.");
                  console.error("Failed to copy text: ", err);
                }
              } else {
                // Fallback for older browsers
                const textArea = document.createElement("textarea");
                textArea.value = shareText;
                // Avoid scrolling to bottom
                textArea.style.position = "fixed";
                textArea.style.top = "0";
                textArea.style.left = "0";
                textArea.style.width = "2em";
                textArea.style.height = "2em";
                textArea.style.padding = "0";
                textArea.style.border = "none";
                textArea.style.outline = "none";
                textArea.style.boxShadow = "none";
                textArea.style.background = "transparent";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                  document.execCommand("copy");
                  alert(
                    "Analysis copied to clipboard! Share it on your favorite social media."
                  );
                } catch (err) {
                  alert("Failed to copy text. Please try again.");
                  console.error("Fallback: Oops, unable to copy", err);
                }
                document.body.removeChild(textArea);
              }
            }}
          >
            share your vibe
          </Button>
        </div>
      </div>
    </div>
  );
}
