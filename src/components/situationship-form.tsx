"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function SituationshipForm() {
  const [situation, setSituation] = useState("");
  const router = useRouter();
  const [currentMood, setCurrentMood] = useState("romantic");

  useEffect(() => {
    // Get the current mood from localStorage
    const savedMood = localStorage.getItem("selectedPalette");
    if (savedMood) {
      setCurrentMood(savedMood);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to the example page with the current mood
    router.push(`/example/${currentMood}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="situation" className="text-sm font-medium">
          Tell us about your situation
        </label>
        <Textarea
          id="situation"
          placeholder="Describe your relationship situation in detail..."
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
