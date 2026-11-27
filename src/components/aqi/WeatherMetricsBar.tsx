import React from 'react';
import { Thermometer, Droplets, Wind } from 'lucide-react';
import { CityAirData } from '../../types';

interface WeatherMetricsBarProps {
  weather: CityAirData['weather'];
}

/** Row of quick weather telemetry cards: Temperature, Humidity, and Wind speed. */
export const WeatherMetricsBar: React.FC<WeatherMetricsBarProps> = ({ weather }) => {
  return (
    <div className="grid grid-cols-3 gap-3 pt-2">
      <div className="p-3 rounded-2xl bg-[var(--color-bg-base)] border border-[var(--color-border)] text-center">
        <div className="flex items-center justify-center gap-1 text-[var(--color-text-secondary)] text-xs mb-0.5 font-medium">
          <Thermometer className="w-4 h-4 text-[#3b82f6]" />
          <span>Temp</span>
        </div>
        <span className="text-lg font-bold text-[var(--color-text-primary)]">{weather.temp}°C</span>
      </div>

      <div className="p-3 rounded-2xl bg-[var(--color-bg-base)] border border-[var(--color-border)] text-center">
        <div className="flex items-center justify-center gap-1 text-[var(--color-text-secondary)] text-xs mb-0.5 font-medium">
          <Droplets className="w-4 h-4 text-[#3b82f6]" />
          <span>Humidity</span>
        </div>
        <span className="text-lg font-bold text-[var(--color-text-primary)]">{weather.humidity}%</span>
      </div>

      <div className="p-3 rounded-2xl bg-[var(--color-bg-base)] border border-[var(--color-border)] text-center">
        <div className="flex items-center justify-center gap-1 text-[var(--color-text-secondary)] text-xs mb-0.5 font-medium">
          <Wind className="w-4 h-4 text-[#3b82f6]" />
          <span>Wind</span>
        </div>
        <span className="text-lg font-bold text-[var(--color-text-primary)]">{weather.windSpeed} km/h</span>
      </div>
    </div>
  );
};
