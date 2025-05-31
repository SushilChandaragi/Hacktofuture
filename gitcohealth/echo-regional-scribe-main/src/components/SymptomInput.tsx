import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, MicOff } from "lucide-react";

interface SymptomInputProps {
  onSubmit: (symptoms: string) => void;
  disabled?: boolean;
  placeholder?: string;
  language?: string;
}

const SymptomInput: React.FC<SymptomInputProps> = ({ 
  onSubmit, 
  disabled = false,
  placeholder = "Describe your symptoms...",
  language = 'en'
}) => {
  const [symptoms, setSymptoms] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symptoms.trim() && !disabled) {
      onSubmit(symptoms.trim());
      setSymptoms('');
    }
  };

  const getLanguageCode = (lang: string) => {
    switch (lang) {
      case 'hi': return 'hi-IN';
      case 'kn': return 'kn-IN';
      case 'en': return 'en-US';
      default: return 'en-US';
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = getLanguageCode(language);

      recognition.onstart = () => {
        setIsListening(true);
        console.log('Voice recognition started for language:', getLanguageCode(language));
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log('Voice transcript:', transcript);
        setSymptoms(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Voice recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        console.log('Voice recognition ended');
      };

      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t bg-white">
      <div className="flex-1 relative">
        <Textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="min-h-[60px] resize-none pr-12"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="absolute right-2 top-2 h-8 w-8 p-0"
          onClick={handleVoiceInput}
          disabled={disabled}
        >
          {isListening ? (
            <MicOff className="h-4 w-4 text-red-500" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <Button 
        type="submit" 
        disabled={!symptoms.trim() || disabled}
        className="bg-blue-600 hover:bg-blue-700"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default SymptomInput;
