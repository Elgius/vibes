"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useState, useMemo } from "react";
import { useColorPalette } from "@/context/color-palette-context";
import ChatInput from "./chat-input";

interface FileContext {
  name: string;
  type: string;
  content?: string;
}

interface ChatInterfaceProps {
  fileContext: FileContext[];
}

export default function ChatInterface({ fileContext }: ChatInterfaceProps) {
  const { currentPalette } = useColorPalette();
  const [input, setInput] = useState('');

  // Get mood-specific welcome message
  const moodWelcomes: Record<string, string> = {
    vibrant: "Hey there! ⚡ I'm Vibes, your energetic AI companion! I'm here to help you channel that amazing energy and tackle whatever's on your mind. Ready to dive in?",
    romantic: "Hello lovely 💕 I'm Vibes, your warm and understanding AI companion. I'm here to explore the beautiful complexities of your heart and relationships. What's stirring in your soul?",
    sunny: "Hi sunshine! ☀️ I'm Vibes, your optimistic AI companion! I'm here to help you see the bright side and spread those positive vibes. What's bringing joy to your day?",
    mystical: "Greetings, dear soul ✨ I'm Vibes, your intuitive AI companion. I'm here to help you explore the deeper mysteries and hidden meanings in your journey. What wisdom are you seeking?",
    serene: "Hello 🌸 I'm Vibes, your peaceful AI companion. I'm here to provide calm guidance and gentle understanding as we explore your thoughts together. How can I bring you clarity today?"
  };

  const welcomeMessage = moodWelcomes[currentPalette] || moodWelcomes.serene;

  // Memoize transport to prevent recreation on every render
  const transport = useMemo(() => new DefaultChatTransport({
    api: '/api/chat',
    body: {
      mood: currentPalette,
    }
  }), [currentPalette]);

  const { messages, status, setMessages, error, reload, sendMessage } = useChat({
    transport,
    id: useMemo(() => 'chat-' + Date.now(), []), // Only create ID once
    messages: [
      {
        id: 'welcome',
        role: 'assistant',
        parts: [
          {
            type: 'text',
            text: welcomeMessage
          }
        ]
      }
    ],
  });

  // Custom submit handler that works with files
  const handleCustomSubmit = async (messageText: string, attachments?: any[]) => {
    console.log('[ChatInterface] handleCustomSubmit called with:', {
      messageText,
      attachmentsCount: attachments?.length || 0,
      attachments
    });
    
    // Create message parts
    const parts: any[] = [];
    
    // Add text part if present
    if (messageText && messageText.trim()) {
      parts.push({
        type: 'text',
        text: messageText
      });
    }
    
    // Add image parts if present
    if (attachments && attachments.length > 0) {
      for (const attachment of attachments) {
        console.log('[ChatInterface] Adding image part:', {
          name: attachment.name,
          contentType: attachment.contentType,
          urlLength: attachment.url?.length
        });
        parts.push({
          type: 'image',
          image: attachment.url
        });
      }
    }
    
    console.log('[ChatInterface] Sending message with parts:', {
      role: 'user',
      partsCount: parts.length,
      parts: parts.map(p => ({ type: p.type, ...(p.type === 'image' ? { imageLength: p.image?.length } : { text: p.text }) }))
    });
    
    // Send message with parts
    await sendMessage({
      role: 'user',
      parts: parts
    }, {
      body: {
        mood: currentPalette,
      }
    });
  };


  return (
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
                <div className="text-base leading-relaxed whitespace-pre-wrap">
                  {/* Render message parts */}
                  {message.parts && message.parts.map((part: any, index: number) => {
                    if (part.type === 'text') {
                      return <span key={index}>{part.text}</span>;
                    }
                    
                    if (part.type === 'image') {
                      return (
                        <div key={index} className="mt-2">
                          <img
                            src={part.image}
                            alt="Attached image"
                            className="max-w-full h-auto rounded-lg"
                          />
                        </div>
                      );
                    }
                    
                    return null;
                  })}
                </div>
              </div>
            </div>
          ))}
          {(status === 'submitted' || status === 'streaming') && (
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

      {/* Error Display */}
      {error && (
        <div className="p-4 lg:p-8 pt-0">
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-600 text-sm mb-2">Something went wrong. Please try again.</p>
              <button
                onClick={reload}
                className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 text-sm font-medium"
              >
                <span>Retry</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Input */}
      <ChatInput
        input={input}
        setInput={setInput}
        sendMessage={handleCustomSubmit}
        status={status}
        currentPalette={currentPalette}
        fileContext={fileContext}
        error={error}
        reload={reload}
      />
    </div>
  );
}