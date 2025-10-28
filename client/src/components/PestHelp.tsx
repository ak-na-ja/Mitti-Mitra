import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Mic, Volume2, X } from 'lucide-react';

interface PestResult {
  pest: { en: string; hi: string };
  solution: { en: string; hi: string };
  imageUrl?: string;
}

export default function PestHelp() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [result, setResult] = useState<PestResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setTimeout(() => {
          setResult({
            pest: { en: 'Leaf Borer', hi: 'पत्ती छेदक' },
            solution: { en: 'Apply neem oil spray twice a week. Remove affected leaves.', hi: 'सप्ताह में दो बार नीम का तेल स्प्रे करें। प्रभावित पत्तियों को हटा दें।' },
            imageUrl: event.target?.result as string,
          });
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceInput = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setResult({
        pest: { en: 'Aphids', hi: 'माहू' },
        solution: { en: 'Use soap water spray. Encourage ladybugs in your field.', hi: 'साबुन के पानी का स्प्रे करें। अपने खेत में लेडीबग को प्रोत्साहित करें।' },
      });
    }, 2000);
  };

  const playAudio = () => {
    console.log('Playing audio solution');
  };

  const clearResult = () => {
    setResult(null);
    setSelectedImage(null);
  };

  if (result) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold" data-testid="text-pest-name">
              {t(result.pest)}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={clearResult}
              data-testid="button-clear-result"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {result.imageUrl && (
            <img
              src={result.imageUrl}
              alt="Uploaded crop"
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
          )}

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-lg">
                {t({ en: 'Solution:', hi: 'समाधान:' })}
              </h4>
              <p className="text-base text-foreground" data-testid="text-solution">
                {t(result.solution)}
              </p>
            </div>

            <Button
              className="w-full h-14"
              variant="outline"
              onClick={playAudio}
              data-testid="button-play-audio"
            >
              <Volume2 className="mr-2 h-5 w-5" />
              {t({ en: 'Listen to Solution', hi: 'समाधान सुनें' })}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-4">
        <h3 className="text-xl font-bold mb-4">
          {t({ en: 'Identify Pest Problem', hi: 'कीट समस्या की पहचान करें' })}
        </h3>

        <Button
          className="w-full h-32 flex-col gap-3"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          data-testid="button-upload-photo"
        >
          <Camera className="h-16 w-16" />
          <span className="text-lg">{t({ en: 'Upload Photo', hi: 'फोटो अपलोड करें' })}</span>
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card px-4 text-muted-foreground">
              {t({ en: 'OR', hi: 'या' })}
            </span>
          </div>
        </div>

        <Button
          className="w-full h-32 flex-col gap-3"
          variant="outline"
          onClick={handleVoiceInput}
          disabled={isRecording}
          data-testid="button-voice-input"
        >
          <Mic className={`h-16 w-16 ${isRecording ? 'text-destructive animate-pulse' : ''}`} />
          <span className="text-lg">
            {isRecording
              ? t({ en: 'Listening...', hi: 'सुन रहे हैं...' })
              : t({ en: 'Voice Input', hi: 'आवाज़ इनपुट' })}
          </span>
        </Button>
      </CardContent>
    </Card>
  );
}
