"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUp,
  Volume2,
  VolumeX,
  Sparkles,
  User,
  Palette,
  Upload,
  X,
  FileText,
  Image,
} from "lucide-react";
import Link from "next/link";
import { useColorPalette } from "@/context/color-palette-context";
import ColorPaletteModal from "@/components/color-palette-modal";
import { useDropzone } from "react-dropzone";
import { useChat } from "@ai-sdk/react";

export default function ChatIntro() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPaletteModalOpen, setIsPaletteModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filePreviewUrls, setFilePreviewUrls] = useState<string[]>([]);
  const [fileContents, setFileContents] = useState<string[]>([]);
  const { currentPalette } = useColorPalette();

  // Prepare file context for chat
  const fileContext = uploadedFiles.map((file, index) => ({
    name: file.name,
    type: file.type,
    content: file.type.startsWith('text/') ? fileContents[index] : 
             file.type.startsWith('image/') ? `[Image: ${file.name}]` :
             `[File: ${file.name}]`
  }));

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: '/api/chat',
    body: {
      mood: currentPalette,
      fileContext: fileContext.length > 0 ? fileContext : undefined
    },
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hey there, great to meet you. I'm Vibes, your personal AI companion. My goal is to be useful, friendly and fun. Ask me for advice, for answers, or let's talk about whatever's on your mind. How's your day going?"
      }
    ]
  });

  // Update welcome message when mood changes
  useEffect(() => {
    const moodWelcomes: Record<string, string> = {
      vibrant: "Hey there! ⚡ I'm Vibes, your energetic AI companion! I'm here to help you channel that amazing energy and tackle whatever's on your mind. Ready to dive in?",
      romantic: "Hello lovely 💕 I'm Vibes, your warm and understanding AI companion. I'm here to explore the beautiful complexities of your heart and relationships. What's stirring in your soul?",
      sunny: "Hi sunshine! ☀️ I'm Vibes, your optimistic AI companion! I'm here to help you see the bright side and spread those positive vibes. What's bringing joy to your day?",
      mystical: "Greetings, dear soul ✨ I'm Vibes, your intuitive AI companion. I'm here to help you explore the deeper mysteries and hidden meanings in your journey. What wisdom are you seeking?",
      serene: "Hello 🌸 I'm Vibes, your peaceful AI companion. I'm here to provide calm guidance and gentle understanding as we explore your thoughts together. How can I bring you clarity today?"
    };

    if (messages.length === 1 && messages[0].id === 'welcome') {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: moodWelcomes[currentPalette] || moodWelcomes.serene
      }]);
    }
  }, [currentPalette, messages, setMessages]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prev) => [...prev, ...acceptedFiles]);
    
    // Generate previews for new files
    acceptedFiles.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setFilePreviewUrls((prev) => [...prev, url]);
        setFileContents((prev) => [...prev, '']);
      } else if (file.type.startsWith('text/')) {
        setFilePreviewUrls((prev) => [...prev, '']);
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setFileContents((prev) => [...prev, content]);
        };
        reader.readAsText(file);
      } else {
        setFilePreviewUrls((prev) => [...prev, '']);
        setFileContents((prev) => [...prev, '']);
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
      "text/*": [".txt", ".md"],
      "application/pdf": [".pdf"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = (index: number) => {
    // Clean up object URL if it's an image
    const url = filePreviewUrls[index];
    if (url) {
      URL.revokeObjectURL(url);
    }
    
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setFileContents((prev) => prev.filter((_, i) => i !== index));
  };

  // Cleanup effect for object URLs
  useEffect(() => {
    return () => {
      filePreviewUrls.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [filePreviewUrls]);

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <Image className="w-4 h-4" />;
    }
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Left Sidebar */}
      <div className="w-full lg:w-20 bg-card flex flex-row lg:flex-col items-center py-4 lg:py-6 space-x-4 lg:space-x-0 lg:space-y-8 border-b lg:border-b-0 lg:border-r border-border overflow-x-auto lg:overflow-x-visible">
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground"
        >
          <Sparkles className="w-6 h-6" />
        </Button>
        <div className="text-xs text-muted-foreground text-center hidden lg:block">
          Discover
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-xl bg-transparent hover:bg-muted text-muted-foreground"
        >
          <User className="w-6 h-6" />
        </Button>
        <div className="text-xs text-muted-foreground text-center hidden lg:block">
          Profile
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Content Panel */}
        <div className="w-full lg:w-96 p-4 lg:p-6 space-y-4 lg:space-y-6 border-b lg:border-b-0 lg:border-r border-border">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Good evening
            </h1>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPaletteModalOpen(true)}
                className="text-muted-foreground hover:bg-muted"
              >
                <Palette className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="text-muted-foreground hover:bg-muted"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Download History Card */}
          <Card className="bg-card border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <div className="w-8 h-8 bg-card rounded-lg flex items-center justify-center">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Download your Vibes conversation history
                  </h3>
                  <Link
                    href="#"
                    className="text-primary hover:underline font-medium"
                  >
                    Manage history
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Upload Section */}
          <Card className="bg-card border-border shadow-sm">
            <CardContent className="p-0">
              <div
                {...getRootProps()}
                className={`p-4 lg:p-6 text-center border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
                  isDragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                {isDragActive ? (
                  <p className="text-primary font-medium">
                    Drop the files here...
                  </p>
                ) : (
                  <div>
                    <p className="text-foreground font-medium mb-2">
                      Drag & drop files here, or click to select
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports images, text files, and PDFs (max 10MB)
                    </p>
                  </div>
                )}
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="p-4 space-y-2 border-t border-border">
                  <h4 className="font-medium text-foreground mb-3">
                    Uploaded Files
                  </h4>
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted/30 rounded-lg"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        {getFileIcon(file)}
                        <span className="text-sm text-foreground truncate max-w-32 lg:max-w-48">
                          {file.name}
                        </span>
                        <span className="text-xs text-muted-foreground hidden sm:inline">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* File Previews */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">File Previews</h3>
              {uploadedFiles.map((file, index) => (
                <Card key={index} className="bg-card border-border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      {getFileIcon(file)}
                      <span className="text-sm font-medium text-foreground truncate">
                        {file.name}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="ml-auto h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {/* Image Preview */}
                    {file.type.startsWith('image/') && filePreviewUrls[index] && (
                      <div className="rounded-lg overflow-hidden bg-muted/30">
                        <img
                          src={filePreviewUrls[index]}
                          alt={file.name}
                          className="w-full max-h-64 object-contain"
                        />
                      </div>
                    )}
                    
                    {/* Text File Preview */}
                    {file.type.startsWith('text/') && fileContents[index] && (
                      <div className="bg-muted/30 rounded-lg p-3 max-h-48 overflow-y-auto">
                        <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
                          {fileContents[index].slice(0, 1000)}
                          {fileContents[index].length > 1000 && '...'}
                        </pre>
                      </div>
                    )}
                    
                    {/* PDF Preview Placeholder */}
                    {file.type === 'application/pdf' && (
                      <div className="bg-muted/30 rounded-lg p-6 text-center">
                        <FileText className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          PDF file ready for upload
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Right Chat Panel */}
        <div className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
            <div className="max-w-2xl mx-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`rounded-2xl p-4 max-w-[80%] shadow-sm border ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-card text-card-foreground border-border'
                    }`}
                  >
                    <p className="text-base leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-card text-card-foreground border border-border rounded-2xl p-4 max-w-[80%] shadow-sm">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-sm text-muted-foreground">Vibes is typing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 lg:p-8 pt-0">
            <div className="max-w-2xl mx-auto space-y-4">
              <form onSubmit={handleSubmit} className="relative">
                {fileContext.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-1">
                    {fileContext.map((file, index) => (
                      <div key={index} className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                        {file.type.startsWith('image/') ? <Image className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                        <span className="truncate max-w-20">{file.name}</span>
                      </div>
                    ))}
                    <div className="text-xs text-muted-foreground px-2 py-1">
                      {fileContext.length} file{fileContext.length > 1 ? 's' : ''} will be included
                    </div>
                  </div>
                )}
                <Input
                  type="text"
                  placeholder={fileContext.length > 0 ? "Ask about your files or chat with Vibes" : "Talk with Vibes"}
                  value={input}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full h-12 lg:h-14 px-4 lg:px-6 pr-12 lg:pr-14 text-base lg:text-lg bg-card border-2 border-border rounded-full placeholder:text-muted-foreground focus:border-primary focus:ring-0 disabled:opacity-50"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-1 lg:right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-primary hover:bg-primary/80 text-primary-foreground rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowUp className="w-4 h-4 lg:w-5 lg:h-5" />
                </Button>
              </form>

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
        </div>
      </div>

      <ColorPaletteModal
        open={isPaletteModalOpen}
        onOpenChange={setIsPaletteModalOpen}
      />
    </div>
  );
}
