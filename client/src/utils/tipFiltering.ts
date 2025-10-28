import {
  FarmingTip,
  WeatherAlert,
  WeeklyTask,
  getCurrentSeason,
  type CropType,
  type StateType,
  type SoilType,
  type Season,
  type GrowthStage,
  type IrrigationType,
  farmingTips,
  weatherAlerts,
} from '@/data/farmingTips';

export interface UserProfile {
  crop: CropType;
  state: StateType;
  soil: SoilType;
  irrigation?: IrrigationType;
  growthStage?: GrowthStage;
}

export interface WeatherConditions {
  temperature: number;
  rainfall: number;
  humidity: number;
}

export interface FilteredTips {
  tips: FarmingTip[];
  alerts: WeatherAlert[];
  weeklyTasks: WeeklyTask[];
}

interface TipScore {
  tip: FarmingTip;
  score: number;
  matchedFactors: string[];
}

export function getCurrentMonth(): number {
  return new Date().getMonth();
}

export function getSmartTips(
  userProfile: UserProfile,
  weather: WeatherConditions,
  maxTips: number = 5
): FilteredTips {
  const currentSeason = getCurrentSeason();
  
  const scoredTips = farmingTips
    .map((tip) => scoreTip(tip, userProfile, weather, currentSeason))
    .filter((scored) => scored.score > 0);
  
  scoredTips.sort((a, b) => b.score - a.score);
  
  const topTips = scoredTips.slice(0, maxTips).map((scored) => ({
    ...scored.tip,
    matchedFactors: scored.matchedFactors,
  }));
  
  const activeAlerts = getWeatherAlerts(weather);
  
  const tasks = generateWeeklyTasks(userProfile, weather, currentSeason);
  
  return {
    tips: topTips as FarmingTip[],
    alerts: activeAlerts,
    weeklyTasks: tasks,
  };
}

function scoreTip(
  tip: FarmingTip,
  userProfile: UserProfile,
  weather: WeatherConditions,
  currentSeason: Season
): TipScore {
  let score = 0;
  const matchedFactors: string[] = [];
  
  const cropMatch = tip.crops.includes(userProfile.crop);
  if (!cropMatch) return { tip, score: 0, matchedFactors: [] };
  score += 100;
  matchedFactors.push(userProfile.crop);
  
  const stateMatch = tip.states.includes(userProfile.state);
  if (!stateMatch) return { tip, score: 0, matchedFactors: [] };
  score += 80;
  matchedFactors.push(userProfile.state);
  
  if (tip.soilTypes.includes(userProfile.soil)) {
    score += 60;
    matchedFactors.push(`${userProfile.soil} Soil`);
  }
  
  if (tip.seasons.includes(currentSeason)) {
    score += 50;
    matchedFactors.push(`${currentSeason} Season`);
  }
  
  if (userProfile.growthStage && tip.growthStages?.includes(userProfile.growthStage)) {
    score += 70;
    matchedFactors.push(`${userProfile.growthStage} Stage`);
  }
  
  if (userProfile.irrigation && tip.irrigationTypes?.includes(userProfile.irrigation)) {
    score += 40;
    matchedFactors.push(`${userProfile.irrigation} Irrigation`);
  }
  
  if (tip.weatherTrigger) {
    const weatherMatch = checkWeatherTrigger(tip.weatherTrigger, weather);
    if (weatherMatch.matches) {
      score += 90;
      matchedFactors.push(...weatherMatch.factors);
    }
  }
  
  if (tip.priority === 'high') {
    score += 30;
  } else if (tip.priority === 'medium') {
    score += 15;
  }
  
  return { tip, score, matchedFactors };
}

