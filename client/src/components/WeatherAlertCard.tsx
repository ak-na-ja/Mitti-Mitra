import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CloudRain, ThermometerSun, Cloud } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { WeatherAlert } from '@/data/farmingTips';

interface WeatherAlertCardProps {
  alert: WeatherAlert;
}

export default function WeatherAlertCard({ alert }: WeatherAlertCardProps) {
  const { language } = useLanguage();

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ComponentType<{ className?: string }>> = {
      'cloud-rain': CloudRain,
      'thermometer-sun': ThermometerSun,
      'cloud-fog': Cloud,
      'wind': Cloud,
    };
    const IconComponent = icons[iconName] || AlertTriangle;
    return <IconComponent className="h-6 w-6" />;
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      high: 'destructive',
      medium: 'default',
      low: 'secondary',
    };
    return colors[severity as keyof typeof colors] || 'default';
  };

  return (
    <Card 
      className="border-l-4 border-l-destructive bg-destructive/5"
      data-testid={`card-alert-${alert.id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
            {getIcon(alert.icon)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-base" data-testid="text-alert-title">
                {alert.title[language]}
              </h3>
              <Badge variant={getSeverityColor(alert.severity) as any} className="text-xs" data-testid="badge-alert-severity">
                {alert.severity.toUpperCase()}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2" data-testid="text-alert-description">
              {alert.description[language]}
            </p>
            
            <div className="bg-background/50 p-2 rounded-lg">
              <p className="text-xs font-medium" data-testid="text-alert-action">
                <span className="text-destructive">⚡ </span>
                {alert.actionRequired[language]}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
