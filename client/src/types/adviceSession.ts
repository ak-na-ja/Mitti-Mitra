export type OutcomeStatus = 'positive' | 'neutral' | 'needs_followup' | 'pending';

export interface AdviceSession {
  id: string;
  date: string; // ISO string
  cropType: string;
  issue: string;
  topic: string;
  recommendationSummary: string;
  fullRecommendation: string;
  imageUrl?: string;
  farmerFeedback?: {
    rating: number; // 1-5
    notes: string;
    stepsTaken: string;
    actualOutcome: string;
    outcomeStatus: OutcomeStatus;
    yieldImpact?: number; // percentage (positive or negative)
    cropSavedPercentage?: number;
    dateAdded: string;
  };
}

export interface SessionFilters {
  cropType?: string;
  dateFrom?: string;
  dateTo?: string;
  searchQuery?: string;
}

export interface SessionStats {
  totalSessions: number;
  averageRating: number;
  positiveOutcomes: number;
  mostConsultedTopics: { topic: string; count: number }[];
}
