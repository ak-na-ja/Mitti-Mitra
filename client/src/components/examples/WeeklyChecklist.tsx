import WeeklyChecklist from '../WeeklyChecklist';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function WeeklyChecklistExample() {
  const mockItems = [
    { id: '1', label: { en: 'Water the crops in morning', hi: 'सुबह फसलों को पानी दें' }, icon: 'water' as const },
    { id: '2', label: { en: 'Check for pests', hi: 'कीटों की जांच करें' }, icon: 'pest' as const },
    { id: '3', label: { en: 'Apply fertilizer', hi: 'उर्वरक डालें' }, icon: 'plant' as const },
  ];

  return (
    <LanguageProvider>
      <div className="p-4">
        <WeeklyChecklist items={mockItems} />
      </div>
    </LanguageProvider>
  );
}
