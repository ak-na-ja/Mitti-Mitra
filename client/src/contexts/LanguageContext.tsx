import { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface Translation {
  en: string;
  hi: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (translation: Translation) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('farmer-app-language');
    return (saved === 'hi' || saved === 'en') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('farmer-app-language', language);
  }, [language]);

  const t = (translation: Translation) => translation[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
