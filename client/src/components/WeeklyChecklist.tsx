import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Droplets, Sprout, Bug, Calendar } from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: { en: string; hi: string };
  icon: 'water' | 'plant' | 'pest' | 'calendar';
}

const iconMap = {
  water: Droplets,
  plant: Sprout,
  pest: Bug,
  calendar: Calendar,
};

interface WeeklyChecklistProps {
  items: ChecklistItem[];
}

export default function WeeklyChecklist({ items }: WeeklyChecklistProps) {
  const { t } = useLanguage();
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          <span data-testid="text-week-title">
            {t({ en: 'This Week\'s Tasks', hi: 'इस सप्ताह के कार्य' })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => {
          const Icon = iconMap[item.icon];
          const isChecked = checkedItems.has(item.id);

          return (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 rounded-xl hover-elevate active-elevate-2 cursor-pointer border border-border"
              onClick={() => toggleItem(item.id)}
              data-testid={`checklist-item-${item.id}`}
            >
              <Checkbox
                checked={isChecked}
                onCheckedChange={() => toggleItem(item.id)}
                className="h-8 w-8"
                data-testid={`checkbox-${item.id}`}
              />
              <Icon className={`h-6 w-6 flex-shrink-0 ${isChecked ? 'text-muted-foreground' : 'text-primary'}`} />
              <span className={`text-lg flex-1 ${isChecked ? 'line-through text-muted-foreground' : ''}`}>
                {t(item.label)}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
