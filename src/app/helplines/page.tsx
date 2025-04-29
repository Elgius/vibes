"use client";

import { useColorPalette } from "@/context/color-palette-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, AlertTriangle } from "lucide-react";

export default function HelplinesPage() {
  const { currentPalette } = useColorPalette();

  const helplines = [
    {
      name: "National Domestic Violence Hotline",
      phone: "1-800-799-7233",
      email: "thehotline@thehotline.org",
      description:
        "24/7 support for anyone experiencing domestic violence or abuse",
    },
    {
      name: "National Suicide Prevention Lifeline",
      phone: "988",
      description:
        "24/7 support for people in suicidal crisis or emotional distress",
    },
    {
      name: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "24/7 text support for any type of crisis",
    },
    {
      name: "RAINN (Rape, Abuse & Incest National Network)",
      phone: "1-800-656-4673",
      description: "24/7 support for survivors of sexual violence",
    },
    {
      name: "The Trevor Project",
      phone: "1-866-488-7386",
      description: "24/7 support for LGBTQ+ youth in crisis",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Emergency Support & Helplines
        </h1>
        <p className="text-lg text-muted-foreground">
          If you or someone you know is in danger, please reach out to these
          resources immediately.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {helplines.map((helpline) => (
          <Card key={helpline.name} className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-semibold">{helpline.name}</h2>
            </div>

            <p className="text-muted-foreground mb-4">{helpline.description}</p>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a
                  href={`tel:${helpline.phone.replace(/\D/g, "")}`}
                  className="text-blue-500 hover:underline"
                >
                  {helpline.phone}
                </a>
              </div>

              {helpline.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a
                    href={`mailto:${helpline.email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {helpline.email}
                  </a>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          If you are in immediate danger, please call 911 or your local
          emergency services.
        </p>
      </div>
    </div>
  );
}
