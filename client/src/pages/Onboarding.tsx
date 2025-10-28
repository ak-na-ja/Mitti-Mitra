import { useState } from 'react';
import OnboardingStep from '@/components/OnboardingStep';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';
import Header from '@/components/Header';

interface OnboardingData {
  name?: string;
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
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({});
  const [name, setName] = useState('');

  const handleNameNext = () => {
    if (name.trim()) {
      setData({ ...data, name: name.trim() });
      setCurrentStep(1);
    }
  };

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

  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center p-4 pt-8">
          <Card className="w-full max-w-md">
          <CardContent className="pt-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <User className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">
                {t({ en: 'Welcome!', hi: 'स्वागत है!' })}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t({ en: 'What is your name?', hi: 'आपका नाम क्या है?' })}
              </p>
            </div>
            
            <div className="space-y-4">
              <Input
                type="text"
                placeholder={t({ en: 'Enter your name', hi: 'अपना नाम दर्ज करें' })}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 text-lg text-center"
                data-testid="input-name"
                onKeyPress={(e) => e.key === 'Enter' && handleNameNext()}
              />
              
              <Button 
                onClick={handleNameNext}
                disabled={!name.trim()}
                className="w-full h-14 text-lg"
                data-testid="button-next-name"
              >
                {t({ en: 'Continue', hi: 'जारी रखें' })}
              </Button>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              {t({ en: 'Step 1 of 4', hi: 'चरण 1/4' })}
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    );
  }

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <OnboardingStep
          step={2}
          totalSteps={4}
          question={{ en: 'What crop are you growing?', hi: 'आप कौन सी फसल उगा रहे हैं?' }}
          options={cropOptions}
          icon="crop"
          onNext={handleNext}
          value={data.crop}
        />
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <OnboardingStep
          step={3}
          totalSteps={4}
          question={{ en: 'Where is your farm located?', hi: 'आपका खेत कहाँ स्थित है?' }}
          options={locationOptions}
          icon="location"
          onNext={handleNext}
          value={data.location}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <OnboardingStep
        step={4}
        totalSteps={4}
        question={{ en: 'What type of soil do you have?', hi: 'आपके पास किस प्रकार की मिट्टी है?' }}
        options={soilOptions}
        icon="soil"
        onNext={handleNext}
        value={data.soil}
      />
    </div>
  );
}
