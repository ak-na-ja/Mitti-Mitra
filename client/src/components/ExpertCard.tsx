import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, MapPin, Clock, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Expert } from '@/data/experts';

interface ExpertCardProps {
  expert: Expert;
  onMessage: (expert: Expert) => void;
}

export default function ExpertCard({ expert, onMessage }: ExpertCardProps) {
  const { t } = useLanguage();

  const handleCall = () => {
    const contactHistory = JSON.parse(localStorage.getItem('expert-contact-history') || '[]');
    const newContact = {
      expertId: expert.id,
      expertName: expert.name,
      type: 'call',
      timestamp: new Date().toISOString(),
    };
    contactHistory.push(newContact);
    localStorage.setItem('expert-contact-history', JSON.stringify(contactHistory));
    
    window.location.href = `tel:${expert.phone}`;
  };

  const handleMessageClick = () => {
    const contactHistory = JSON.parse(localStorage.getItem('expert-contact-history') || '[]');
    const newContact = {
      expertId: expert.id,
      expertName: expert.name,
      type: 'message',
      timestamp: new Date().toISOString(),
    };
    contactHistory.push(newContact);
    localStorage.setItem('expert-contact-history', JSON.stringify(contactHistory));
    
    onMessage(expert);
  };

  return (
    <Card 
      className="overflow-hidden hover-elevate"
      data-testid={`card-expert-${expert.id}`}
    >
      <CardContent className="p-4 space-y-4">
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <img
              src={expert.profileImage}
              alt={expert.name}
              className="w-16 h-16 rounded-full"
              data-testid={`img-expert-${expert.id}`}
            />
            <div
              className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                expert.availability.status === 'available' 
                  ? 'bg-green-500' 
                  : 'bg-gray-400'
              }`}
              data-testid={`status-${expert.id}`}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 
              className="font-bold text-lg leading-tight"
              data-testid={`text-expert-name-${expert.id}`}
            >
              {expert.name}
            </h3>
            <p className="text-sm text-muted-foreground">{expert.title}</p>
            
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{expert.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({expert.totalConsultations} {t({ en: 'consultations', hi: 'परामर्श' })})
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span>{expert.location.district}, {expert.location.state}</span>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">
            {t({ en: 'Specialization:', hi: 'विशेषज्ञता:' })}
          </div>
          <div className="flex flex-wrap gap-2">
            {expert.specializations.map((spec, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs"
                data-testid={`badge-spec-${expert.id}-${index}`}
              >
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <Clock className="h-4 w-4 flex-shrink-0 mt-0.5 text-muted-foreground" />
          <span className="text-muted-foreground">{expert.availability.hours}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            onClick={handleCall}
            className="min-h-[48px] w-full"
            variant="default"
            data-testid={`button-call-${expert.id}`}
          >
            <Phone className="h-5 w-5 mr-2" />
            {t({ en: 'Call', hi: 'कॉल करें' })}
          </Button>
          <Button
            onClick={handleMessageClick}
            className="min-h-[48px] w-full"
            variant="outline"
            data-testid={`button-message-${expert.id}`}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            {t({ en: 'Message', hi: 'संदेश' })}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
