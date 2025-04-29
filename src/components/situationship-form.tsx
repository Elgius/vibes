"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useColorPalette } from "@/context/color-palette-context";
type MoodType = "vibrant" | "romantic" | "sunny" | "mystical" | "serene";

const moodPlaceholders: Record<MoodType, string> = {
  vibrant:
    "Tell us about the electric energy between you two... What makes your connection so dynamic?",
  romantic:
    "Share the sweet moments and heartfelt feelings that define your connection...",
  sunny:
    "Describe the bright spots in your relationship and what makes you feel hopeful...",
  mystical:
    "Unravel the deeper aspects of your connection... What mysteries are you trying to understand?",
  serene:
    "Share your thoughts about the relationship in a calm, balanced way...",
};

export default function SituationshipForm() {
  const { currentPalette } = useColorPalette();
  const [situation, setSituation] = useState("");
  const router = useRouter();
  const [currentMood, setCurrentMood] = useState<MoodType>("romantic");

  useEffect(() => {
    // Get the current mood from localStorage
    const savedMood = currentPalette;
    setCurrentMood(savedMood as MoodType);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const situationPayload: { mood: string; message: string } = {
      mood: currentPalette,
      message: situation,
    };

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(situationPayload),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze situation");
      }

      const data = await response.json();
      console.log("Response:", data);

      if (data.response === "no context") {
        alert(
          "please explain the relationship a bit more so we can give an answer!"
        );
      } else {
        router.push("/result");
      }
    } catch (error) {
      console.error("Error sending request:", error);
      // You might want to show an error message to the user here
      alert("an error occured, please try again or contact support");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="situation" className="text-sm font-medium">
          Tell us about your situation
        </label>
        <Textarea
          id="situation"
          placeholder={moodPlaceholders[currentMood]}
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          className="min-h-[200px]"
        />
      </div>

      <Button type="submit" className="w-full">
        Analyze My Situation
      </Button>
    </form>
  );
}
