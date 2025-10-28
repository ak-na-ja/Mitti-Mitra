import { useLanguage } from '@/contexts/LanguageContext';
import { Home, Lightbulb, Bug, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'tips' | 'pest' | 'profile';
  onTabChange: (tab: 'home' | 'tips' | 'pest' | 'profile') => void;
}

const tabs = [
  { id: 'home' as const, icon: Home, label: { en: 'Home', hi: 'होम' } },
  { id: 'tips' as const, icon: Lightbulb, label: { en: 'Tips', hi: 'सुझाव' } },
  { id: 'pest' as const, icon: Bug, label: { en: 'Analyser', hi: 'विश्लेषक' } },
  { id: 'profile' as const, icon: User, label: { en: 'Profile', hi: 'प्रोफ़ाइल' } },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border h-18 safe-bottom">
      <div className="flex items-center justify-around h-full px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl flex-1 max-w-24 hover-elevate active-elevate-2 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
              data-testid={`nav-${tab.id}`}
            >
              <Icon className="h-8 w-8" />
              <span className="text-sm font-medium">{t(tab.label)}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
