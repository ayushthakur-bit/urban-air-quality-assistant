import React, { useState } from 'react';
import { CityAirData } from '../types';
import { Calendar, Clock, TrendingUp } from 'lucide-react';
import { getAQIColorHex } from '../constants/aqi';
import { HourlyTrendChart } from './charts/HourlyTrendChart';
import { DailyForecastChart } from './charts/DailyForecastChart';

interface AirQualityChartsProps {
  city: CityAirData;
  isDarkMode?: boolean;
}

/**
 * Air Quality Charts component displaying responsive 24-hour diurnal trends
 * and extended 7-day projections using Recharts.
 */
export const AirQualityCharts: React.FC<AirQualityChartsProps> = ({ city, isDarkMode }) => {
  const [activeChartTab, setActiveChartTab] = useState<'24h' | '7day'>('24h');

  const currentColor = getAQIColorHex(city.currentAqi);
  const axisColor = isDarkMode ? '#A1A9B5' : '#4B5563';

  return (
    <section
      id="forecast"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 scroll-mt-24"
      aria-label="Air Quality Forecast and Historical Trends"
    >
      <div className="clean-card p-6 sm:p-8">
        {/* Header & View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] tracking-tight flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#3b82f6]" />
              <span>Air Quality Trends & Forecast</span>
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
              Hourly 24-hour trajectory and extended 7-day atmospheric projections for {city.name}.
            </p>
          </div>

          {/* Tab Switcher */}
          <div
            className="flex items-center bg-[var(--color-bg-base)] p-1 rounded-2xl border border-[var(--color-border)] shrink-0 self-start sm:self-auto"
            role="tablist"
          >
            <button
              role="tab"
              aria-selected={activeChartTab === '24h'}
              onClick={() => setActiveChartTab('24h')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all min-h-[44px] ${
                activeChartTab === '24h'
                  ? 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] shadow-sm border border-[var(--color-border)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <Clock className="w-4 h-4 text-[#3b82f6]" />
              <span>24-Hour Trend</span>
            </button>

            <button
              role="tab"
              aria-selected={activeChartTab === '7day'}
              onClick={() => setActiveChartTab('7day')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all min-h-[44px] ${
                activeChartTab === '7day'
                  ? 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] shadow-sm border border-[var(--color-border)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#3b82f6]" />
              <span>7-Day Forecast</span>
            </button>
          </div>
        </div>

        {/* Chart View Content */}
        <div className="pt-6">
          {activeChartTab === '24h' ? (
            <HourlyTrendChart data={city.hourlyTrend} currentColor={currentColor} axisColor={axisColor} />
          ) : (
            <DailyForecastChart data={city.dailyForecast} currentColor={currentColor} axisColor={axisColor} />
          )}
        </div>
      </div>
    </section>
  );
};
