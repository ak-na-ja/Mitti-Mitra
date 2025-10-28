import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Mic, Volume2, X, AlertCircle, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { saveAdviceSession } from '@/utils/adviceSessionStorage';
import type { AdviceSession } from '@/types/adviceSession';

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
  const [isTranslating, setIsTranslating] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [englishResult, setEnglishResult] = useState<AnalysisResult | null>(null);
  const [hindiResult, setHindiResult] = useState<AnalysisResult | null>(null);
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
          formData.append('language', 'en');

          const analysis = await apiRequest('/api/analyze-crop', {
            method: 'POST',
            body: formData,
          });

          const resultData = {
            issues: analysis.issues || [],
            generalHealth: analysis.generalHealth || '',
            recommendations: analysis.recommendations || [],
            imageUrl,
          };

          setEnglishResult(resultData);
          setHindiResult(null);
          setResult(resultData);
          
          saveSessionToHistory(resultData, file.name);
        } catch (error) {
          console.error('Analysis failed:', error);
          const errorData = {
            issues: [{
              type: 'Analysis Error',
              severity: 'medium' as const,
              description: 'Could not analyze the image. Please try again.',
              solution: 'Ensure the image is clear and shows the crop or soil clearly.',
            }],
            generalHealth: 'Unable to determine',
            recommendations: ['Try uploading a clearer image', 'Ensure good lighting'],
            imageUrl,
          };
          
          setEnglishResult(errorData);
          setHindiResult(null);
          setResult(errorData);
        } finally {
          setIsAnalyzing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const translateToHindi = async () => {
      if (!englishResult || language === 'en') {
        if (englishResult && language === 'en') {
          setResult(englishResult);
        }
        return;
      }

      if (hindiResult) {
        setResult(hindiResult);
        return;
      }

      setIsTranslating(true);
      try {
        const translated = await apiRequest('/api/translate-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            generalHealth: englishResult.generalHealth,
            issues: englishResult.issues,
            recommendations: englishResult.recommendations,
          }),
        });

        const hindiData = {
          issues: translated.issues || [],
          generalHealth: translated.generalHealth || '',
          recommendations: translated.recommendations || [],
          imageUrl: englishResult.imageUrl,
        };

        setHindiResult(hindiData);
        setResult(hindiData);
      } catch (error) {
        console.error('Translation failed:', error);
        setResult(englishResult);
      } finally {
        setIsTranslating(false);
      }
    };

    translateToHindi();
  }, [language, englishResult, hindiResult]);

  const clearResult = () => {
    setResult(null);
    setEnglishResult(null);
    setHindiResult(null);
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

  const saveSessionToHistory = (analysisResult: AnalysisResult, fileName: string) => {
    const userData = localStorage.getItem('farmer-app-data');
    const cropType = userData ? JSON.parse(userData).crop : 'Unknown';
    
    const primaryIssue = analysisResult.issues[0]?.type || 'General Analysis';
    const topic = primaryIssue;
    const issue = analysisResult.issues.map(i => i.type).join(', ') || 'Crop health check';
    
    const recommendationSummary = analysisResult.recommendations.slice(0, 2).join('. ') || 
                                 analysisResult.generalHealth;
    
    const fullRecommendation = [
      `General Health: ${analysisResult.generalHealth}`,
      '',
      'Issues Found:',
      ...analysisResult.issues.map((issue, idx) => 
        `${idx + 1}. ${issue.type} (${issue.severity} severity)\n   ${issue.description}\n   Solution: ${issue.solution}`
      ),
      '',
      'Recommendations:',
      ...analysisResult.recommendations.map((rec, idx) => `${idx + 1}. ${rec}`)
    ].join('\n');

    const session: AdviceSession = {
      id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
      cropType: cropType.charAt(0).toUpperCase() + cropType.slice(1),
      issue,
      topic,
      recommendationSummary,
      fullRecommendation,
      imageUrl: analysisResult.imageUrl,
      farmerFeedback: {
        rating: 0,
        notes: '',
        stepsTaken: '',
        actualOutcome: '',
        outcomeStatus: 'pending',
        dateAdded: new Date().toISOString(),
      },
    };

    saveAdviceSession(session);
  };

  if (isAnalyzing || isTranslating) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="text-lg font-semibold">
              {isAnalyzing 
                ? t({ en: 'Analysing image', hi: 'छवि का विश्लेषण कर रहे हैं' })
                : t({ en: 'Translating to Hindi...', hi: 'हिंदी में अनुवाद कर रहे हैं...' })
              }
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
