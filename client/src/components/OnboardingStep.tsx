import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight, Sprout, MapPin, Mountain } from 'lucide-react';
import Logo from '@/components/Logo';

interface Option {
  value: string;
  label: { en: string; hi: string };
}

interface OnboardingStepProps {
  step: number;
  totalSteps: number;
  question: { en: string; hi: string };
  options: Option[];
  icon: 'crop' | 'location' | 'soil';
  onNext: (value: string) => void;
  value?: string;
}

const iconMap = {
  crop: Sprout,
  location: MapPin,
  soil: Mountain,
};

export default function OnboardingStep({
  step,
  totalSteps,
  question,
  options,
  icon,
  onNext,
  value: initialValue,
}: OnboardingStepProps) {
  const { t } = useLanguage();
  const [selectedValue, setSelectedValue] = useState(initialValue || '');
  const Icon = iconMap[icon];

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="py-3 flex justify-center">
        <Logo />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-center gap-2 mb-8">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i + 1 === step ? 'w-8 bg-primary' : 'w-2 bg-muted'
                }`}
              />
            ))}
          </div>

          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="w-10 h-10 text-primary" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-8" data-testid="text-question">
            {t(question)}
          </h1>

          <div className="space-y-4">
            <Select value={selectedValue} onValueChange={setSelectedValue}>
              <SelectTrigger className="h-16 text-lg" data-testid="select-option">
                <SelectValue placeholder={t({ en: 'Select an option', hi: 'एक विकल्प चुनें' })} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-lg h-12">
                    {t(option.label)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Button
          className="w-full h-14 text-lg"
          size="lg"
          onClick={() => selectedValue && onNext(selectedValue)}
          disabled={!selectedValue}
          data-testid="button-next"
        >
          {t({ en: 'Next', hi: 'आगे' })}
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
