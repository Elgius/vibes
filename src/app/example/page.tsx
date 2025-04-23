import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnalysisCard from "@/components/analysiscard";
import { ArrowLeft, Sparkles, Heart, MessageCircle } from "lucide-react";

export default function ExamplePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button
                variant="ghost"
                className="pl-0 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to form
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Your Situationship Analysis
              </h1>
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <p className="text-lg text-muted-foreground">
              Here's the tea on your situation 💭
            </p>
          </div>

          <div className="space-y-8">
            <AnalysisCard
              title="Your Feelings"
              content="Okay bestie, let's break this down! From what you've shared, it sounds like you're really into this person but also kinda confused about where things are going. You love the connection you have, but the whole 'what are we?' thing is giving you anxiety.

The fact that you're hesitant to have 'the talk' is totally normal - no one likes that awkward conversation! But girl, that uncertainty is lowkey ruining your vibe. You deserve to know where you stand! 💕"
              className="border-primary/20"
            />

            <AnalysisCard
              title="The Outside Perspective"
              content="Let's be real - this is giving major situationship energy! You're both enjoying all the good parts of a relationship (the cuddles, the late-night talks, the cute dates) but avoiding the commitment talk like it's the plague.

Here's the thing: situationships only last as long as both people let them. While you're over here stressing, they might be totally fine with how things are. Or maybe they're just as confused as you are but too scared to bring it up!

Your friends would probably tell you to rip off the band-aid and have the conversation. The longer you wait, the more it's gonna hurt! 💅"
              className="border-accent/20"
            />

            <AnalysisCard
              title="What to Do Next"
              content="Alright queen, it's time to take control of your love life! Here's your game plan:

✨ Step 1: Do some soul-searching
   - What do you actually want from this?
   - Are you okay with keeping things undefined?
   - Would you be happier with a clear commitment?

✨ Step 2: Prep for the talk
   - Write down your feelings (it helps!)
   - Pick a chill time to chat
   - Practice what you want to say

✨ Step 3: Have the conversation
   - Keep it casual but honest
   - Use 'I feel' statements
   - Listen to their side too

✨ Step 4: Set your boundaries
   - Know your dealbreakers
   - Be clear about what you need
   - Don't settle for less than you deserve

✨ Step 5: Be ready for anything
   - They might want the same thing
   - They might need time to think
   - They might not be ready for commitment

Remember: You're a total catch, and you deserve someone who's excited to be with you! If they're not ready to commit, that's their loss. There are plenty of fish in the sea, and you're the main character of your own love story! 💖"
              className="border-primary/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
