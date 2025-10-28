import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { FarmingTip, Priority } from '@/data/farmingTips';

interface SmartTipCardProps {
  tip: FarmingTip & { matchedFactors?: string[] };
  icon: React.ComponentType<{ className?: string }>;
}

export default function SmartTipCard({ tip, icon: Icon }: SmartTipCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t, language } = useLanguage();

  const getPriorityBadge = (priority: Priority) => {
    const variants = {
      high: 'destructive' as const,
      medium: 'default' as const,
      low: 'secondary' as const,
    };
    const labels = {
      high: { en: 'High Priority', hi: 'उच्च प्राथमिकता' },
      medium: { en: 'Medium', hi: 'मध्यम' },
      low: { en: 'Low', hi: 'कम' },
    };
    return (
      <Badge variant={variants[priority]} className="text-xs" data-testid={`badge-priority-${priority}`}>
        {labels[priority][language]}
      </Badge>
    );
  };

  return (
    <Card className="hover-elevate active-elevate-2" data-testid={`card-tip-${tip.id}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Icon className="h-7 w-7 text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-base leading-tight" data-testid="text-tip-title">
                {tip.title[language]}
              </h3>
              {getPriorityBadge(tip.priority)}
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2" data-testid="text-tip-description">
              {tip.description[language]}
            </p>
            
            {tip.matchedFactors && tip.matchedFactors.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {tip.matchedFactors.slice(0, 3).map((factor, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs font-normal" data-testid={`badge-factor-${idx}`}>
                    {factor}
                  </Badge>
                ))}
              </div>
            )}
            
            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-border space-y-3">
                <div className="bg-primary/5 p-3 rounded-xl">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-primary mb-1" data-testid="text-why-label">
                        {t({ en: 'Why this tip?', hi: 'यह सुझाव क्यों?' })}
                      </p>
                      <p className="text-xs text-muted-foreground" data-testid="text-why-explanation">
                        {tip.whyThisTip[language]}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm space-y-1">
                  <p className="font-medium" data-testid="text-full-description">
                    {tip.description[language]}
                  </p>
                </div>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 px-0 h-auto text-primary hover:text-primary/80"
              data-testid={`button-${isExpanded ? 'collapse' : 'expand'}`}
            >
              {isExpanded ? (
                <>
                  {t({ en: 'Show less', hi: 'कम दिखाएं' })}
                  <ChevronUp className="h-4 w-4 ml-1" />
                </>
              ) : (
                <>
                  {t({ en: 'Learn more', hi: 'और जानें' })}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
