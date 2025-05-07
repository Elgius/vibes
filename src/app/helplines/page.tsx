"use client";

import { useState, useEffect } from "react";
import { useColorPalette } from "@/context/color-palette-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, AlertTriangle, Globe } from "lucide-react";
import helplineData from "@/data/helpline-numbers.json";

type Helpline = {
  name: string;
  phone: string;
  email?: string;
  description: string;
};

type CountryData = {
  name: string;
  helplines: Helpline[];
};

type HelplineData = {
  countries: {
    [key: string]: CountryData;
  };
};

export default function HelplinesPage() {
  const { currentPalette } = useColorPalette();
  const [userCountry, setUserCountry] = useState<string | null>(null);
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        // const response = await fetch("https://ipapi.co/json/");
        // const data = await response.json();
        // const countryCode = data.country_code.toLowerCase();
        const countryCode = "america";
        setUserCountry(countryCode);

        // Check if we have data for this country
        const typedHelplineData = helplineData as HelplineData;
        if (typedHelplineData.countries[countryCode]) {
          setCountryData(typedHelplineData.countries[countryCode]);
        }
      } catch (error) {
        console.error("Error detecting country:", error);
        // Default to America if detection fails
        const typedHelplineData = helplineData as HelplineData;
        setUserCountry("america");
        setCountryData(typedHelplineData.countries.america);
      } finally {
        setIsLoading(false);
      }
    };

    detectCountry();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4">Loading helpline information...</p>
      </div>
    );
  }

  if (!countryData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Local Support Resources</h1>
          <p className="text-lg text-muted-foreground mb-6">
            We're currently gathering helpline information for your region. In
            the meantime, here are some steps you can take:
          </p>
          <div className="space-y-4 text-left">
            <p>
              1. Contact your local emergency services (911, 999, 112, or your
              country's emergency number)
            </p>
            <p>
              2. Search online for mental health or crisis support services in
              your area
            </p>
            <p>3. Reach out to trusted friends, family, or community members</p>
            <p>4. Visit your nearest hospital or healthcare facility</p>
          </div>
          <div className="mt-8">
            <p className="text-sm text-muted-foreground">
              If you're in immediate danger, please call your local emergency
              services immediately.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
        <p className="text-sm text-muted-foreground mt-2">
          Showing resources for {countryData.name}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {countryData.helplines.map((helpline) => (
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
          If you are in immediate danger, please call your local emergency
          services immediately.
        </p>
      </div>
    </div>
  );
}
