import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f5f1e8] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/onboarding">
          <Button variant="ghost" className="mb-8 text-[#059669] hover:text-[#047857]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Onboarding
          </Button>
        </Link>

        <h1 className="text-4xl font-bold text-[#2d5016] mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none text-[#374151] space-y-6">
          <p className="text-[#6b7280]">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#2d5016]">1. Introduction</h2>
            <p>
              Welcome to Spill the Vibes ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered relationship advice service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#2d5016]">2. Information We Collect</h2>
            <h3 className="text-xl font-medium text-[#374151]">Personal Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>First name (as provided during onboarding)</li>
              <li>Age group (18+ or under 18)</li>
              <li>Mood preferences and selections</li>
            </ul>
            
            <h3 className="text-xl font-medium text-[#374151]">Conversation Data</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Messages you send to our AI assistant</li>
              <li>Relationship situations and questions you share</li>
              <li>AI-generated responses and advice</li>
            </ul>

            <h3 className="text-xl font-medium text-[#374151]">Technical Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>IP address (anonymized)</li>
              <li>Usage patterns and preferences</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#2d5016]">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide personalized AI-powered relationship advice</li>
              <li>Customize your experience based on mood preferences</li>
              <li>Improve our AI models and service quality</li>
              <li>Ensure age-appropriate content delivery</li>
              <li>Maintain and improve platform security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#2d5016]">4. AI and Data Processing</h2>
            <p>
              Our service uses artificial intelligence (powered by Anthropic's Claude) to analyze your messages and provide advice. Your conversations are:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Processed in real-time to generate responses</li>
              <li>Not used to train external AI models</li>
              <li>Not shared with third parties for advertising or marketing</li>
              <li>Stored temporarily for session continuity</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#2d5016]">5. Data Retention</h2>
            <p>
              We retain your data for different periods depending on the type:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Session data: Deleted after 30 days of inactivity</li>
              <li>Account information: Retained until you request deletion</li>
              <li>Technical logs: Anonymized and retained for 90 days</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#2d5016]">6. Your Privacy Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of certain data uses</li>
              <li>Export your conversation history</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#2d5016]">7. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>End-to-end encryption for sensitive data</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
              <li>Secure data storage and transmission</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#2d5016]">8. Children's Privacy</h2>
            <p>
              Our service is designed for users 18 years and older. If you are under 18, we provide age-appropriate content and additional privacy protections. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#2d5016]">9. Third-Party Services</h2>
            <p>We use limited third-party services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Anthropic AI for conversation processing</li>
              <li>Stripe for payment processing (if applicable)</li>
              <li>Analytics services (anonymized data only)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#2d5016]">10. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#2d5016]">11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or your privacy rights, please contact us at:
            </p>
            <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
              <p>Email: privacy@spillthevibes.com</p>
              <p>Address: [Your Company Address]</p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-[#e5e7eb]">
          <Link href="/onboarding">
            <Button className="bg-[#059669] hover:bg-[#047857] text-white">
              Return to Onboarding
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}