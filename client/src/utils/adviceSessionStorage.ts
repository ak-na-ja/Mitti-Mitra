import type { AdviceSession, SessionFilters, SessionStats } from '@/types/adviceSession';

const STORAGE_KEY = 'advice-sessions';

export function saveAdviceSession(session: AdviceSession): void {
  const sessions = getAdviceSessions();
  sessions.push(session);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function getAdviceSessions(): AdviceSession[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function updateAdviceSession(id: string, updates: Partial<AdviceSession>): void {
  const sessions = getAdviceSessions();
  const index = sessions.findIndex(s => s.id === id);
  if (index !== -1) {
    sessions[index] = { ...sessions[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }
}

export function deleteAdviceSession(id: string): void {
  const sessions = getAdviceSessions();
  const filtered = sessions.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function filterSessions(filters: SessionFilters): AdviceSession[] {
  let sessions = getAdviceSessions();

  if (filters.cropType) {
    sessions = sessions.filter(s => 
      s.cropType.toLowerCase().includes(filters.cropType!.toLowerCase())
    );
  }

  if (filters.dateFrom) {
    sessions = sessions.filter(s => 
      new Date(s.date) >= new Date(filters.dateFrom!)
    );
  }

  if (filters.dateTo) {
    sessions = sessions.filter(s => 
      new Date(s.date) <= new Date(filters.dateTo!)
    );
  }

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    sessions = sessions.filter(s => 
      s.topic.toLowerCase().includes(query) ||
      s.issue.toLowerCase().includes(query) ||
      s.recommendationSummary.toLowerCase().includes(query)
    );
  }

  return sessions.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getSessionStats(): SessionStats {
  const sessions = getAdviceSessions();
  
  const totalSessions = sessions.length;
  
  const ratedSessions = sessions.filter(s => s.farmerFeedback?.rating);
  const averageRating = ratedSessions.length > 0
    ? ratedSessions.reduce((sum, s) => sum + (s.farmerFeedback?.rating || 0), 0) / ratedSessions.length
    : 0;
  
  const positiveOutcomes = sessions.filter(s => 
    s.farmerFeedback?.outcomeStatus === 'positive'
  ).length;
  
  const topicCounts = sessions.reduce((acc, s) => {
    acc[s.topic] = (acc[s.topic] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const mostConsultedTopics = Object.entries(topicCounts)
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);
  
  return {
    totalSessions,
    averageRating,
    positiveOutcomes,
    mostConsultedTopics,
  };
}
