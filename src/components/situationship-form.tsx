"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

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
  const [situation, setSituation] = useState("");
  const router = useRouter();
  const [currentMood, setCurrentMood] = useState<MoodType>("romantic");

  useEffect(() => {
    // Get the current mood from localStorage
    const savedMood = localStorage.getItem("selectedPalette");
    if (savedMood) {
      setCurrentMood(savedMood as MoodType);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const getMood = localStorage.getItem("selectedPalette");
    if (!getMood) {
      return;
    } else {
      setCurrentMood(getMood as MoodType);
    }
    const payloade1 = {
      mood: currentMood,
      message: situation,
    };

    console.log(payloade1);

    router.push("/result");
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