function checkWeatherTrigger(
  trigger: any,
  weather: WeatherConditions
): { matches: boolean; factors: string[] } {
  const factors: string[] = [];
  let matches = true;
  
  if (trigger.minTemp !== undefined && weather.temperature >= trigger.minTemp) {
    factors.push(`High Temperature (${weather.temperature}°C)`);
  } else if (trigger.minTemp !== undefined) {
    matches = false;
  }
  
  if (trigger.maxTemp !== undefined && weather.temperature <= trigger.maxTemp) {
    factors.push(`Low Temperature (${weather.temperature}°C)`);
  } else if (trigger.maxTemp !== undefined) {
    matches = false;
  }
  
  if (trigger.minRainfall !== undefined && weather.rainfall >= trigger.minRainfall) {
    factors.push(`Heavy Rainfall (${weather.rainfall}mm)`);
  } else if (trigger.minRainfall !== undefined) {
    matches = false;
  }
  
  if (trigger.maxRainfall !== undefined && weather.rainfall <= trigger.maxRainfall) {
    factors.push(`Low Rainfall (${weather.rainfall}mm)`);
  } else if (trigger.maxRainfall !== undefined) {
    matches = false;
  }
  
  if (trigger.minHumidity !== undefined && weather.humidity >= trigger.minHumidity) {
    factors.push(`High Humidity (${weather.humidity}%)`);
  } else if (trigger.minHumidity !== undefined) {
    matches = false;
  }
  
  if (trigger.maxHumidity !== undefined && weather.humidity <= trigger.maxHumidity) {
    factors.push(`Low Humidity (${weather.humidity}%)`);
  } else if (trigger.maxHumidity !== undefined) {
    matches = false;
  }
  
  return { matches: matches && factors.length > 0, factors };
}

function getWeatherAlerts(weather: WeatherConditions): WeatherAlert[] {
  const activeAlerts: WeatherAlert[] = [];
  
  if (weather.rainfall > 20) {
    const alert = weatherAlerts.find((a) => a.id === 'heavy-rain-alert');
    if (alert) activeAlerts.push(alert);
  }
  
  if (weather.temperature > 35) {
    const alert = weatherAlerts.find((a) => a.id === 'high-temp-alert');
    if (alert) activeAlerts.push(alert);
  }
  
  if (weather.humidity > 70) {
    const alert = weatherAlerts.find((a) => a.id === 'high-humidity-alert');
    if (alert) activeAlerts.push(alert);
  }
  
  if (weather.humidity < 30) {
    const alert = weatherAlerts.find((a) => a.id === 'low-humidity-alert');
    if (alert) activeAlerts.push(alert);
  }
  
  return activeAlerts;
}

