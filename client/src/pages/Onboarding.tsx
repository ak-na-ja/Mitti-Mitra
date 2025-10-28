import { useState } from 'react';
import OnboardingStep from '@/components/OnboardingStep';

interface OnboardingData {
  crop?: string;
  location?: string;
  soil?: string;
}

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

const cropOptions = [
  { value: 'wheat', label: { en: 'Wheat', hi: 'गेहूं' } },
  { value: 'rice', label: { en: 'Rice', hi: 'चावल' } },
  { value: 'cotton', label: { en: 'Cotton', hi: 'कपास' } },
  { value: 'sugarcane', label: { en: 'Sugarcane', hi: 'गन्ना' } },
  { value: 'maize', label: { en: 'Maize', hi: 'मक्का' } },
  { value: 'pulses', label: { en: 'Pulses', hi: 'दालें' } },
];

const locationOptions = [
  { value: 'punjab', label: { en: 'Punjab', hi: 'पंजाब' } },
  { value: 'haryana', label: { en: 'Haryana', hi: 'हरियाणा' } },
  { value: 'up', label: { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश' } },
  { value: 'mp', label: { en: 'Madhya Pradesh', hi: 'मध्य प्रदेश' } },
  { value: 'maharashtra', label: { en: 'Maharashtra', hi: 'महाराष्ट्र' } },
  { value: 'gujarat', label: { en: 'Gujarat', hi: 'गुजरात' } },
];

const soilOptions = [
  { value: 'alluvial', label: { en: 'Alluvial Soil', hi: 'जलोढ़ मिट्टी' } },
  { value: 'black', label: { en: 'Black Soil', hi: 'काली मिट्टी' } },
  { value: 'red', label: { en: 'Red Soil', hi: 'लाल मिट्टी' } },
  { value: 'laterite', label: { en: 'Laterite Soil', hi: 'लैटेराइट मिट्टी' } },
  { value: 'desert', label: { en: 'Desert Soil', hi: 'रेगिस्तानी मिट्टी' } },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({});

  const handleNext = (value: string) => {
    if (currentStep === 1) {
      setData({ ...data, crop: value });
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setData({ ...data, location: value });
      setCurrentStep(3);
    } else if (currentStep === 3) {
      const finalData = { ...data, soil: value };
      setData(finalData);
      onComplete(finalData);
    }
  };

  if (currentStep === 1) {
    return (
      <OnboardingStep
        step={1}
        totalSteps={3}
        question={{ en: 'What crop are you growing?', hi: 'आप कौन सी फसल उगा रहे हैं?' }}
        options={cropOptions}
        icon="crop"
        onNext={handleNext}
        value={data.crop}
      />
    );
  }

  if (currentStep === 2) {
    return (
      <OnboardingStep
        step={2}
        totalSteps={3}
        question={{ en: 'Where is your farm located?', hi: 'आपका खेत कहाँ स्थित है?' }}
        options={locationOptions}
        icon="location"
        onNext={handleNext}
        value={data.location}
      />
    );
  }

  return (
    <OnboardingStep
      step={3}
      totalSteps={3}
      question={{ en: 'What type of soil do you have?', hi: 'आपके पास किस प्रकार की मिट्टी है?' }}
      options={soilOptions}
      icon="soil"
      onNext={handleNext}
      value={data.soil}
    />
  );
}
