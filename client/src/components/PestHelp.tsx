import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Mic, Volume2, X, AlertCircle, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface Issue {
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  solution: string;
}

interface AnalysisResult {
  issues: Issue[];
  generalHealth: string;
  recommendations: string[];
  imageUrl?: string;
}

export default function PestHelp() {
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageUrl = event.target?.result as string;
        setSelectedImage(imageUrl);
        setIsAnalyzing(true);

        try {
          const formData = new FormData();
          formData.append('image', file);
          formData.append('language', language);

          const analysis = await apiRequest('/api/analyze-crop', {
            method: 'POST',
            body: formData,
          });

          setResult({
            issues: analysis.issues || [],
            generalHealth: analysis.generalHealth || '',
            recommendations: analysis.recommendations || [],
            imageUrl,
          });
        } catch (error) {
          console.error('Analysis failed:', error);
          const errorMessages = language === 'hi' 
            ? {
                type: 'विश्लेषण त्रुटि',
                description: 'छवि का विश्लेषण नहीं कर सके। कृपया पुनः प्रयास करें।',
                solution: 'सुनिश्चित करें कि छवि स्पष्ट है और फसल या मिट्टी को स्पष्ट रूप से दिखाती है।',
                health: 'निर्धारित करने में असमर्थ',
                rec1: 'एक स्पष्ट छवि अपलोड करने का प्रयास करें',
                rec2: 'अच्छी रोशनी सुनिश्चित करें',
              }
            : {
                type: 'Analysis Error',
                description: 'Could not analyze the image. Please try again.',
                solution: 'Ensure the image is clear and shows the crop or soil clearly.',
                health: 'Unable to determine',
                rec1: 'Try uploading a clearer image',
                rec2: 'Ensure good lighting',
              };
          
          setResult({
            issues: [{
              type: errorMessages.type,
              severity: 'medium',
              description: errorMessages.description,
              solution: errorMessages.solution,
            }],
            generalHealth: errorMessages.health,
            recommendations: [errorMessages.rec1, errorMessages.rec2],
            imageUrl,
          });
        } finally {
          setIsAnalyzing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearResult = () => {
    setResult(null);
    setSelectedImage(null);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertCircle className="h-5 w-5 text-destructive" />;
      case 'medium': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'low': return <CheckCircle className="h-5 w-5 text-primary" />;
      default: return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-destructive/50 bg-destructive/5';
      case 'medium': return 'border-orange-500/50 bg-orange-500/5';
      case 'low': return 'border-primary/50 bg-primary/5';
      default: return '';
    }
  };

  if (isAnalyzing) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="text-lg font-semibold">
              {t({ en: 'Analysing image', hi: 'छवि का विश्लेषण कर रहे हैं' })}
            </p>
            <p className="text-sm text-muted-foreground text-center">
              {t({ en: 'This may take a few seconds', hi: 'इसमें कुछ सेकंड लग सकते हैं' })}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (result) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold">
              {t({ en: 'Analysis Results', hi: 'विश्लेषण परिणाम' })}
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
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
          )}

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/30 border border-border">
              <h4 className="font-semibold mb-2 text-sm text-muted-foreground">
                {t({ en: 'Overall Health', hi: 'समग्र स्वास्थ्य' })}
              </h4>
              <p className="text-base" data-testid="text-general-health">
                {result.generalHealth}
              </p>
            </div>

            {result.issues.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 text-lg">
                  {t({ en: 'Issues Found', hi: 'पाई गई समस्याएं' })}
                </h4>
                <div className="space-y-3">
                  {result.issues.map((issue, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border-2 ${getSeverityColor(issue.severity)}`}
                      data-testid={`issue-${index}`}
                    >
                      <div className="flex items-start gap-3 mb-2">
                        {getSeverityIcon(issue.severity)}
                        <div className="flex-1">
                          <h5 className="font-semibold text-base mb-1">{issue.type}</h5>
                          <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>
                          <div className="bg-background/50 p-3 rounded-lg">
                            <p className="text-sm font-medium mb-2">
                              {t({ en: 'Solution:', hi: 'समाधान:' })}
                            </p>
                            <div className="text-sm space-y-1">
                              {issue.solution.split('\n').filter(line => line.trim()).map((line, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <span className="text-primary mt-0.5">•</span>
                                  <span>{line.replace(/^[•\-]\s*/, '').trim()}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.recommendations.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 text-lg">
                  {t({ en: 'Recommendations', hi: 'सिफारिशें' })}
                </h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button
              className="w-full h-14"
              onClick={clearResult}
              data-testid="button-analyze-another"
            >
              {t({ en: 'Analyze Another Image', hi: 'एक और छवि का विश्लेषण करें' })}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-4">
        <div className="text-center space-y-2 mb-6">
          <h3 className="text-xl font-bold">
            {t({ en: 'Crop & Soil Analysis', hi: 'फसल और मिट्टी विश्लेषण' })}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t({ 
              en: 'Upload a photo of your crop leaves or soil for instant AI-powered analysis', 
              hi: 'तत्काल AI-संचालित विश्लेषण के लिए अपनी फसल की पत्तियों या मिट्टी की फोटो अपलोड करें' 
            })}
          </p>
        </div>

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

        <div className="p-4 bg-muted/30 rounded-xl text-sm text-muted-foreground">
          <p className="font-medium mb-1">
            {t({ en: 'Tips for best results:', hi: 'सर्वोत्तम परिणामों के लिए सुझाव:' })}
          </p>
          <ul className="space-y-1 ml-4 list-disc">
            <li>{t({ en: 'Take photos in good lighting', hi: 'अच्छी रोशनी में फोटो लें' })}</li>
            <li>{t({ en: 'Focus on affected areas', hi: 'प्रभावित क्षेत्रों पर ध्यान दें' })}</li>
            <li>{t({ en: 'Include close-up details', hi: 'क्लोज़-अप विवरण शामिल करें' })}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
