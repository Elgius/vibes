import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AnalysisCardProps {
  title: string;
  content: string;
  className?: string;
}

export default function AnalysisCard({
  title,
  content,
  className,
}: AnalysisCardProps) {
  return (
    <Card
      className={cn(
        "bg-card/50 backdrop-blur-sm border-border/50 transition-all hover:border-primary/30",
        className
      )}
    >
      <CardContent className="p-6">
        <CardTitle className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          {title}
        </CardTitle>
        <p className="text-base leading-relaxed whitespace-pre-line text-foreground/90">
          {content}
        </p>
      </CardContent>
    </Card>
  );
}
