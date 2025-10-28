import OnboardingStep from '../OnboardingStep';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function OnboardingStepExample() {
  const cropOptions = [
    { value: 'wheat', label: { en: 'Wheat', hi: 'गेहूं' } },
    { value: 'rice', label: { en: 'Rice', hi: 'चावल' } },
    { value: 'cotton', label: { en: 'Cotton', hi: 'कपास' } },
    { value: 'sugarcane', label: { en: 'Sugarcane', hi: 'गन्ना' } },
  ];

  return (
    <LanguageProvider>
      <OnboardingStep
        step={1}
        totalSteps={3}
        question={{ en: 'What crop are you growing?', hi: 'आप कौन सी फसल उगा रहे हैं?' }}
        options={cropOptions}
        icon="crop"
        onNext={(value) => console.log('Selected:', value)}
      />
    </LanguageProvider>
  );
}
