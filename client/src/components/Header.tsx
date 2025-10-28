import { useLocation } from 'wouter';
import LanguageToggle from './LanguageToggle';

export default function Header() {
  const [location, setLocation] = useLocation();
  
  const handleLogoClick = () => {
    if (location !== '/home') {
      setLocation('/home');
    }
  };

  const isHomePage = location === '/home';

  return (
    <header 
      className="w-full bg-background border-b border-border sticky top-0 z-50"
      style={{ 
        paddingTop: '12px', 
        paddingBottom: '16px'
      }}
    >
      <div className="max-w-md mx-auto px-4 flex items-center justify-between">
        <div className="flex-1" />
        
        <div className="flex-1 flex justify-center">
          <img
            src="/assets/logo.jpg"
            alt="Mittimitra Logo"
            className={`h-[70px] w-auto object-contain ${!isHomePage ? 'cursor-pointer hover-elevate active-elevate-2 rounded-lg transition-all' : ''}`}
            onClick={isHomePage ? undefined : handleLogoClick}
            data-testid="header-logo"
            style={{ margin: '0 auto' }}
          />
        </div>

        <div className="flex-1 flex justify-end">
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
