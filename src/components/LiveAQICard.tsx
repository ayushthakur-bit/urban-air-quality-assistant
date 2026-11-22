import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, Wind, Clock, MapPin, ShieldAlert } from 'lucide-react';
import { CityAirData } from '../types';
import { getAQIColorHex, getAQIBadgeClasses, GAUGE_CONFIG } from '../constants/aqi';

interface LiveAQICardProps {
  city: CityAirData;
}

/**
 * Live AQI Card displaying the primary Air Quality Index metric,
 * real-time semicircular color gauge, atmospheric weather telemetry,
 * and high-contrast category badges.
 */
export const LiveAQICard: React.FC<LiveAQICardProps> = ({ city }) => {
  const [displayedAqi, setDisplayedAqi] = useState(0);

  // Smooth Count-Up Animation for AQI Number
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1000; // 1s smooth count up
    const startValue = 0;
    const endValue = city.currentAqi;

    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutCubic curve
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayedAqi(Math.round(startValue + (endValue - startValue) * easedProgress));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [city.currentAqi]);

  const currentColor = getAQIColorHex(city.currentAqi);

  // Semicircular Gauge SVG Arc Calculation using named geometry constants
  const clampedAqi = Math.min(Math.max(city.currentAqi, 0), GAUGE_CONFIG.MAX_AQI);
  const strokeDashoffset =
    GAUGE_CONFIG.CIRCUMFERENCE - (clampedAqi / GAUGE_CONFIG.MAX_AQI) * GAUGE_CONFIG.CIRCUMFERENCE;

  return (
    <section
      id="live-aqi"
      className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-24"
      aria-label="Live Air Quality Index Card"
    >
      <div className="clean-card p-6 sm:p-8 md:p-10 relative overflow-hidden">
        {/* Soft Background Accent Glow matching current AQI */}
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
                <div
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold shadow-lg backdrop-blur-md ${getAQIBadgeClasses(city.category)}`}
                >
                  AQI {city.currentAqi}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          {/* Left Column: Semicircular Color-Coded Gauge with Animated Number */}
          <div className="flex flex-col items-center justify-center relative w-72 sm:w-80">
            <svg
              className="w-64 h-36 sm:w-72 sm:h-40 overflow-visible"
              viewBox="0 0 200 110"
              role="img"
              aria-label={`Air Quality Index gauge showing ${city.currentAqi}, rated ${city.category}`}
            >
              <defs>
                <linearGradient id="gaugeBgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="20%" stopColor="#f59e0b" />
                  <stop offset="40%" stopColor="#ea580c" />
                  <stop offset="60%" stopColor="#dc2626" />
                  <stop offset="80%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#7f1d1d" />
                </linearGradient>
              </defs>

              {/* Background Arc Track */}
              <path
                d="M 10 100 A 90 90 0 0 1 190 100"
                fill="none"
                stroke="currentColor"
                strokeWidth={GAUGE_CONFIG.STROKE_WIDTH}
                strokeLinecap="round"
                className="text-[var(--color-border)] opacity-60"
              />

              {/* Foreground Animated Value Arc */}
              <path
                d="M 10 100 A 90 90 0 0 1 190 100"
                fill="none"
                stroke={currentColor}
                strokeWidth={GAUGE_CONFIG.STROKE_WIDTH}
                strokeDasharray={GAUGE_CONFIG.CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="gauge-arc"
              />
            </svg>

            {/* Centered Large AQI Display */}
            <div className="mt-[-48px] text-center">
              <span className="text-xs uppercase font-bold tracking-widest text-[var(--color-text-secondary)] block">
                US AQI
              </span>
              <span
                className="text-5xl sm:text-6xl font-black tracking-tight block transition-colors duration-500 font-mono"
                style={{ color: currentColor }}
              >
                {displayedAqi}
              </span>
              <span className="text-xs text-[var(--color-text-secondary)]">Scale: 0 – 500</span>
            </div>
          </div>

          {/* Right Column: Category Badge, City Info, and Weather Metrics */}
          <div className="flex-1 text-center lg:text-left space-y-4">
            <div>
              <div
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-bold mb-3 shadow-sm ${getAQIBadgeClasses(city.category)}`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-current opacity-80" />
                <span>{city.category}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] flex items-center justify-center lg:justify-start gap-2">
                <MapPin className="w-6 h-6 text-[#3b82f6]" />
                <span>{city.name}</span>
                <span className="text-base font-normal text-[var(--color-text-secondary)]">
                  ({city.country})
                </span>
              </h2>

              <p className="text-sm text-[var(--color-text-secondary)] mt-1 flex items-center justify-center lg:justify-start gap-1">
                <Clock className="w-4 h-4" />
                <span>Station telemetry updated: {city.updatedAt}</span>
              </p>
            </div>

            {/* Quick Weather Conditions Row */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-[var(--color-bg-base)] border border-[var(--color-border)] text-center">
                <div className="flex items-center justify-center gap-1 text-[var(--color-text-secondary)] text-xs mb-0.5 font-medium">
                  <Thermometer className="w-4 h-4 text-[#3b82f6]" />
                  <span>Temp</span>
                </div>
                <span className="text-lg font-bold text-[var(--color-text-primary)]">
                  {city.weather.temp}°C
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[var(--color-bg-base)] border border-[var(--color-border)] text-center">
                <div className="flex items-center justify-center gap-1 text-[var(--color-text-secondary)] text-xs mb-0.5 font-medium">
                  <Droplets className="w-4 h-4 text-[#3b82f6]" />
                  <span>Humidity</span>
                </div>
                <span className="text-lg font-bold text-[var(--color-text-primary)]">
                  {city.weather.humidity}%
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[var(--color-bg-base)] border border-[var(--color-border)] text-center">
                <div className="flex items-center justify-center gap-1 text-[var(--color-text-secondary)] text-xs mb-0.5 font-medium">
                  <Wind className="w-4 h-4 text-[#3b82f6]" />
                  <span>Wind</span>
                </div>
                <span className="text-lg font-bold text-[var(--color-text-primary)]">
                  {city.weather.windSpeed} km/h
                </span>
              </div>
            </div>

            {/* Top Key Advice Headline */}
            <div className="p-3.5 rounded-2xl bg-[var(--color-bg-base)] border border-[var(--color-border)] flex items-start gap-3 text-sm text-[var(--color-text-primary)]">
              <ShieldAlert className="w-5 h-5 shrink-0 text-[#3b82f6] mt-0.5" />
              <p className="leading-relaxed">
                {city.category === 'Good' &&
                  'Air quality is great! An ideal day for outdoor cardio, walks, and natural room ventilation.'}
                {city.category === 'Moderate' &&
                  'Air quality is acceptable. Very sensitive individuals may consider reducing prolonged outdoor exertion.'}
                {city.category === 'Unhealthy for Sensitive Groups' &&
                  'Children, seniors, and people with respiratory conditions should take breaks and limit strenuous outdoor work.'}
                {city.category === 'Unhealthy' &&
                  'Everyone should reduce heavy outdoor exertion. Sensitive groups should wear N95 masks outdoors.'}
                {city.category === 'Very Unhealthy' &&
                  'Health warning: active children and adults should avoid all outdoor physical activities.'}
                {city.category === 'Hazardous' &&
                  'Emergency air alert: everyone should remain indoors with windows sealed and active HEPA air filtration.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