function generateWeeklyTasks(
  userProfile: UserProfile,
  weather: WeatherConditions,
  currentSeason: Season
): WeeklyTask[] {
  const tasks: WeeklyTask[] = [];
  
  tasks.push({
    id: 'season-task-1',
    title: { 
      en: `${currentSeason} Season: Check soil moisture`, 
      hi: `${currentSeason} मौसम: मिट्टी की नमी जांचें` 
    },
    description: { 
      en: 'Monitor soil moisture levels daily for optimal plant growth', 
      hi: 'इष्टतम पौधे की वृद्धि के लिए दैनिक मिट्टी की नमी के स्तर की निगरानी करें' 
    },
    icon: 'droplets',
    completed: false,
    type: 'season',
  });
  
  if (weather.rainfall > 20) {
    tasks.push({
      id: 'weather-drainage',
      title: { en: 'Clear drainage channels', hi: 'जल निकासी चैनल साफ करें' },
      description: { en: 'Heavy rainfall expected - prevent waterlogging', hi: 'भारी बारिश की उम्मीद - जलभराव रोकें' },
      icon: 'cloud-rain',
      completed: false,
      type: 'weather',
    });
  }
  
  if (weather.temperature > 35) {
    tasks.push({
      id: 'weather-irrigation',
      title: { en: 'Increase irrigation', hi: 'सिंचाई बढ़ाएं' },
      description: { en: 'High temperature - water crops twice daily', hi: 'उच्च तापमान - दिन में दो बार फसलों को पानी दें' },
      icon: 'thermometer-sun',
      completed: false,
      type: 'weather',
    });
  }
  
  if (weather.humidity > 70) {
    tasks.push({
      id: 'weather-pest-check',
      title: { en: 'Check for pests and diseases', hi: 'कीटों और रोगों की जांच करें' },
      description: { en: 'High humidity increases disease risk', hi: 'उच्च आर्द्रता रोग जोखिम बढ़ाती है' },
      icon: 'bug',
      completed: false,
      type: 'weather',
    });
  }
  
  if (userProfile.soil === 'Alluvial') {
    tasks.push({
      id: 'soil-organic-matter',
      title: { en: 'Add organic matter', hi: 'जैविक पदार्थ जोड़ें' },
      description: { en: 'Mix compost to improve alluvial soil structure', hi: 'जलोढ़ मिट्टी की संरचना में सुधार के लिए खाद मिलाएं' },
      icon: 'mountain',
      completed: false,
      type: 'soil',
    });
  }
  
  if (userProfile.soil === 'Black') {
    tasks.push({
      id: 'soil-black-moisture',
      title: { en: 'Monitor soil cracking', hi: 'मिट्टी में दरार की निगरानी करें' },
      description: { en: 'Black soil can crack in dry conditions', hi: 'सूखी परिस्थितियों में काली मिट्टी में दरार पड़ सकती है' },
      icon: 'mountain',
      completed: false,
      type: 'soil',
    });
  }
  
  if (userProfile.growthStage === 'Flowering') {
    tasks.push({
      id: 'crop-stage-flowering',
      title: { en: 'Ensure adequate water at flowering', hi: 'फूल आने पर पर्याप्त पानी सुनिश्चित करें' },
      description: { en: 'Critical stage - water stress reduces yield', hi: 'महत्वपूर्ण अवस्था - जल तनाव उपज कम करता है' },
      icon: 'flower',
      completed: false,
      type: 'crop-stage',
    });
  }
  
  if (userProfile.growthStage === 'Vegetative') {
    tasks.push({
      id: 'crop-stage-vegetative',
      title: { en: 'Weed control', hi: 'खरपतवार नियंत्रण' },
      description: { en: 'Remove weeds to reduce competition for nutrients', hi: 'पोषक तत्वों के लिए प्रतिस्पर्धा कम करने के लिए खरपतवार हटाएं' },
      icon: 'sprout',
      completed: false,
      type: 'crop-stage',
    });
  }
  
  return tasks.slice(0, 6);
}

export function getMockWeather(): WeatherConditions {
  const month = getCurrentMonth();
  
  if (month >= 5 && month <= 9) {
    return {
      temperature: 32 + Math.random() * 6,
      rainfall: 5 + Math.random() * 25,
      humidity: 65 + Math.random() * 20,
    };
  }
  
  if (month >= 10 || month <= 2) {
    return {
      temperature: 18 + Math.random() * 10,
      rainfall: Math.random() * 5,
      humidity: 40 + Math.random() * 20,
    };
  }
  
  return {
    temperature: 25 + Math.random() * 8,
    rainfall: Math.random() * 10,
    humidity: 45 + Math.random() * 25,
  };
}

export function getWeatherForecast(days: number = 7): Array<{
  date: Date;
  weather: WeatherConditions;
  dayName: string;
}> {
  const forecast = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const baseWeather = getMockWeather();
    const variation = Math.random() * 6 - 3;
    
    forecast.push({
      date,
      weather: {
        temperature: Math.round((baseWeather.temperature + variation) * 10) / 10,
        rainfall: Math.round((baseWeather.rainfall + Math.random() * 5) * 10) / 10,
        humidity: Math.round((baseWeather.humidity + variation) * 10) / 10,
      },
      dayName: i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' }),
    });
  }
  
  return forecast;
}

export function cacheDataToLocalStorage(key: string, data: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to cache data:', error);
  }
}

export function getCachedData<T>(key: string): T | null {
  try {
    const cached = localStorage.getItem(key);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error('Failed to retrieve cached data:', error);
    return null;
  }
}
