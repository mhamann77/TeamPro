"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Send, Sparkles } from "lucide-react";

export default function AiPromptHeader() {
  const [query, setQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      console.log("AI Query:", query);
      setIsProcessing(false);
      setQuery("");
    }, 2000);
  };

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900 hidden sm:inline">What can AI do for you?</span>
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              BETA
            </Badge>
          </div>
          
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask AI anything..."
                className="pr-12"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <Button
                onClick={handleSubmit}
                disabled={!query.trim() || isProcessing}
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0"
              >
                {isProcessing ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}