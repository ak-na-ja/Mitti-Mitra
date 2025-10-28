import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, MapPin, Sprout, Mountain, ThermometerSun, CloudRain, Droplets, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { stateDistricts, crops, soilTypes, type StateType } from '@/data/districts';

interface ProfileData {
  name?: string;
  crop: string;
  location: string;
  district?: string;
  soil: string;
  temperature?: number;
  rainfall?: number;
  humidity?: number;
}

export default function Profile() {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [editedData, setEditedData] = useState<ProfileData>({
    name: '',
    crop: '',
    location: '',
    district: '',
    soil: '',
    temperature: 25,
    rainfall: 10,
    humidity: 60,
  });
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem('farmer-app-data');
    const savedWeather = localStorage.getItem('current-weather');
    
    if (savedData) {
      const data = JSON.parse(savedData);
      const weatherData = savedWeather ? JSON.parse(savedWeather) : {};
      
      const profile: ProfileData = {
        name: data.name || '',
        crop: data.crop || '',
        location: data.location || '',
        district: data.district || '',
        soil: data.soil || '',
        temperature: weatherData.temperature || 25,
        rainfall: weatherData.rainfall || 10,
        humidity: weatherData.humidity || 60,
      };
      
      setProfileData(profile);
      setEditedData(profile);
      
      if (profile.location) {
        const normalizedState = normalizeState(profile.location);
        setAvailableDistricts(stateDistricts[normalizedState] || []);
      }
    }
  }, []);

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

  const handleStateChange = (newState: string) => {
    setEditedData({
      ...editedData,
      location: newState.toLowerCase(),
      district: '',
    });
    setAvailableDistricts(stateDistricts[newState as StateType] || []);
  };

  const handleSaveChanges = () => {
    const updatedData = {
      crop: editedData.crop,
      location: editedData.location,
      district: editedData.district,
      soil: editedData.soil,
    };
    
    const updatedWeather = {
      temperature: editedData.temperature || 25,
      rainfall: editedData.rainfall || 10,
      humidity: editedData.humidity || 60,
    };

    localStorage.setItem('farmer-app-data', JSON.stringify(updatedData));
    localStorage.setItem('current-weather', JSON.stringify(updatedWeather));
    
    localStorage.removeItem('filtered-tips');
    
    setProfileData({ ...editedData });
    
    toast({
      title: t({ en: 'Profile Updated', hi: 'प्रोफ़ाइल अपडेट हो गई' }),
      description: t({ 
        en: 'Your farming preferences have been saved successfully.', 
        hi: 'आपकी खेती की प्राथमिकताएं सफलतापूर्वक सहेजी गई हैं।' 
      }),
    });

    window.dispatchEvent(new Event('profile-updated'));
  };

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">
          {t({ en: 'Loading profile...', hi: 'प्रोफ़ाइल लोड हो रही है...' })}
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6 pb-24">
      <div className="flex flex-col items-center gap-2">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold" data-testid="heading-profile">
          {profileData?.name || t({ en: 'Farmer', hi: 'किसान' })}
        </h1>
      </div>

      <Card className="bg-primary/10 border-primary/20" data-testid="card-profile-summary">
        <CardHeader>
          <CardTitle className="text-lg">
            {t({ en: 'Current Profile', hi: 'वर्तमान प्रोफ़ाइल' })}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 text-base" data-testid="text-profile-summary">
            <Sprout className="h-5 w-5 text-primary" />
            <span className="font-medium">{capitalizeFirst(profileData.crop)}</span>
            <span className="text-muted-foreground">•</span>
            <MapPin className="h-5 w-5 text-primary" />
            <span className="font-medium">{capitalizeFirst(profileData.location)}</span>
            {profileData.district && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="font-medium">{profileData.district}</span>
              </>
            )}
            <span className="text-muted-foreground">•</span>
            <Mountain className="h-5 w-5 text-primary" />
            <span className="font-medium">
              {capitalizeFirst(profileData.soil)} {t({ en: 'Soil', hi: 'मिट्टी' })}
            </span>
          </div>
          
          <div className="flex items-center gap-6 text-sm pt-2" data-testid="text-weather-summary">
            <div className="flex items-center gap-2">
              <ThermometerSun className="h-4 w-4 text-orange-500" />
              <span className="font-medium">{Math.round(profileData.temperature || 25)}°C</span>
            </div>
            <div className="flex items-center gap-2">
              <CloudRain className="h-4 w-4 text-blue-500" />
              <span className="font-medium">{Math.round(profileData.rainfall || 10)}mm</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-cyan-500" />
              <span className="font-medium">{Math.round(profileData.humidity || 60)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card data-testid="card-edit-profile">
        <CardHeader>
          <CardTitle className="text-lg">
            {t({ en: 'Farm Profile', hi: 'खेत प्रोफ़ाइल' })}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="crop" className="text-base font-medium">
              {t({ en: 'Crop Type', hi: 'फसल का प्रकार' })}
            </Label>
            <Select 
              value={editedData.crop} 
              onValueChange={(value) => setEditedData({ ...editedData, crop: value })}
            >
              <SelectTrigger id="crop" className="h-12 text-base" data-testid="select-crop">
                <SelectValue placeholder={t({ en: 'Select crop', hi: 'फसल चुनें' })} />
              </SelectTrigger>
              <SelectContent>
                {crops.map((crop) => (
                  <SelectItem key={crop} value={crop.toLowerCase()} data-testid={`option-crop-${crop.toLowerCase()}`}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="state" className="text-base font-medium">
              {t({ en: 'State', hi: 'राज्य' })}
            </Label>
            <Select 
              value={editedData.location ? capitalizeFirst(editedData.location) : ''} 
              onValueChange={handleStateChange}
            >
              <SelectTrigger id="state" className="h-12 text-base" data-testid="select-state">
                <SelectValue placeholder={t({ en: 'Select state', hi: 'राज्य चुनें' })} />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(stateDistricts).map((state) => (
                  <SelectItem key={state} value={state} data-testid={`option-state-${state.toLowerCase().replace(/ /g, '-')}`}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="district" className="text-base font-medium">
              {t({ en: 'District', hi: 'जिला' })}
            </Label>
            <Select 
              value={editedData.district} 
              onValueChange={(value) => setEditedData({ ...editedData, district: value })}
              disabled={!availableDistricts.length}
            >
              <SelectTrigger id="district" className="h-12 text-base" data-testid="select-district">
                <SelectValue placeholder={t({ en: 'Select district', hi: 'जिला चुनें' })} />
              </SelectTrigger>
              <SelectContent>
                {availableDistricts.map((district) => (
                  <SelectItem key={district} value={district} data-testid={`option-district-${district.toLowerCase().replace(/ /g, '-')}`}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="soil" className="text-base font-medium">
              {t({ en: 'Soil Type', hi: 'मिट्टी का प्रकार' })}
            </Label>
            <Select 
              value={editedData.soil} 
              onValueChange={(value) => setEditedData({ ...editedData, soil: value })}
            >
              <SelectTrigger id="soil" className="h-12 text-base" data-testid="select-soil">
                <SelectValue placeholder={t({ en: 'Select soil type', hi: 'मिट्टी का प्रकार चुनें' })} />
              </SelectTrigger>
              <SelectContent>
                {soilTypes.map((soil) => (
                  <SelectItem key={soil} value={soil.toLowerCase()} data-testid={`option-soil-${soil.toLowerCase()}`}>
                    {soil}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>


          <Button 
            onClick={handleSaveChanges} 
            className="w-full h-12 text-base"
            data-testid="button-save-profile"
          >
            <Save className="h-5 w-5 mr-2" />
            {t({ en: 'Save Changes', hi: 'परिवर्तन सहेजें' })}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
