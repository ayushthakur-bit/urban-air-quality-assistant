import React, { useState } from 'react';
import { CityAirData } from '../types';
import { CitySearchInput } from './hero/CitySearchInput';
import { QuickCityChips } from './hero/QuickCityChips';

interface HeroProps {
  currentCity: CityAirData;
  onSelectCity: (city: CityAirData) => void;
  onLocateUser: () => void;
  isLocating: boolean;
  onSearchCustom: (query: string) => void;
  errorMessage?: string | null;
}

/**
 * Hero section providing headline introduction, city search autocomplete,
 * and GPS "Use My Location" proximity station detection.
 */
export const Hero: React.FC<HeroProps> = ({
  currentCity,
  onSelectCity,
  onLocateUser,
  isLocating,
  onSearchCustom,
  errorMessage
}) => {
  const [localError, setLocalError] = useState<string | null>(null);

  return (
    <section
      id="home"
      className="relative pt-10 pb-8 md:pt-16 md:pb-12 text-center overflow-hidden"
      aria-label="Air Quality City Search & Introduction"
    >
      {/* Background with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <img
          src="/assets/images/hero-smog-skyline.webp"
          alt="Dense air pollution and winter smog enveloping urban city skyline at sunrise"
          loading="lazy"
          className="w-full h-full object-cover opacity-15 dark:opacity-20 transition-opacity duration-700 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-base)]/80 via-[var(--color-bg-base)]/92 to-[var(--color-bg-base)]" />
      </div>

      {/* Floating Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="particle-dot w-48 h-48 bg-[#3b82f6]/10 blur-3xl -top-10 -left-10" style={{ animationDuration: '10s' }} />
        <div className="particle-dot w-64 h-64 bg-[#60a5fa]/10 blur-3xl top-20 right-10" style={{ animationDuration: '12s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] leading-tight">
          Breathe Informed,{' '}
          <span className="bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#10b981] dark:from-[#60a5fa] dark:via-[#93c5fd] dark:to-[#34d399] bg-clip-text text-transparent">
            Live Healthier
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[var(--color-text-secondary)] max-w-[65ch] mx-auto font-normal leading-relaxed">
          Real-time urban air quality telemetry, pollutant breakdowns, and tailored health guidance for your city.
        </p>

        <div className="mt-8 max-w-2xl mx-auto">
          <CitySearchInput
            onSelectCity={onSelectCity}
            onLocateUser={onLocateUser}
            isLocating={isLocating}
            onSearchCustom={onSearchCustom}
            setLocalError={setLocalError}
          />

          <QuickCityChips currentCityId={currentCity.id} onSelectCity={onSelectCity} />

          {(localError || errorMessage) && (
            <div
              role="alert"
              className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/40 text-rose-700 dark:text-rose-300 text-sm font-medium animate-fadeIn"
            >
              {localError || errorMessage}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
