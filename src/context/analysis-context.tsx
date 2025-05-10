"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AnalysisData {
  mood: string;
  icon: string;
  title: string;
  description: string;
  danger_rating: number;
  cards: Array<{
    title: string;
    content: string;
  }>;
}

interface AnalysisContextType {
  analysisData: AnalysisData | null;
  setAnalysisData: (data: AnalysisData) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(
  undefined
);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("analysisData");
    if (savedData) {
      try {
        setAnalysisData(JSON.parse(savedData));
      } catch (error) {
        console.error("Error parsing saved analysis data:", error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (analysisData) {
      localStorage.setItem("analysisData", JSON.stringify(analysisData));
    } else {
      localStorage.removeItem("analysisData");
    }
  }, [analysisData]);

  return (
    <AnalysisContext.Provider
      value={{
        analysisData,
        setAnalysisData,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
}
