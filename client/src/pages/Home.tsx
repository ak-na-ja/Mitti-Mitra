import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import WeeklyChecklist from '@/components/WeeklyChecklist';
import TipCard from '@/components/TipCard';
import BottomNav from '@/components/BottomNav';
import LanguageToggle from '@/components/LanguageToggle';
import PestHelp from '@/components/PestHelp';
import { Droplets, Sun, Bug, Sprout, Leaf, Mountain, Calendar } from 'lucide-react';
import { getTipsForUser } from '@/data/farmingTips';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'home' | 'tips' | 'pest' | 'profile'>('home');
  const { t } = useLanguage();
  const [userData, setUserData] = useState<any>(null);
  const [personalizedTips, setPersonalizedTips] = useState<any[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem('farmer-app-data');
    if (savedData) {
      const data = JSON.parse(savedData);
      setUserData(data);
      const tips = getTipsForUser(data.crop, data.location, data.soil);
      setPersonalizedTips(tips);
    }
  }, []);

  const weeklyTasks = [
    { id: '1', label: { en: 'Water crops in early morning', hi: 'सुबह जल्दी फसलों को पानी दें' }, icon: 'water' as const },
    { id: '2', label: { en: 'Check for pest infestation', hi: 'कीट संक्रमण की जांच करें' }, icon: 'pest' as const },
    { id: '3', label: { en: 'Apply organic fertilizer', hi: 'जैविक उर्वरक डालें' }, icon: 'plant' as const },
  ];

  const getIconComponent = (iconName: string) => {
    const icons: any = {
      droplets: Droplets,
      sprout: Sprout,
      bug: Bug,
      plant: Leaf,
      mountain: Mountain,
      calendar: Calendar,
      'spray-can': Bug,
    };
    return icons[iconName] || Sprout;
  };

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
        <div className="px-4 py-6 space-y-6">
          {userData && (
            <div className="bg-primary/10 p-4 rounded-2xl border border-primary/20">
              <h3 className="font-semibold text-lg mb-2">
                {t({ en: 'Personalized for You', hi: 'आपके लिए वैयक्तिकृत' })}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t({ en: `Tips for ${userData.crop} in ${userData.location}`, hi: `${userData.location} में ${userData.crop} के लिए सुझाव` })}
              </p>
            </div>
          )}

          {personalizedTips.length > 0 ? (
            <div className="space-y-4">
              {personalizedTips.map((tip) => (
                <TipCard
                  key={tip.id}
                  icon={getIconComponent(tip.icon)}
                  title={tip.title}
                  description={tip.description}
                  onClick={() => console.log('Tip clicked:', tip.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <Sprout className="h-16 w-16 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">
                {t({ en: 'Complete onboarding to see personalized tips', hi: 'वैयक्तिकृत सुझाव देखने के लिए ऑनबोर्डिंग पूरी करें' })}
              </p>
            </div>
          )}
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
