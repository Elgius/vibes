"use client";

import { useState, useCallback } from "react";
import { Upload, Sparkles, X } from "lucide-react";
import { useColorPalette } from "@/context/color-palette-context";

export default function Contexts() {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const { currentPalette } = useColorPalette();

  const exampleQuestions = [
    "Am i in any danger from the situation?",
    "How should I interpret these vibes?",
    "What energy do you see in this situation?",
  ];

  // Define color schemes for each mood palette
  const getButtonColors = () => {
    switch (currentPalette) {
      case "vibrant":
        return {
          background: "bg-blue-900",
          gradient: "from-blue-400 via-cyan-500 to-teal-500",
          innerBg: "bg-blue-950",
        };
      case "romantic":
        return {
          background: "bg-pink-900",
          gradient: "from-pink-400 via-rose-500 to-purple-500",
          innerBg: "bg-pink-950",
        };
      case "sunny":
        return {
          background: "bg-yellow-900",
          gradient: "from-yellow-400 via-orange-500 to-red-500",
          innerBg: "bg-yellow-950",
        };
      case "mystical":
        return {
          background: "bg-purple-900",
          gradient: "from-purple-400 via-indigo-500 to-blue-500",
          innerBg: "bg-purple-950",
        };
      case "serene":
        return {
          background: "bg-teal-900",
          gradient: "from-teal-400 via-green-500 to-emerald-500",
          innerBg: "bg-teal-950",
        };
      default:
        return {
          background: "bg-gray-800",
          gradient: "from-teal-400 via-blue-500 to-purple-500",
          innerBg: "bg-gray-950",
        };
    }
  };

  const buttonColors = getButtonColors();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));
      setUploadedImages((prev) => [...prev, ...imageFiles]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));
      setUploadedImages((prev) => [...prev, ...imageFiles]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleQuestionClick = (question: string) => {
    // Handle question click - you can implement this based on your needs
    console.log("Selected question:", question);
  };

  return (
    <div className="w-96 p-6 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#2d5016] mb-2">
          Share Your Context
        </h1>
        <p className="text-sm text-[#6b7280]">
          Drop images and ask questions to get personalized insights
        </p>
      </div>

      {/* Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          dragActive
            ? "border-[#059669] bg-[#059669]/5"
            : "border-[#e5e7eb] hover:border-[#d1d5db]"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <Upload className="w-12 h-12 text-[#9ca3af] mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-[#2d5016] mb-2">
          Drop images here
        </h3>
        <p className="text-sm text-[#6b7280] mb-4">or click to browse files</p>
        <p className="text-xs text-[#9ca3af]">PNG, JPG, GIF up to 10MB</p>
      </div>

      {/* Image Preview Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#2d5016]">Preview</h3>

        {uploadedImages.length === 0 ? (
          <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-lg p-6 text-center">
            <p className="text-sm text-[#6b7280]">No images found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {uploadedImages.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-[#e5e7eb]"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Example Questions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#2d5016]">
          Example Questions
        </h3>

        <div className="space-y-3">
          {exampleQuestions.map((question, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="relative group">
                <button
                  onClick={() => handleQuestionClick(question)}
                  className={`relative inline-block p-px font-semibold leading-6 text-white ${buttonColors.background} shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 w-full`}
                >
                  <span
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${buttonColors.gradient} p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  ></span>

                  <span
                    className={`relative z-10 block px-6 py-3 rounded-xl ${buttonColors.innerBg}`}
                  >
                    <div className="relative z-10 flex items-center space-x-2">
                      <span className="transition-all duration-500 group-hover:translate-x-1 text-sm">
                        {question}
                      </span>
                      <Sparkles className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 flex-shrink-0" />
                    </div>
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
