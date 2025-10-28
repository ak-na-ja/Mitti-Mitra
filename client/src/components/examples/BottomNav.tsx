import { useState } from 'react';
import BottomNav from '../BottomNav';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function BottomNavExample() {
  const [activeTab, setActiveTab] = useState<'home' | 'tips' | 'pest' | 'profile'>('home');

  return (
    <LanguageProvider>
      <div className="h-screen relative">
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </LanguageProvider>
  );
}
