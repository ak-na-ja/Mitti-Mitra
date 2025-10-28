import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, LucideIcon } from 'lucide-react';

interface TipCardProps {
  icon: LucideIcon;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  onClick?: () => void;
}

export default function TipCard({ icon: Icon, title, description, onClick }: TipCardProps) {
  const { t } = useLanguage();

  return (
    <Card
      className="w-full hover-elevate active-elevate-2 cursor-pointer"
      onClick={onClick}
      data-testid="card-tip"
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold mb-1" data-testid="text-tip-title">
              {t(title)}
            </h3>
            <p className="text-base text-muted-foreground" data-testid="text-tip-description">
              {t(description)}
            </p>
          </div>
          <ChevronRight className="flex-shrink-0 w-5 h-5 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}
