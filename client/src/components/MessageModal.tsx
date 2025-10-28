import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import type { Expert } from '@/data/experts';

interface MessageModalProps {
  expert: Expert | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MessageModal({ expert, isOpen, onClose }: MessageModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    if (!message.trim() || !expert) return;

    setIsSending(true);

    setTimeout(() => {
      const messages = JSON.parse(localStorage.getItem('expert-messages') || '[]');
      const newMessage = {
        expertId: expert.id,
        expertName: expert.name,
        message: message.trim(),
        timestamp: new Date().toISOString(),
        status: 'sent',
      };
      messages.push(newMessage);
      localStorage.setItem('expert-messages', JSON.stringify(messages));

      toast({
        title: t({ en: 'Message Sent', hi: 'संदेश भेजा गया' }),
        description: t({
          en: `Your message has been sent to ${expert.name}. They will respond soon.`,
          hi: `आपका संदेश ${expert.name} को भेज दिया गया है। वे जल्द ही जवाब देंगे।`,
        }),
      });

      setMessage('');
      setIsSending(false);
      onClose();
    }, 1000);
  };

  if (!expert) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" data-testid="modal-message">
        <DialogHeader>
          <DialogTitle>
            {t({ en: 'Message Expert', hi: 'विशेषज्ञ को संदेश' })}
          </DialogTitle>
          <DialogDescription>
            {t({ en: 'Send a message to', hi: 'को संदेश भेजें' })} {expert.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <img
              src={expert.profileImage}
              alt={expert.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="font-medium">{expert.name}</div>
              <div className="text-sm text-muted-foreground">{expert.title}</div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              {t({ en: 'Your Message', hi: 'आपका संदेश' })}
            </label>
            <Textarea
              id="message"
              placeholder={t({
                en: 'Type your question or concern here...',
                hi: 'यहां अपना प्रश्न या चिंता लिखें...',
              })}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] resize-none"
              data-testid="input-message"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="min-h-[48px]"
            data-testid="button-cancel-message"
          >
            {t({ en: 'Cancel', hi: 'रद्द करें' })}
          </Button>
          <Button
            onClick={handleSend}
            disabled={!message.trim() || isSending}
            className="min-h-[48px]"
            data-testid="button-send-message"
          >
            <Send className="h-4 w-4 mr-2" />
            {isSending
              ? t({ en: 'Sending...', hi: 'भेज रहे हैं...' })
              : t({ en: 'Send', hi: 'भेजें' })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
