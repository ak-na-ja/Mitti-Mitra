import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle2, AlertCircle, Clock, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';
import type { AdviceSession } from '@/types/adviceSession';

interface SessionCardProps {
  session: AdviceSession;
  onClick: () => void;
}

export default function SessionCard({ session, onClick }: SessionCardProps) {
  const { t } = useLanguage();

  const getOutcomeIcon = () => {
    if (!session.farmerFeedback) {
      return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
    
    switch (session.farmerFeedback.outcomeStatus) {
      case 'positive':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'needs_followup':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getImpactDisplay = () => {
    if (!session.farmerFeedback) return null;
    
    const { yieldImpact, cropSavedPercentage } = session.farmerFeedback;
    
    if (yieldImpact !== undefined && yieldImpact !== 0) {
      return (
        <div className={`flex items-center gap-1 text-sm font-semibold ${
          yieldImpact > 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {yieldImpact > 0 ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          {yieldImpact > 0 ? '+' : ''}{yieldImpact}% {t({ en: 'yield', hi: 'उपज' })}
        </div>
      );
    }
    
    if (cropSavedPercentage !== undefined && cropSavedPercentage > 0) {
      return (
        <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
          <CheckCircle2 className="h-4 w-4" />
          {cropSavedPercentage}% {t({ en: 'crop saved', hi: 'फसल बचाई' })}
        </div>
      );
    }
    
    return null;
  };

  return (
    <Card 
      className="hover-elevate cursor-pointer"
      onClick={onClick}
      data-testid={`card-session-${session.id}`}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="flex-shrink-0 pt-1">
            {getOutcomeIcon()}
          </div>
          
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(session.date), 'MMM dd, yyyy')}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {session.cropType}
                  </Badge>
                </div>
                <h3 className="font-bold text-base leading-tight mb-1" data-testid={`text-session-title-${session.id}`}>
                  {session.topic}
                </h3>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {session.recommendationSummary}
            </p>
            
            {getImpactDisplay()}
            
            {session.farmerFeedback?.rating && (
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-lg ${
                      star <= session.farmerFeedback!.rating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
