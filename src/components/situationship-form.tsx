"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Sparkles, Zap } from "lucide-react";

interface SituationshipFormProps {
  isGirlMode: boolean;
}

export default function SituationshipForm({
  isGirlMode,
}: SituationshipFormProps) {
  const router = useRouter();
  const [situation, setSituation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(isGirlMode ? "/exampleGirl" : "/exampleBoy");
  };

  return (
    <Card className="w-full border-none bg-transparent">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-2">
          {isGirlMode ? (
            <Heart className="w-5 h-5 text-primary" />
          ) : (
            <Zap className="w-5 h-5 text-primary" />
          )}
          <CardTitle className="text-2xl font-bold">
            {isGirlMode ? "Spill the Tea" : "Break it Down"}
          </CardTitle>
        </div>
        <CardDescription className="text-base">
          {isGirlMode
            ? "We're all ears! Tell us about your situationship - how you met, what's going on, and what's making you question things."
            : "We're here to help! Tell us about your situationship - how you met, what's going on, and what's making you question things."}
          <span className="block mt-2 text-sm text-muted-foreground/80">
            {isGirlMode
              ? "Don't worry, we're here to help you figure it out! 💕"
              : "Don't worry, we've got your back! 🎯"}
          </span>
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Textarea
            placeholder={
              isGirlMode
                ? "My situationship started when... ✨"
                : "My situationship started when... 🎯"
            }
            className="min-h-[200px] text-base bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-colors"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
          >
            {isGirlMode ? (
              <Sparkles className="w-4 h-4 mr-2" />
            ) : (
              <Zap className="w-4 h-4 mr-2" />
            )}
            {isGirlMode ? "Get the Tea" : "Get the Breakdown"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
