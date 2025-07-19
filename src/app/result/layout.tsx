import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Spill the Vibes",
  description:
    "Spill the Vibes is a platform to talk about your situationships and get advice from the community. Spill the vibes!",
  openGraph: {
    title: "Spill the Vibes",
    description:
      "Spill the vibes! Get advice and support for your situationships.",
    images: [
      {
        url: "/logo/vibeLogo.png",
        width: 1200,
        height: 630,
        alt: "Vibes Logo",
      },
    ],
  },
};

export default function ResultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
