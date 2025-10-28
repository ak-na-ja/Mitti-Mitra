import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import WeeklyChecklist from '@/components/WeeklyChecklist';
import SmartTipCard from '@/components/SmartTipCard';
import WeatherAlertCard from '@/components/WeatherAlertCard';
import WeatherForecastCard from '@/components/WeatherForecastCard';
import BottomNav from '@/components/BottomNav';
import LanguageToggle from '@/components/LanguageToggle';
import PestHelp from '@/components/PestHelp';
import Profile from '@/pages/Profile';
import { Droplets, Bug, Sprout, Leaf, Mountain, Calendar, CloudRain, ThermometerSun, Layers, Beaker, Flower, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  getSmartTips, 
  getMockWeather, 
  getWeatherForecast,
  cacheDataToLocalStorage,
  getCachedData,
  type UserProfile,
  type WeatherConditions,
  type FilteredTips
} from '@/utils/tipFiltering';
import type { CropType, StateType, SoilType, GrowthStage } from '@/data/farmingTips';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'home' | 'tips' | 'pest' | 'profile'>('home');
  const { t } = useLanguage();
  const [userData, setUserData] = useState<any>(null);
  const [filteredTips, setFilteredTips] = useState<FilteredTips | null>(null);
  const [currentWeather, setCurrentWeather] = useState<WeatherConditions | null>(null);
  const [weatherForecast, setWeatherForecast] = useState<any[]>([]);

  const normalizeCrop = (crop: string): CropType => {
    const mapping: Record<string, CropType> = {
      'rice': 'Rice',
      'wheat': 'Wheat',
      'cotton': 'Cotton',
      'maize': 'Maize',
      'vegetables': 'Vegetables',
    };
    return mapping[crop.toLowerCase()] || crop as CropType;
  };

  const normalizeState = (state: string): StateType => {
    const mapping: Record<string, StateType> = {
      'punjab': 'Punjab',
      'haryana': 'Haryana',
      'uttar pradesh': 'Uttar Pradesh',
      'maharashtra': 'Maharashtra',
      'gujarat': 'Gujarat',
      'madhya pradesh': 'Madhya Pradesh',
      'karnataka': 'Karnataka',
      'andhra pradesh': 'Andhra Pradesh',
      'tamil nadu': 'Tamil Nadu',
      'bihar': 'Bihar',
    };
    return mapping[state.toLowerCase()] || state as StateType;
  };

  const normalizeSoil = (soil: string): SoilType => {
    const mapping: Record<string, SoilType> = {
      'alluvial': 'Alluvial',
      'black': 'Black',
      'red': 'Red',
      'laterite': 'Laterite',
      'desert': 'Desert',
      'mountain': 'Mountain',
    };
    return mapping[soil.toLowerCase()] || soil as SoilType;
  };

  const loadUserDataAndTips = () => {
    const savedData = localStorage.getItem('farmer-app-data');
    if (savedData) {
      const data = JSON.parse(savedData);
      setUserData(data);
      
      const cachedWeather = getCachedData<WeatherConditions>('current-weather');
      const weather = cachedWeather || getMockWeather();
      setCurrentWeather(weather);
      cacheDataToLocalStorage('current-weather', weather);
      
      const forecast = getWeatherForecast(7);
      setWeatherForecast(forecast);
      cacheDataToLocalStorage('weather-forecast', forecast);
      
      const userProfile: UserProfile = {
        crop: normalizeCrop(data.crop),
        state: normalizeState(data.location),
        soil: normalizeSoil(data.soil),
        growthStage: data.growthStage as GrowthStage | undefined,
      };
      
      console.log('User profile for filtering:', userProfile);
      
      const tips = getSmartTips(userProfile, weather, 5);
      console.log('Filtered tips result:', tips);
      setFilteredTips(tips);
      cacheDataToLocalStorage('filtered-tips', tips);
    }
  };

  useEffect(() => {
    loadUserDataAndTips();

    const handleProfileUpdate = () => {
      loadUserDataAndTips();
    };

    window.addEventListener('profile-updated', handleProfileUpdate);

    return () => {
      window.removeEventListener('profile-updated', handleProfileUpdate);
    };
  }, []);

  const weeklyTasks = [
    { id: '1', label: { en: 'Water crops in early morning', hi: 'सुबह जल्दी फसलों को पानी दें' }, icon: 'water' as const },
    { id: '2', label: { en: 'Check for pest infestation', hi: 'कीट संक्रमण की जांच करें' }, icon: 'pest' as const },
    { id: '3', label: { en: 'Apply organic fertilizer', hi: 'जैविक उर्वरक डालें' }, icon: 'plant' as const },
  ];

  const getIconComponent = (iconName: string) => {
    const icons: any = {
      droplets: Droplets,
      sprout: Sprout,
      bug: Bug,
      plant: Leaf,
      leaf: Leaf,
      mountain: Mountain,
      calendar: Calendar,
      'spray-can': Bug,
      'cloud-rain': CloudRain,
      'thermometer-sun': ThermometerSun,
      layers: Layers,
      flask: Beaker,
      flower: Flower,
      harvest: Calendar,
      'alert-triangle': HelpCircle,
    };
    return icons[iconName] || Sprout;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center justify-end p-4">
          <LanguageToggle />
        </div>
      </div>

      {activeTab === 'home' && (
        <div className="px-4 py-6 space-y-6">
          <HeroSection farmerName={userData?.name} />
          <WeeklyChecklist items={weeklyTasks} />
        </div>
      )}

      {activeTab === 'tips' && (
        <div className="px-4 py-6 space-y-6">
          {!userData ? (
            <div className="text-center py-12 space-y-4">
              <Sprout className="h-16 w-16 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">
                {t({ en: 'Complete onboarding to see personalized tips', hi: 'वैयक्तिकृत सुझाव देखने के लिए ऑनबोर्डिंग पूरी करें' })}
              </p>
            </div>
          ) : (
            <>
              {/* User Profile Summary */}
              <div className="bg-primary/10 p-4 rounded-2xl border border-primary/20" data-testid="card-profile-summary">
                <h3 className="font-semibold text-lg mb-2">
                  {t({ en: 'Smart Tips for You', hi: 'आपके लिए स्मार्ट सुझाव' })}
                </h3>
                <p className="text-sm text-muted-foreground" data-testid="text-profile-info">
                  {t({ 
                    en: `${userData.crop} • ${userData.location} • ${userData.soil} Soil`, 
                    hi: `${userData.crop} • ${userData.location} • ${userData.soil} मिट्टी` 
                  })}
                </p>
                {currentWeather && (
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1" data-testid="text-current-temp">
                      <ThermometerSun className="h-3.5 w-3.5" />
                      {Math.round(currentWeather.temperature)}°C
                    </span>
                    <span className="flex items-center gap-1" data-testid="text-current-rain">
                      <CloudRain className="h-3.5 w-3.5" />
                      {Math.round(currentWeather.rainfall)}mm
                    </span>
                    <span className="flex items-center gap-1" data-testid="text-current-humidity">
                      <Droplets className="h-3.5 w-3.5" />
                      {Math.round(currentWeather.humidity)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Weather Alerts */}
              {filteredTips && filteredTips.alerts.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-base flex items-center gap-2">
                    <CloudRain className="h-5 w-5 text-destructive" />
                    {t({ en: 'Weather Alerts', hi: 'मौसम चेतावनी' })}
                  </h3>
                  {filteredTips.alerts.map((alert) => (
                    <WeatherAlertCard key={alert.id} alert={alert} />
                  ))}
                </div>
              )}

              {/* Weekly Tasks */}
              {filteredTips && filteredTips.weeklyTasks.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-base flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {t({ en: 'This Week\'s Tasks', hi: 'इस सप्ताह के कार्य' })}
                  </h3>
                  <WeeklyChecklist items={filteredTips.weeklyTasks.map(task => ({
                    id: task.id,
                    label: task.title,
                    icon: 'plant' as const,
                  }))} />
                </div>
              )}

              {/* Smart Tips */}
              {filteredTips && filteredTips.tips.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-base flex items-center gap-2">
                    <Sprout className="h-5 w-5" />
                    {t({ en: 'Recommended Actions', hi: 'अनुशंसित कार्य' })}
                  </h3>
                  <div className="space-y-4">
                    {filteredTips.tips.map((tip) => (
                      <SmartTipCard
                        key={tip.id}
                        tip={tip}
                        icon={getIconComponent(tip.icon)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Weather Forecast */}
              {weatherForecast.length > 0 && (
                <div className="space-y-3">
                  <WeatherForecastCard forecast={weatherForecast} />
                </div>
              )}
            </>
          )}
        </div>
      )}

      {activeTab === 'pest' && (
        <div className="px-4 py-6">
          <PestHelp />
        </div>
      )}

      {activeTab === 'profile' && <Profile />}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
