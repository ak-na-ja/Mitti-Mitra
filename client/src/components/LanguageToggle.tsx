import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="default"
      onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
      className="gap-2"
      data-testid="button-language-toggle"
    >
      <Languages className="h-5 w-5" />
      <span className="font-semibold">{language === 'en' ? 'हिंदी' : 'English'}</span>
    </Button>
  );
}
