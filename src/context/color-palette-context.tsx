// critical piece of code. this was generated so there could be some issues as LLMs dont tend to have all the context
// this is what the context is for:
// it allows the user to change the mood of the app
// it also allows the app to remember the mood

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type MoodType = "vibrant" | "romantic" | "sunny" | "mystical" | "serene";

interface ColorPaletteContextType {
  currentPalette: MoodType;
  setCurrentPalette: (palette: MoodType) => void;
}

const ColorPaletteContext = createContext<ColorPaletteContextType | undefined>(
  undefined
);

export function ColorPaletteProvider({ children }: { children: ReactNode }) {
  const [currentPalette, setCurrentPalette] = useState<MoodType>("romantic");

  useEffect(() => {
    // Apply the theme when it changes
    document.documentElement.setAttribute("data-theme", currentPalette);
  }, [currentPalette]);

  return (
    <ColorPaletteContext.Provider value={{ currentPalette, setCurrentPalette }}>
      {children}
    </ColorPaletteContext.Provider>
  );
}

export function useColorPalette() {
  const context = useContext(ColorPaletteContext);
  if (context === undefined) {
    throw new Error(
      "useColorPalette must be used within a ColorPaletteProvider"
    );
  }
  return context;
}
