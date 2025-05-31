
export interface MedicalAnalysis {
  condition: string;
  severity: 'low' | 'medium' | 'high';
  recommendations: string[];
  urgency: 'routine' | 'urgent' | 'emergency';
  confidence: number;
}

export const analyzeMedicalSymptoms = async (symptoms: string): Promise<MedicalAnalysis> => {
  // Simulate ML processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('Analyzing symptoms:', symptoms);
  
  const lowerSymptoms = symptoms.toLowerCase();
  
  // Simple rule-based analysis for demonstration
  let condition = 'General discomfort';
  let severity: 'low' | 'medium' | 'high' = 'low';
  let urgency: 'routine' | 'urgent' | 'emergency' = 'routine';
  let recommendations: string[] = ['Rest and hydration', 'Monitor your symptoms'];
  let confidence = 0.7;
  
  // Fever analysis
  if (lowerSymptoms.includes('fever') || lowerSymptoms.includes('temperature')) {
    condition = 'Possible viral infection';
    severity = 'medium';
    urgency = 'urgent';
    recommendations = [
      'Take fever-reducing medication as directed',
      'Rest and stay hydrated',
      'Monitor temperature regularly',
      'Consult a doctor if fever persists over 3 days'
    ];
    confidence = 0.8;
  }
  
  // Respiratory symptoms
  if (lowerSymptoms.includes('cough') || lowerSymptoms.includes('breathing') || lowerSymptoms.includes('chest')) {
    condition = 'Respiratory condition';
    severity = 'medium';
    urgency = 'urgent';
    recommendations = [
      'Stay hydrated and rest',
      'Use a humidifier if available',
      'Avoid smoke and irritants',
      'Seek medical attention if breathing difficulties persist'
    ];
    confidence = 0.75;
  }
  
  // Pain analysis
  if (lowerSymptoms.includes('severe pain') || lowerSymptoms.includes('chest pain')) {
    condition = 'Acute pain condition';
    severity = 'high';
    urgency = 'emergency';
    recommendations = [
      'Seek immediate medical attention',
      'Do not ignore severe or chest pain',
      'Call emergency services if needed'
    ];
    confidence = 0.9;
  }
  
  // Headache
  if (lowerSymptoms.includes('headache') || lowerSymptoms.includes('head pain')) {
    condition = 'Headache disorder';
    severity = 'low';
    recommendations = [
      'Rest in a quiet, dark room',
      'Stay hydrated',
      'Consider over-the-counter pain relief',
      'Consult a doctor if headaches are frequent or severe'
    ];
    confidence = 0.7;
  }
  
  // Digestive issues
  if (lowerSymptoms.includes('nausea') || lowerSymptoms.includes('vomiting') || lowerSymptoms.includes('stomach')) {
    condition = 'Digestive discomfort';
    severity = 'medium';
    recommendations = [
      'Stay hydrated with small sips of water',
      'Avoid solid foods temporarily',
      'Try bland foods when feeling better',
      'Consult a doctor if symptoms persist'
    ];
    confidence = 0.8;
  }
  
  return {
    condition,
    severity,
    recommendations,
    urgency,
    confidence
  };
};
