import { useState } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sprout } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const { login } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error('No credential received');
      }

      const token = credentialResponse.credential;
      const payload = JSON.parse(atob(token.split('.')[1]));

      const userData = {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        token: token,
      };

      login(userData);
      
      toast({
        title: t({ en: 'Login Successful', hi: 'लॉगिन सफल' }),
        description: t({ 
          en: `Welcome, ${userData.name}!`, 
          hi: `स्वागत है, ${userData.name}!` 
        }),
      });

      onLoginSuccess();
    } catch (error) {
      console.error('Google login error:', error);
      toast({
        title: t({ en: 'Login Failed', hi: 'लॉगिन विफल' }),
        description: t({ 
          en: 'Failed to sign in with Google. Please try again.', 
          hi: 'Google से साइन इन करने में विफल। कृपया पुनः प्रयास करें।' 
        }),
        variant: 'destructive',
      });
    }
  };

  const handleGoogleError = () => {
    toast({
      title: t({ en: 'Login Failed', hi: 'लॉगिन विफल' }),
      description: t({ 
        en: 'Failed to sign in with Google. Please try again.', 
        hi: 'Google से साइन इन करने में विफल। कृपया पुनः प्रयास करें।' 
      }),
      variant: 'destructive',
    });
  };

  const handleMockLogin = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const mockUserData = {
        email: 'farmer.test@example.com',
        name: 'Test Farmer',
        picture: 'https://via.placeholder.com/96',
        token: 'mock-token-' + Date.now(),
      };

      login(mockUserData);
      
      toast({
        title: t({ en: 'Mock Login Successful', hi: 'मॉक लॉगिन सफल' }),
        description: t({ 
          en: `Welcome, ${mockUserData.name}!`, 
          hi: `स्वागत है, ${mockUserData.name}!` 
        }),
      });

      setIsLoading(false);
      onLoginSuccess();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <div className="flex items-center justify-center p-4 pt-8">
        <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full">
              <Sprout className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">
              {t({ en: 'Farmer Advisory App', hi: 'किसान सलाहकार ऐप' })}
            </CardTitle>
            <CardDescription className="text-base mt-2">
              {t({ 
                en: 'Get personalized farming tips and advice', 
                hi: 'व्यक्तिगत खेती सुझाव और सलाह प्राप्त करें' 
              })}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              {t({ en: 'Sign in to continue', hi: 'जारी रखने के लिए साइन इन करें' })}
            </div>
            
            <div className="flex justify-center">
              <div data-testid="google-login-button">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                  size="large"
                  theme="outline"
                  text="signin_with"
                  shape="rectangular"
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t({ en: 'OR', hi: 'या' })}
                </span>
              </div>
            </div>

            <Button
              onClick={handleMockLogin}
              disabled={isLoading}
              className="w-full min-h-[44px]"
              variant="outline"
              data-testid="button-mock-login"
            >
              {isLoading 
                ? t({ en: 'Signing in...', hi: 'साइन इन हो रहा है...' })
                : t({ en: 'Mock Sign In (Testing)', hi: 'मॉक साइन इन (परीक्षण)' })
              }
            </Button>
          </div>

          <div className="text-xs text-center text-muted-foreground">
            {t({ 
              en: 'By signing in, you agree to our Terms of Service and Privacy Policy', 
              hi: 'साइन इन करके, आप हमारी सेवा की शर्तों और गोपनीयता नीति से सहमत हैं' 
            })}
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
