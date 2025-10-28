import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  History, 
  Search, 
  TrendingUp, 
  Star, 
  CheckCircle2,
  BarChart3,
  Filter
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SessionCard from '@/components/SessionCard';
import SessionDetailModal from '@/components/SessionDetailModal';
import {
  filterSessions,
  getSessionStats,
} from '@/utils/adviceSessionStorage';
import type { AdviceSession, SessionFilters } from '@/types/adviceSession';

export default function HistoryFeedback() {
  const { t } = useLanguage();
  const [sessions, setSessions] = useState<AdviceSession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<AdviceSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<AdviceSession | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [stats, setStats] = useState(getSessionStats());
  
  const [filters, setFilters] = useState<SessionFilters>({
    cropType: '',
    searchQuery: '',
  });

  const loadSessions = () => {
    const allSessions = filterSessions(filters);
    setSessions(allSessions);
    setFilteredSessions(allSessions);
    setStats(getSessionStats());
  };

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    const filtered = filterSessions(filters);
    setFilteredSessions(filtered);
  }, [filters]);

  const handleSessionClick = (session: AdviceSession) => {
    setSelectedSession(session);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedSession(null);
  };

  const handleUpdate = () => {
    loadSessions();
    if (selectedSession) {
      const updated = filterSessions({}).find(s => s.id === selectedSession.id);
      setSelectedSession(updated || null);
    }
  };

  const clearFilters = () => {
    setFilters({
      cropType: '',
      searchQuery: '',
    });
  };

  const cropTypes = ['Rice', 'Wheat', 'Cotton', 'Maize', 'Vegetables', 'Pulses'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <History className="h-6 w-6 text-primary" />
          {t({ en: 'History & Feedback', hi: 'इतिहास और प्रतिक्रिया' })}
        </h2>
      </div>

      {sessions.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalSessions}</p>
                  <p className="text-xs text-muted-foreground">
                    {t({ en: 'Total Sessions', hi: 'कुल सत्र' })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.positiveOutcomes}</p>
                  <p className="text-xs text-muted-foreground">
                    {t({ en: 'Positive Outcomes', hi: 'सकारात्मक परिणाम' })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {stats.averageRating > 0 ? stats.averageRating.toFixed(1) : '-'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t({ en: 'Avg Rating', hi: 'औसत रेटिंग' })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {stats.mostConsultedTopics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {t({ en: 'Most Consulted Topics', hi: 'सबसे अधिक परामर्श लिए गए विषय' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {stats.mostConsultedTopics.map((topic, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {topic.topic} ({topic.count})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {t({ en: 'Search & Filter', hi: 'खोजें और फ़िल्टर करें' })}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t({
                en: 'Search by topic, issue, or recommendation...',
                hi: 'विषय, समस्या या सिफारिश से खोजें...',
              })}
              value={filters.searchQuery || ''}
              onChange={(e) =>
                setFilters({ ...filters, searchQuery: e.target.value })
              }
              className="pl-10"
              data-testid="input-search-sessions"
            />
          </div>

          <div className="flex gap-2 items-center">
            <Select
              value={filters.cropType || 'all'}
              onValueChange={(value) =>
                setFilters({ ...filters, cropType: value === 'all' ? '' : value })
              }
            >
              <SelectTrigger data-testid="select-crop-filter">
                <SelectValue placeholder={t({ en: 'All Crops', hi: 'सभी फसलें' })} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t({ en: 'All Crops', hi: 'सभी फसलें' })}
                </SelectItem>
                {cropTypes.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(filters.cropType || filters.searchQuery) && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                data-testid="button-clear-filters"
              >
                {t({ en: 'Clear', hi: 'साफ करें' })}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-semibold text-base">
          {t({ en: 'Past Advice Sessions', hi: 'पिछले सलाह सत्र' })}
        </h3>

        {filteredSessions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <History className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold text-lg mb-2">
                {t({
                  en: 'No past sessions yet',
                  hi: 'अभी तक कोई पिछला सत्र नहीं',
                })}
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                {t({
                  en: 'Get advice to start building your history. Use the crop analyzer above to get AI-powered recommendations.',
                  hi: 'अपना इतिहास बनाना शुरू करने के लिए सलाह लें। AI-संचालित सिफारिशें प्राप्त करने के लिए ऊपर फसल विश्लेषक का उपयोग करें।',
                })}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onClick={() => handleSessionClick(session)}
              />
            ))}
          </div>
        )}
      </div>

      <SessionDetailModal
        session={selectedSession}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
