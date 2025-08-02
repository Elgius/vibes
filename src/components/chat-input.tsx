"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, Image, FileText, X, RefreshCw } from "lucide-react";
import Link from "next/link";

interface FileContext {
  name: string;
  type: string;
  content?: string;
}

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  sendMessage: (message: { text: string; files?: FileList }) => void;
  status: 'ready' | 'streaming' | 'submitted' | 'error';
  currentPalette: string;
  fileContext: FileContext[];
  error: Error | null;
  reload: () => void;
}

export default function ChatInput({
  input,
  setInput,
  sendMessage,
  status,
  currentPalette,
  fileContext,
  error,
  reload
}: ChatInputProps) {
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const clearFiles = () => {
    setFiles(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only submit if there's actual input content
    if (input && input.trim()) {
      sendMessage({ 
        text: input,
        files
      }, {
        body: {
          mood: currentPalette,
        }
      });
      setInput('');
      clearFiles();
    }
  }, [input, sendMessage, files, currentPalette, setInput]);

  return (
    <div className="p-4 lg:p-8 pt-0">
      <div className="max-w-2xl mx-auto space-y-4">
        <form onSubmit={onSubmit} className="relative" noValidate>
          {/* Show file attachments */}
          {(files && files.length > 0) && (
            <div className="mb-2 flex flex-wrap gap-1">
              {Array.from(files).map((file, index) => (
                <div key={index} className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                  {file.type.startsWith('image/') ? <Image className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                  <span className="truncate max-w-20">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const newFiles = Array.from(files).filter((_, i) => i !== index);
                      const dt = new DataTransfer();
                      newFiles.forEach(f => dt.items.add(f));
                      setFiles(dt.files.length > 0 ? dt.files : undefined);
                    }}
                    className="text-primary hover:text-primary/80"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <div className="text-xs text-muted-foreground px-2 py-1">
                {files.length} file{files.length > 1 ? 's' : ''} will be included
              </div>
            </div>
          )}
          
          {/* Legacy file context display */}
          {fileContext.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1">
              {fileContext.map((file, index) => (
                <div key={index} className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                  {file.type.startsWith('image/') ? <Image className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                  <span className="truncate max-w-20">{file.name}</span>
                </div>
              ))}
              <div className="text-xs text-muted-foreground px-2 py-1">
                {fileContext.length} file{fileContext.length > 1 ? 's' : ''} from context
              </div>
            </div>
          )}
          <div className="relative">
            <Input
              type="text"
              placeholder={(files && files.length > 0) || fileContext.length > 0 ? "Ask about your files or chat with Vibes" : "Talk with Vibes"}
              value={input ?? ""}
              onChange={handleInputChange}
              disabled={status !== 'ready'}
              className="w-full h-12 lg:h-14 px-4 lg:px-6 pr-20 lg:pr-24 text-base lg:text-lg bg-card border-2 border-border rounded-full placeholder:text-muted-foreground focus:border-primary focus:ring-0 disabled:opacity-50"
            />
            
            {/* File input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/*,text/*"
              className="hidden"
            />
            
            {/* File attachment button */}
            <Button
              type="button"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              disabled={status !== 'ready'}
              className="absolute right-12 lg:right-14 top-1/2 transform -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Image className="w-4 h-4 lg:w-5 lg:h-5" />
            </Button>
            
            {/* Submit button */}
            <Button
              type="submit"
              size="icon"
              disabled={status !== 'ready' || !input?.trim()}
              className="absolute right-1 lg:right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-primary hover:bg-primary/80 text-primary-foreground rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowUp className="w-4 h-4 lg:w-5 lg:h-5" />
            </Button>
          </div>
        </form>

        {/* Error handling */}
        {error && (
          <div className="flex items-center justify-center space-x-2 text-sm text-red-600">
            <span>Something went wrong. Please try again.</span>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={reload}
              className="h-6 px-2"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Retry
            </Button>
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground">
          By using Vibes, you agree to our{" "}
          <Link href="#" className="text-primary hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}