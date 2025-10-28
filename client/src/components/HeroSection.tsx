import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@assets/generated_images/Farmer_in_green_field_560bcc14.png';

interface HeroSectionProps {
  farmerName?: string;
}

export default function HeroSection({ farmerName }: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <div className="relative w-full h-60 overflow-hidden rounded-2xl">
      <img
        src={heroImage}
        alt="Farmer in field"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h1 className="text-2xl font-bold mb-1" data-testid="text-welcome">
          {t({ en: `Welcome, ${farmerName || 'Farmer'}!`, hi: `स्वागत है, ${farmerName || 'किसान'}!` })}
        </h1>
        <p className="text-lg opacity-90">
          {t({ en: 'Let\'s grow together', hi: 'आइए साथ मिलकर उगाएं' })}
        </p>
      </div>
    </div>
  );
}
