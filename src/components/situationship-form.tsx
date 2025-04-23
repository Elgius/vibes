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
import { Heart, Sparkles } from "lucide-react";

export default function SituationshipForm() {
  const router = useRouter();
  const [situation, setSituation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send this data to the server
    // For this demo, we just navigate to the example page
    router.push("/example");
  };

  return (
    <Card className="w-full border-none bg-transparent">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          <CardTitle className="text-2xl font-bold">Spill the Tea</CardTitle>
        </div>
        <CardDescription className="text-base">
          We're all ears! Tell us about your situationship - how you met, what's
          going on, and what's making you question things.
          <span className="block mt-2 text-sm text-muted-foreground/80">
            Don't worry, we're here to help you figure it out! 💕
          </span>
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Textarea
            placeholder="My situationship started when... ✨"
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
            <Sparkles className="w-4 h-4 mr-2" />
            Get the Tea
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
