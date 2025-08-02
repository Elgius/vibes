"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [ageGroup, setAgeGroup] = useState("");
  const [firstName, setFirstName] = useState("");

  const handleSubmit = () => {
    if (agreed && ageGroup && firstName) {
      // Store user data in localStorage
      localStorage.setItem("userName", firstName);
      localStorage.setItem("userAge", ageGroup);
      router.push("/user");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d5016] leading-tight">
            <span className="text-[#059669]">Hello</span>, welcome to Vibes!
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-[#2d5016] leading-tight">
            Before i can get to listen to you, a couple of things first...
          </h2>
        </div>

        {/* Privacy and Terms */}
        <div className="space-y-4 text-[#6b7280]">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-[#6b7280] mt-2 flex-shrink-0"></div>
            <p className="text-lg">
              We take data privacy seriously, as described in our{" "}
              <Link
                href="/privacy"
                className="text-[#059669] underline hover:no-underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-[#6b7280] mt-2 flex-shrink-0"></div>
            <p className="text-lg">
              Our chats are not shared for ads or marketing, we take your data
              privacy very seriously, You can learn more about our service in
              our{" "}
              <Link
                href="/terms"
                className="text-[#059669] underline hover:no-underline"
              >
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-center space-x-3">
          <Checkbox
            id="agreement"
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked === true)}
            className="border-[#6b7280] data-[state=checked]:bg-[#059669] data-[state=checked]:border-[#059669]"
          />
          <Label
            htmlFor="agreement"
            className="text-lg text-[#6b7280] cursor-pointer"
          >
            I agree to the Terms of Service and have read the Privacy Policy
          </Label>
        </div>

        {/* Safety Message */}
        <p className="text-lg text-[#6b7280] leading-relaxed">
          Since our chats stay between us, it's important to chat safely and
          responsibly. Can you tell me more about yourself?
        </p>

        {/* Age Verification */}
        <RadioGroup
          value={ageGroup}
          onValueChange={setAgeGroup}
          className="space-y-4"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem
              value="18-plus"
              id="18-plus"
              className="border-[#6b7280] text-[#059669]"
            />
            <Label
              htmlFor="18-plus"
              className="text-lg text-[#6b7280] cursor-pointer"
            >
              I am 18 years old or over
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem
              value="under-18"
              id="under-18"
              className="border-[#6b7280] text-[#059669]"
            />
            <Label
              htmlFor="under-18"
              className="text-lg text-[#6b7280] cursor-pointer"
            >
              I am under 18 years old
            </Label>
          </div>
        </RadioGroup>

        {/* Name Input */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            className="w-full h-16 px-6 text-lg bg-white border-2 border-[#e5e7eb] rounded-full placeholder:text-[#9ca3af] focus:border-[#059669] focus:ring-0"
          />
          <Button
            onClick={handleSubmit}
            disabled={!agreed || !ageGroup || !firstName}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#059669] hover:bg-[#047857] disabled:bg-[#e5e7eb] disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </Button>
        </div>

        {/* Login Section */}
        <div className="space-y-4 text-center">
          <p className="text-lg text-[#6b7280]">Oh, do I know you already?</p>
          <Button
            variant="outline"
            className="w-full max-w-xs h-12 text-lg bg-transparent border-2 border-[#059669] text-[#059669] rounded-full hover:bg-[#059669] hover:text-white transition-colors"
          >
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
}
