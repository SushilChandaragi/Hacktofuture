
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import ChatMessage from './ChatMessage';
import SymptomInput from './SymptomInput';
import LanguageSelector from './LanguageSelector';
import { translateText, detectLanguage } from '../utils/translationService';
import { analyzeMedicalSymptoms, MedicalAnalysis } from '../utils/medicalAnalysis';


interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
  language?: string;
  analysis?: MedicalAnalysis;
}

const MedicalChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default to English
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Welcome message
    const welcomeMessage = selectedLanguage === 'hi' 
      ? "नमस्ते! मैं आपका चिकित्सा सहायक हूं। कृपया अपने लक्षणों का वर्णन करें।"
      : selectedLanguage === 'kn'
      ? "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ವೈದ್ಯಕೀಯ ಸಹಾಯಕ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ."
      : "Hello! I'm your medical assistant. Please describe your symptoms and I'll help analyze them.";
      
    setMessages([{
      id: '1',
      message: welcomeMessage,
      isUser: false,
      timestamp: new Date(),
      language: selectedLanguage
    }]);
  }, [selectedLanguage]);

  const handleSymptomSubmit = async (symptoms: string) => {
    const userMessageId = Date.now().toString();
    const userMessage: ChatMessage = {
      id: userMessageId,
      message: symptoms,
      isUser: true,
      timestamp: new Date(),
      language: selectedLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      console.log('Processing symptoms:', symptoms);
      
      // Step 1: Detect language if not explicitly set
      const detectedLang = selectedLanguage === 'en' ? 'en' : await detectLanguage(symptoms);
      console.log('Detected language:', detectedLang);

      // Step 2: Translate to English for ML processing
      const englishSymptoms = detectedLang !== 'en' 
        ? await translateText(symptoms, detectedLang, 'en')
        : symptoms;
      console.log('English symptoms:', englishSymptoms);

      // Step 3: Analyze symptoms with ML
      const analysis = await analyzeMedicalSymptoms(englishSymptoms);
      console.log('Medical analysis:', analysis);

      // Step 4: Create response in English
      const englishResponse = `Based on your symptoms, I've identified a possible ${analysis.condition}. 

Severity: ${analysis.severity.toUpperCase()}
Urgency: ${analysis.urgency.toUpperCase()}
Confidence: ${(analysis.confidence * 100).toFixed(0)}%

Recommendations:
${analysis.recommendations.map(rec => `• ${rec}`).join('\n')}

⚠️ Important: This is an AI assessment and should not replace professional medical advice. Please consult a healthcare provider for proper diagnosis and treatment.`;

      // Step 5: Translate response back to user's language
      const translatedResponse = selectedLanguage !== 'en'
        ? await translateText(englishResponse, 'en', selectedLanguage)
        : englishResponse;

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: translatedResponse,
        isUser: false,
        timestamp: new Date(),
        language: selectedLanguage,
        analysis
      };

      setMessages(prev => [...prev, botMessage]);

      // Show urgency toast
      if (analysis.urgency === 'emergency') {
        toast.error("Emergency: Seek immediate medical attention!");
      } else if (analysis.urgency === 'urgent') {
        toast.warning("Urgent: Consider consulting a doctor soon.");
      }

    } catch (error) {
      console.error('Error processing symptoms:', error);
      const errorMessage = selectedLanguage === 'hi' 
        ? "क्षमा करें, एक त्रुटि हुई है। कृपया पुनः प्रयास करें।"
        : selectedLanguage === 'kn'
        ? "ಕ್ಷಮಿಸಿ, ದೋಷ ಸಂಭವಿಸಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
        : "Sorry, an error occurred. Please try again.";
        
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        message: errorMessage,
        isUser: false,
        timestamp: new Date(),
        language: selectedLanguage
      }]);
      
      toast.error("An error occurred while processing your symptoms.");
    } finally {
      setIsProcessing(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'bg-red-500';
      case 'urgent': return 'bg-orange-500';
      default: return 'bg-green-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      default: return 'bg-green-100 text-green-800';
    }
  };


