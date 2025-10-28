import { useState, useEffect } from 'react';
import { QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Onboarding from "@/pages/Onboarding";
import Home from "@/pages/Home";
import Login from "@/pages/Login";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'mock-client-id-for-testing';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem('farmer-app-onboarding') === 'completed';
  });

  const handleOnboardingComplete = (data: any) => {
    console.log('Onboarding data:', data);
    localStorage.setItem('farmer-app-onboarding', 'completed');
    localStorage.setItem('farmer-app-data', JSON.stringify(data));
    setHasCompletedOnboarding(true);
  };

  const handleLoginSuccess = () => {
    const onboardingComplete = localStorage.getItem('farmer-app-onboarding') === 'completed';
    setHasCompletedOnboarding(onboardingComplete);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  if (!hasCompletedOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return <Home />;
}

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <LanguageProvider>
              <AppContent />
              <Toaster />
            </LanguageProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
