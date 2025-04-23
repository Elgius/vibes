import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnalysisCard from "@/components/analysiscard";
import { ArrowLeft, Zap, Trophy, Target } from "lucide-react";

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
              <Zap className="w-6 h-6 text-primary" />
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Your Situationship Analysis
              </h1>
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <p className="text-lg text-muted-foreground">
              Here's the breakdown of your situation 🎯
            </p>
          </div>

          <div className="space-y-8">
            <AnalysisCard
              title="Your Current Situation"
              content="Alright bro, let's break this down. From what you've shared, you're into this person but the whole 'what are we' thing is throwing you off. You like the connection you've got, but the uncertainty is messing with your head.

Not wanting to have 'the talk' is totally normal - nobody likes that awkward conversation! But man, that uncertainty is killing your vibe. You deserve to know where you stand!

Take a minute to think about what you really want. Are you looking for something serious, or are you cool with keeping it casual? Be real with yourself! 🎯"
              className="border-primary/20"
            />

            <AnalysisCard
              title="The Real Talk"
              content="Let's be straight - this is classic situationship territory. You're both enjoying the good stuff (the chill hangs, the late-night convos, the fun times) but avoiding the commitment talk like it's a Monday morning.

Here's the deal: situationships only last as long as both people let them. While you're over here stressing, they might be totally cool with how things are. Or maybe they're just as confused as you are but too nervous to bring it up!

Your boys would probably tell you to man up and have the conversation. The longer you wait, the more it's gonna mess with you! 💪"
              className="border-accent/20"
            />

            <AnalysisCard
              title="Game Plan"
              content="Time to take control of your situation! Here's your playbook:

🎯 Step 1: Figure out what you want
   - What are you actually looking for?
   - Are you good with keeping it undefined?
   - Would you be happier with something clear?

🎯 Step 2: Get ready for the talk
   - Write down your thoughts (helps clear your head)
   - Pick a good time to chat
   - Know what you want to say

🎯 Step 3: Have the conversation
   - Keep it real but chill
   - Use 'I feel' statements
   - Listen to their side too

🎯 Step 4: Set your boundaries
   - Know your non-negotiables
   - Be clear about what you need
   - Don't settle for less than you deserve

🎯 Step 5: Be ready for anything
   - They might want the same thing
   - They might need time to think
   - They might not be ready for commitment

Remember: You're a solid dude, and you deserve someone who's stoked to be with you! If they're not ready to commit, that's on them. There are plenty of options out there, and you're the main character of your own story! 🏆"
              className="border-primary/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
