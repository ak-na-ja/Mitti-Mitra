import { useState, useEffect } from 'react';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Onboarding from "@/pages/Onboarding";
import Home from "@/pages/Home";

function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem('farmer-app-onboarding') === 'completed';
  });

  const handleOnboardingComplete = (data: any) => {
    console.log('Onboarding data:', data);
    localStorage.setItem('farmer-app-onboarding', 'completed');
    localStorage.setItem('farmer-app-data', JSON.stringify(data));
    setHasCompletedOnboarding(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          {hasCompletedOnboarding ? (
            <Home />
          ) : (
            <Onboarding onComplete={handleOnboardingComplete} />
          )}
          <Toaster />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
