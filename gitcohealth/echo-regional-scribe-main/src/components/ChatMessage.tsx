
import React from 'react';
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
  language?: string;
  isLoading?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isUser, 
  timestamp, 
  language,
  isLoading = false 
}) => {
  return (
    <div className={cn(
      "flex gap-3 p-4 animate-in slide-in-from-bottom-2",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      <div className={cn(
        "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full",
        isUser ? "bg-blue-600 text-white" : "bg-green-100 text-green-700"
      )}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      
      <div className={cn(
        "flex flex-col max-w-[80%]",
        isUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "rounded-lg px-4 py-2 text-sm shadow-sm",
          isUser 
            ? "bg-blue-600 text-white" 
            : "bg-white border border-gray-200 text-gray-900"
        )}>
          {isLoading ? (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{message}</p>
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
          <span>{timestamp.toLocaleTimeString()}</span>
          {language && language !== 'en' && (
            <span className="px-2 py-1 bg-gray-100 rounded text-xs">
              {language.toUpperCase()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
