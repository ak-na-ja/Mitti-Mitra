import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import WeeklyChecklist from '@/components/WeeklyChecklist';
import TipCard from '@/components/TipCard';
import BottomNav from '@/components/BottomNav';
import LanguageToggle from '@/components/LanguageToggle';
import PestHelp from '@/components/PestHelp';
import { Droplets, Sun, Bug, Sprout } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'home' | 'tips' | 'pest' | 'profile'>('home');

  const weeklyTasks = [
    { id: '1', label: { en: 'Water crops in early morning', hi: 'सुबह जल्दी फसलों को पानी दें' }, icon: 'water' as const },
    { id: '2', label: { en: 'Check for pest infestation', hi: 'कीट संक्रमण की जांच करें' }, icon: 'pest' as const },
    { id: '3', label: { en: 'Apply organic fertilizer', hi: 'जैविक उर्वरक डालें' }, icon: 'plant' as const },
  ];

  const tips = [
    {
      icon: Droplets,
      title: { en: 'Irrigation Schedule', hi: 'सिंचाई कार्यक्रम' },
      description: { en: 'Water every 3 days in current weather', hi: 'मौजूदा मौसम में हर 3 दिन में पानी दें' },
    },
    {
      icon: Sun,
      title: { en: 'Best Planting Time', hi: 'रोपण का सबसे अच्छा समय' },
      description: { en: 'Next planting window: 15-20 days', hi: 'अगली रोपण अवधि: 15-20 दिन' },
    },
    {
      icon: Bug,
      title: { en: 'Pest Prevention', hi: 'कीट रोकथाम' },
      description: { en: 'Use neem spray this week', hi: 'इस सप्ताह नीम स्प्रे का उपयोग करें' },
    },
    {
      icon: Sprout,
      title: { en: 'Crop Health', hi: 'फसल स्वास्थ्य' },
      description: { en: 'Monitor growth and remove weeds', hi: 'वृद्धि की निगरानी करें और खरपतवार हटाएं' },
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center justify-end p-4">
          <LanguageToggle />
        </div>
      </div>

      {activeTab === 'home' && (
        <div className="px-4 py-6 space-y-6">
          <HeroSection farmerName="राजेश" />
          <WeeklyChecklist items={weeklyTasks} />
        </div>
      )}

      {activeTab === 'tips' && (
        <div className="px-4 py-6 space-y-4">
          {tips.map((tip, index) => (
            <TipCard
              key={index}
              icon={tip.icon}
              title={tip.title}
              description={tip.description}
              onClick={() => console.log('Tip clicked:', tip.title.en)}
            />
          ))}
        </div>
      )}

      {activeTab === 'pest' && (
        <div className="px-4 py-6">
          <PestHelp />
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="px-4 py-6">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
              <span className="text-4xl">👨‍🌾</span>
            </div>
            <h2 className="text-2xl font-bold">राजेश कुमार</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>गेहूं • पंजाब • जलोढ़ मिट्टी</p>
              <p>1.5 hectares</p>
            </div>
          </div>
        </div>
      )}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
