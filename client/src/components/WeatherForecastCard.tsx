import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudRain, Droplets, ThermometerSun } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WeatherDay {
  date: Date;
  weather: {
    temperature: number;
    rainfall: number;
    humidity: number;
  };
  dayName: string;
}

interface WeatherForecastCardProps {
  forecast: WeatherDay[];
}

export default function WeatherForecastCard({ forecast }: WeatherForecastCardProps) {
  const { t } = useLanguage();

  return (
    <Card data-testid="card-weather-forecast">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <CloudRain className="h-5 w-5" />
          {t({ en: '7-Day Weather Forecast', hi: '7-दिवसीय मौसम पूर्वानुमान' })}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-7 gap-2">
          {forecast.map((day, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-2 rounded-lg hover-elevate"
              data-testid={`forecast-day-${idx}`}
            >
              <p className="text-xs font-medium mb-2" data-testid={`text-day-${idx}`}>
                {day.dayName}
              </p>
              
              <div className="space-y-1.5 w-full">
                <div className="flex flex-col items-center gap-0.5">
                  <ThermometerSun className="h-3.5 w-3.5 text-orange-500" />
                  <p className="text-xs font-semibold" data-testid={`text-temp-${idx}`}>
                    {Math.round(day.weather.temperature)}°
                  </p>
                </div>
                
                <div className="flex flex-col items-center gap-0.5">
                  <CloudRain className="h-3.5 w-3.5 text-blue-500" />
                  <p className="text-xs" data-testid={`text-rain-${idx}`}>
                    {Math.round(day.weather.rainfall)}mm
                  </p>
                </div>
                
                <div className="flex flex-col items-center gap-0.5">
                  <Droplets className="h-3.5 w-3.5 text-cyan-500" />
                  <p className="text-xs" data-testid={`text-humidity-${idx}`}>
                    {Math.round(day.weather.humidity)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
