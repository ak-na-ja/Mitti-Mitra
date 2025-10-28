import HeroSection from '../HeroSection';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function HeroSectionExample() {
  return (
    <LanguageProvider>
      <div className="p-4">
        <HeroSection farmerName="राजेश" />
      </div>
    </LanguageProvider>
  );
}
