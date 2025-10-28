import TipCard from '../TipCard';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Droplets } from 'lucide-react';

export default function TipCardExample() {
  return (
    <LanguageProvider>
      <div className="p-4">
        <TipCard
          icon={Droplets}
          title={{ en: 'Irrigation Schedule', hi: 'सिंचाई कार्यक्रम' }}
          description={{ en: 'Water your crops every 3 days during this season', hi: 'इस मौसम में हर 3 दिन में अपनी फसलों को पानी दें' }}
          onClick={() => console.log('Tip clicked')}
        />
      </div>
    </LanguageProvider>
  );
}
