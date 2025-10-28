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
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  TrendingUp,
  TrendingDown,
  Edit,
  Save
} from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { updateAdviceSession } from '@/utils/adviceSessionStorage';
import type { AdviceSession, OutcomeStatus } from '@/types/adviceSession';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface SessionDetailModalProps {
  session: AdviceSession | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export default function SessionDetailModal({
  session,
  isOpen,
  onClose,
  onUpdate,
}: SessionDetailModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(session?.farmerFeedback?.rating || 0);
  const [notes, setNotes] = useState(session?.farmerFeedback?.notes || '');
  const [stepsTaken, setStepsTaken] = useState(session?.farmerFeedback?.stepsTaken || '');
  const [actualOutcome, setActualOutcome] = useState(session?.farmerFeedback?.actualOutcome || '');
  const [outcomeStatus, setOutcomeStatus] = useState<OutcomeStatus>(
    session?.farmerFeedback?.outcomeStatus || 'pending'
  );
  const [yieldImpact, setYieldImpact] = useState(
    session?.farmerFeedback?.yieldImpact?.toString() || ''
  );
  const [cropSaved, setCropSaved] = useState(
    session?.farmerFeedback?.cropSavedPercentage?.toString() || ''
  );

  if (!session) return null;

  const handleSave = () => {
    const yieldImpactNum = yieldImpact ? parseFloat(yieldImpact) : undefined;
    const cropSavedNum = cropSaved ? parseFloat(cropSaved) : undefined;

    updateAdviceSession(session.id, {
      farmerFeedback: {
        rating,
        notes,
        stepsTaken,
        actualOutcome,
        outcomeStatus,
        yieldImpact: yieldImpactNum,
        cropSavedPercentage: cropSavedNum,
        dateAdded: session.farmerFeedback?.dateAdded || new Date().toISOString(),
      },
    });

    toast({
      title: t({ en: 'Feedback Saved', hi: 'प्रतिक्रिया सहेजी गई' }),
      description: t({
        en: 'Your feedback has been recorded successfully.',
        hi: 'आपकी प्रतिक्रिया सफलतापूर्वक रिकॉर्ड की गई है।',
      }),
    });

    setIsEditing(false);
    onUpdate();
  };

  const getOutcomeIcon = () => {
    switch (outcomeStatus) {
      case 'positive':
        return <CheckCircle2 className="h-6 w-6 text-green-600" />;
      case 'needs_followup':
        return <AlertCircle className="h-6 w-6 text-orange-500" />;
      default:
        return <Clock className="h-6 w-6 text-muted-foreground" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="modal-session-detail">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-xl mb-2">{session.topic}</DialogTitle>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(session.date), 'MMMM dd, yyyy')}
                </div>
                <Badge variant="secondary">{session.cropType}</Badge>
                <div className="flex items-center gap-1">
                  {getOutcomeIcon()}
                </div>
              </div>
            </div>
            {!isEditing && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(true)}
                data-testid="button-edit-feedback"
              >
                <Edit className="h-4 w-4 mr-2" />
                {t({ en: 'Edit', hi: 'संपादित करें' })}
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <h4 className="font-semibold mb-2">
              {t({ en: 'Issue Identified', hi: 'पहचानी गई समस्या' })}
            </h4>
            <p className="text-sm text-muted-foreground">{session.issue}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">
              {t({ en: 'AI Recommendation', hi: 'AI सिफारिश' })}
            </h4>
            <p className="text-sm whitespace-pre-wrap">{session.fullRecommendation}</p>
          </div>

          {session.imageUrl && (
            <div>
              <h4 className="font-semibold mb-2">
                {t({ en: 'Analyzed Image', hi: 'विश्लेषित छवि' })}
              </h4>
              <img
                src={session.imageUrl}
                alt="Crop analysis"
                className="rounded-lg max-h-64 object-contain"
              />
            </div>
          )}

          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              {t({ en: 'Farmer Feedback & Outcome', hi: 'किसान की प्रतिक्रिया और परिणाम' })}
            </h4>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label>
                    {t({ en: 'Rating (1-5 stars)', hi: 'रेटिंग (1-5 सितारे)' })}
                  </Label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="text-3xl focus:outline-none"
                        data-testid={`button-rating-${star}`}
                      >
                        <span className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="outcome-status">
                    {t({ en: 'Outcome Status', hi: 'परिणाम स्थिति' })}
                  </Label>
                  <Select value={outcomeStatus} onValueChange={(v) => setOutcomeStatus(v as OutcomeStatus)}>
                    <SelectTrigger id="outcome-status" data-testid="select-outcome-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="positive">
                        {t({ en: 'Positive', hi: 'सकारात्मक' })}
                      </SelectItem>
                      <SelectItem value="neutral">
                        {t({ en: 'Neutral', hi: 'तटस्थ' })}
                      </SelectItem>
                      <SelectItem value="needs_followup">
                        {t({ en: 'Needs Follow-up', hi: 'अनुवर्ती कार्रवाई आवश्यक' })}
                      </SelectItem>
                      <SelectItem value="pending">
                        {t({ en: 'Pending', hi: 'लंबित' })}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="yield-impact">
                      {t({ en: 'Yield Impact (%)', hi: 'उपज प्रभाव (%)' })}
                    </Label>
                    <Input
                      id="yield-impact"
                      type="number"
                      placeholder="+15 or -10"
                      value={yieldImpact}
                      onChange={(e) => setYieldImpact(e.target.value)}
                      data-testid="input-yield-impact"
                    />
                  </div>
                  <div>
                    <Label htmlFor="crop-saved">
                      {t({ en: 'Crop Saved (%)', hi: 'फसल बचाई (%)' })}
                    </Label>
                    <Input
                      id="crop-saved"
                      type="number"
                      placeholder="80"
                      value={cropSaved}
                      onChange={(e) => setCropSaved(e.target.value)}
                      data-testid="input-crop-saved"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="steps-taken">
                    {t({ en: 'Steps You Took', hi: 'आपने जो कदम उठाए' })}
                  </Label>
                  <Textarea
                    id="steps-taken"
                    placeholder={t({
                      en: 'Describe the actions you took based on the recommendation...',
                      hi: 'सिफारिश के आधार पर आपने जो कार्रवाई की उसका वर्णन करें...',
                    })}
                    value={stepsTaken}
                    onChange={(e) => setStepsTaken(e.target.value)}
                    className="min-h-[80px]"
                    data-testid="input-steps-taken"
                  />
                </div>

                <div>
                  <Label htmlFor="actual-outcome">
                    {t({ en: 'Actual Outcome', hi: 'वास्तविक परिणाम' })}
                  </Label>
                  <Textarea
                    id="actual-outcome"
                    placeholder={t({
                      en: 'Describe the results you achieved...',
                      hi: 'आपको जो परिणाम मिले उनका वर्णन करें...',
                    })}
                    value={actualOutcome}
                    onChange={(e) => setActualOutcome(e.target.value)}
                    className="min-h-[80px]"
                    data-testid="input-actual-outcome"
                  />
                </div>

                <div>
                  <Label htmlFor="notes">
                    {t({ en: 'Additional Notes', hi: 'अतिरिक्त टिप्पणियाँ' })}
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder={t({
                      en: 'Any other feedback or observations...',
                      hi: 'कोई अन्य प्रतिक्रिया या अवलोकन...',
                    })}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[80px]"
                    data-testid="input-notes"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {session.farmerFeedback ? (
                  <>
                    {session.farmerFeedback.rating > 0 && (
                      <div>
                        <Label className="text-muted-foreground">
                          {t({ en: 'Rating', hi: 'रेटिंग' })}
                        </Label>
                        <div className="flex items-center gap-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`text-2xl ${
                                star <= session.farmerFeedback!.rating
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {(session.farmerFeedback.yieldImpact !== undefined ||
                      session.farmerFeedback.cropSavedPercentage !== undefined) && (
                      <div className="flex gap-4 flex-wrap">
                        {session.farmerFeedback.yieldImpact !== undefined && (
                          <div
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                              session.farmerFeedback.yieldImpact > 0
                                ? 'bg-green-50 text-green-700'
                                : 'bg-red-50 text-red-700'
                            }`}
                          >
                            {session.farmerFeedback.yieldImpact > 0 ? (
                              <TrendingUp className="h-5 w-5" />
                            ) : (
                              <TrendingDown className="h-5 w-5" />
                            )}
                            <span className="font-semibold">
                              {session.farmerFeedback.yieldImpact > 0 ? '+' : ''}
                              {session.farmerFeedback.yieldImpact}% {t({ en: 'Yield', hi: 'उपज' })}
                            </span>
                          </div>
                        )}
                        {session.farmerFeedback.cropSavedPercentage !== undefined && (
                          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 text-green-700">
                            <CheckCircle2 className="h-5 w-5" />
                            <span className="font-semibold">
                              {session.farmerFeedback.cropSavedPercentage}%{' '}
                              {t({ en: 'Crop Saved', hi: 'फसल बचाई' })}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {session.farmerFeedback.stepsTaken && (
                      <div>
                        <Label className="text-muted-foreground">
                          {t({ en: 'Steps Taken', hi: 'कदम उठाए गए' })}
                        </Label>
                        <p className="text-sm mt-1 whitespace-pre-wrap">
                          {session.farmerFeedback.stepsTaken}
                        </p>
                      </div>
                    )}

                    {session.farmerFeedback.actualOutcome && (
                      <div>
                        <Label className="text-muted-foreground">
                          {t({ en: 'Actual Outcome', hi: 'वास्तविक परिणाम' })}
                        </Label>
                        <p className="text-sm mt-1 whitespace-pre-wrap">
                          {session.farmerFeedback.actualOutcome}
                        </p>
                      </div>
                    )}

                    {session.farmerFeedback.notes && (
                      <div>
                        <Label className="text-muted-foreground">
                          {t({ en: 'Notes', hi: 'टिप्पणियाँ' })}
                        </Label>
                        <p className="text-sm mt-1 whitespace-pre-wrap">
                          {session.farmerFeedback.notes}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {t({
                        en: 'No feedback added yet. Click Edit to add your experience.',
                        hi: 'अभी तक कोई प्रतिक्रिया नहीं जोड़ी गई। अपना अनुभव जोड़ने के लिए संपादित करें पर क्लिक करें।',
                      })}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                data-testid="button-cancel-edit"
              >
                {t({ en: 'Cancel', hi: 'रद्द करें' })}
              </Button>
              <Button onClick={handleSave} data-testid="button-save-feedback">
                <Save className="h-4 w-4 mr-2" />
                {t({ en: 'Save Feedback', hi: 'प्रतिक्रिया सहेजें' })}
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={onClose} data-testid="button-close-detail">
              {t({ en: 'Close', hi: 'बंद करें' })}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
