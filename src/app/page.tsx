"use client";

import { useState, useEffect } from "react";
import SituationshipForm from "@/components/situationship-form";
import { Sparkles, Zap } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [isGirlMode, setIsGirlMode] = useState(true);

  useEffect(() => {
    // Apply theme based on gender mode
    document.documentElement.setAttribute(
      "data-theme",
      isGirlMode ? "girl" : "boy"
    );
  }, [isGirlMode]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-end gap-2 mb-4">
            <Label
              htmlFor="gender-mode"
              className="text-sm text-muted-foreground"
            >
              {isGirlMode ? "Girl Mode" : "Boy Mode"}
            </Label>
            <Switch
              id="gender-mode"
              checked={isGirlMode}
              onCheckedChange={setIsGirlMode}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              {isGirlMode ? (
                <Sparkles className="w-6 h-6 text-primary" />
              ) : (
                <Zap className="w-6 h-6 text-primary" />
              )}
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Situationship Analyzer
              </h1>
              {isGirlMode ? (
                <Sparkles className="w-6 h-6 text-primary" />
              ) : (
                <Zap className="w-6 h-6 text-primary" />
              )}
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              {isGirlMode
                ? "Spill the tea on your situationship and get the real talk you deserve"
                : "Break down your situationship and get the real talk you deserve"}
            </p>
            <p className="text-sm text-muted-foreground/80">
              {isGirlMode
                ? "No judgment, just honest insights to help you navigate your ✨situationship✨"
                : "No judgment, just honest insights to help you navigate your 🎯situationship"}
            </p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border/50">
            <SituationshipForm isGirlMode={isGirlMode} />
          </div>
        </div>
      </div>
    </div>
  );
}
