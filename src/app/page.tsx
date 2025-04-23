import SituationshipForm from "@/components/situationship-form";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Situationship Analyzer
              </h1>
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              Spill the tea on your situationship and get the real talk you
              deserve
            </p>
            <p className="text-sm text-muted-foreground/80">
              No judgment, just honest insights to help you navigate your
              ✨situationship✨
            </p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border/50">
            <SituationshipForm />
          </div>
        </div>
      </div>
    </div>
  );
}
