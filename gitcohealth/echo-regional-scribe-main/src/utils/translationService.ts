
// Simulated translation service - in production, integrate with Google Translate API or similar
export const translateText = async (text: string, fromLang: string, toLang: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log(`Translating from ${fromLang} to ${toLang}:`, text);
  
  // Mock translations for demonstration
  const mockTranslations: Record<string, Record<string, string>> = {
    'hi': {
      'fever': 'बुखार',
      'headache': 'सिरदर्द',
      'cough': 'खांसी',
      'cold': 'सर्दी',
      'pain': 'दर्द',
      'nausea': 'मतली',
      'dizziness': 'चक्कर आना',
      'fatigue': 'थकान',
      'stomach': 'पेट',
      'chest': 'छाती',
      'breathing': 'सांस लेना',
      'vomiting': 'उल्टी',
      'Based on your symptoms': 'आपके लक्षणों के आधार पर',
      'I recommend': 'मैं सुझाता हूँ',
      'Please consult a doctor': 'कृपया डॉक्टर से सलाह लें',
      'Rest and hydration': 'आराम और पानी पिएं',
      'Monitor your symptoms': 'अपने लक्षणों पर नज़र रखें',
      'Seek immediate medical attention': 'तत्काल चिकित्सा सहायता लें',
      'Possible viral infection': 'संभावित वायरल संक्रमण',
      'Respiratory condition': 'श्वसन संबंधी स्थिति',
      'Acute pain condition': 'तीव्र दर्द की स्थिति',
      'Headache disorder': 'सिरदर्द विकार',
      'Digestive discomfort': 'पाचन संबंधी परेशानी'
    },
    'kn': {
      'fever': 'ಜ್ವರ',
      'headache': 'ತಲೆನೋವು',
      'cough': 'ಕೆಮ್ಮು',
      'cold': 'ಶೀತ',
      'pain': 'ನೋವು',
      'nausea': 'ವಾಂತಿ ಭಾವನೆ',
      'dizziness': 'ತಲೆತಿರುಗುವಿಕೆ',
      'fatigue': 'ಆಯಾಸ',
      'stomach': 'ಹೊಟ್ಟೆ',
      'chest': 'ಎದೆ',
      'breathing': 'ಉಸಿರಾಟ',
      'vomiting': 'ವಾಂತಿ',
      'Based on your symptoms': 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳ ಆಧಾರದ ಮೇಲೆ',
      'I recommend': 'ನಾನು ಶಿಫಾರಸು ಮಾಡುತ್ತೇನೆ',
      'Please consult a doctor': 'ದಯವಿಟ್ಟು ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ',
      'Rest and hydration': 'ವಿಶ್ರಾಂತಿ ಮತ್ತು ನೀರು ಕುಡಿಯಿರಿ',
      'Monitor your symptoms': 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ',
      'Seek immediate medical attention': 'ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ಸಹಾಯ ಪಡೆಯಿರಿ',
      'Possible viral infection': 'ಸಂಭವನೀಯ ವೈರಲ್ ಸೋಂಕು',
      'Respiratory condition': 'ಉಸಿರಾಟದ ಸ್ಥಿತಿ',
      'Acute pain condition': 'ತೀವ್ರ ನೋವಿನ ಸ್ಥಿತಿ',
      'Headache disorder': 'ತಲೆನೋವಿನ ಅಸ್ವಸ್ಥತೆ',
      'Digestive discomfort': 'ಜೀರ್ಣಕ್ರಿಯೆಯ ಅಸ್ವಸ್ಥತೆ'
    }
  };
  
  if (fromLang === toLang) {
    return text;
  }
  
  // Simple word-based translation for demo
  if (toLang !== 'en' && mockTranslations[toLang]) {
    let translatedText = text;
    Object.entries(mockTranslations[toLang]).forEach(([english, translated]) => {
      const regex = new RegExp(english, 'gi');
      translatedText = translatedText.replace(regex, translated);
    });
    return translatedText;
  }
  
  // For English translation, return as-is for demo
  return text;
};

export const detectLanguage = async (text: string): Promise<string> => {
  // Simple language detection based on character patterns
  const hindiPattern = /[\u0900-\u097F]/;
  const kannadaPattern = /[\u0C80-\u0CFF]/;
  
  if (hindiPattern.test(text)) return 'hi';
  if (kannadaPattern.test(text)) return 'kn';
  
  return 'hi'; // Default to Hindi
};
