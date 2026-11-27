import React from 'react';
import { Clock, MapPin, ShieldAlert } from 'lucide-react';
import { CityAirData } from '../types';
import { getAQIColorHex, getAQIBadgeClasses } from '../constants/aqi';
import { AQIRadialGauge } from './aqi/AQIRadialGauge';
import { WeatherMetricsBar } from './aqi/WeatherMetricsBar';

interface LiveAQICardProps {
  city: CityAirData;
}

/**
 * Live AQI Card displaying the primary Air Quality Index metric,
 * real-time semicircular color gauge, atmospheric weather telemetry,
 * and high-contrast category badges.
 */
export const LiveAQICard: React.FC<LiveAQICardProps> = ({ city }) => {
  const currentColor = getAQIColorHex(city.currentAqi);

  return (
    <section
      id="live-aqi"
      className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-24"
      aria-label="Live Air Quality Index Card"
    >
      <div className="clean-card p-6 sm:p-8 md:p-10 relative overflow-hidden">
        {/* Soft Accent Glow */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: currentColor }}
          aria-hidden="true"
        />

        {/* City Skyline Banner Header with Dark Gradient Overlay */}
        {city.image && (
          <div className="relative w-full h-28 sm:h-36 rounded-2xl overflow-hidden mb-6 sm:mb-8 border border-[var(--color-border)] shadow-inner bg-[#0B0F14]">
            <img
              src={city.image}
              alt={`${city.name} skyline under ${city.category.toLowerCase()} atmospheric conditions`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent flex items-end p-4 sm:p-5">
              <div className="flex items-center justify-between w-full">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-white/80 drop-shadow block image-text-overlay">
                    Telemetry Station
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-md image-text-overlay">
                    {city.name}, {city.country}
                  </h3>
                </div>
                <div className={`px-3 py-1 rounded-xl text-xs font-mono font-bold shadow-lg backdrop-blur-md ${getAQIBadgeClasses(city.category)}`}>
                  AQI {city.currentAqi}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          {/* Left Column: Semicircular Gauge */}
          <AQIRadialGauge currentAqi={city.currentAqi} category={city.category} currentColor={currentColor} />

          {/* Right Column: Category Badge, City Info, and Weather Metrics */}
          <div className="flex-1 text-center lg:text-left space-y-4">
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2 flex-wrap">
                <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-bold shadow-sm ${getAQIBadgeClasses(city.category)}`}>
                  <span className="w-2.5 h-2.5 rounded-full bg-current opacity-80" />
                  <span>{city.category}</span>
                </div>

                {city.dataSource === 'live' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Telemetry
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Offline sample data
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] flex items-center justify-center lg:justify-start gap-2">
                <MapPin className="w-6 h-6 text-[#3b82f6]" />
                <span>{city.name}</span>
                <span className="text-base font-normal text-[var(--color-text-secondary)]">({city.country})</span>
              </h2>

              <p className="text-sm text-[var(--color-text-secondary)] mt-1 flex items-center justify-center lg:justify-start gap-1">
                <Clock className="w-4 h-4" />
                <span>Station updated: {city.updatedAt}</span>
              </p>
            </div>

            <WeatherMetricsBar weather={city.weather} />

            <div className="p-3.5 rounded-2xl bg-[var(--color-bg-base)] border border-[var(--color-border)] flex items-start gap-3 text-sm text-[var(--color-text-primary)]">
              <ShieldAlert className="w-5 h-5 shrink-0 text-[#3b82f6] mt-0.5" />
              <p className="leading-relaxed">
                {city.category === 'Good' && 'Air quality is great! An ideal day for outdoor cardio, walks, and natural room ventilation.'}
                {city.category === 'Moderate' && 'Air quality is acceptable. Very sensitive individuals may consider reducing prolonged outdoor exertion.'}
                {city.category === 'Unhealthy for Sensitive Groups' && 'Children, seniors, and people with respiratory conditions should limit strenuous outdoor work.'}
                {city.category === 'Unhealthy' && 'Everyone should reduce heavy outdoor exertion. Sensitive groups should wear N95 masks outdoors.'}
                {city.category === 'Very Unhealthy' && 'Health warning: active children and adults should avoid all outdoor physical activities.'}
                {city.category === 'Hazardous' && 'Emergency air alert: everyone should remain indoors with windows sealed and active HEPA air filtration.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
