import React from 'react';
import { CityAirData } from '../types';
import { ShieldCheck, HeartPulse, Activity, Wind } from 'lucide-react';

interface HealthAdviceProps {
  city: CityAirData;
}

export const HealthAdvice: React.FC<HealthAdviceProps> = ({ city }) => {
  const { healthAdvice } = city;

  return (
    <section 
      id="health-tips" 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 scroll-mt-24"
      aria-label="Health Advice and Protective Recommendations"
    >
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight">
          Personal Health Recommendations
        </h2>
        <p className="text-base text-[var(--color-text-secondary)] mt-2">
          Practical, actionable guidelines based on the current AQI ({city.currentAqi} – {city.category}) in {city.name}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Mask Advice */}
        <div className="clean-card overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
          <div>
            {/* Visual Image Header */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B0F14]">
              <img
                src="/assets/images/tip-masks.webp"
                alt="Certified N95 / FFP2 particulate respirator mask for outdoor pollution defense"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              <div className="absolute top-3 left-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/30 backdrop-blur-md text-amber-200 flex items-center justify-center border border-amber-400/30">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              <div className="absolute bottom-2.5 left-3 right-3">
                <span className="text-white font-bold text-sm drop-shadow-md image-text-overlay">
                  Mask Guidance
                </span>
              </div>
            </div>

            <div className="p-5">
              <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--color-bg-base)] text-[var(--color-text-primary)] border border-[var(--color-border)] mb-3 shadow-sm">
                {healthAdvice.mask.type}
              </span>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {healthAdvice.mask.advice}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Outdoor Activity */}
        <div className="clean-card overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
          <div>
            {/* Visual Image Header */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B0F14]">
              <img
                src="/assets/images/tip-exercise.webp"
                alt="Person jogging safely outdoors in a fresh green park during low AQI periods"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              <div className="absolute top-3 left-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/30 backdrop-blur-md text-emerald-200 flex items-center justify-center border border-emerald-400/30">
                  <Activity className="w-4 h-4" />
                </div>
              </div>

              <div className="absolute bottom-2.5 left-3 right-3">
                <span className="text-white font-bold text-sm drop-shadow-md image-text-overlay">
                  Outdoor Exercise
                </span>
              </div>
            </div>

            <div className="p-5">
              <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 shadow-sm ${
                healthAdvice.exercise.allowed 
                  ? 'badge-aqi-good' 
                  : 'badge-aqi-unhealthy'
              }`}>
                {healthAdvice.exercise.allowed ? 'Safe for Cardio' : 'Limit Heavy Exertion'}
              </span>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {healthAdvice.exercise.advice}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Sensitive Groups */}
        <div className="clean-card overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
          <div>
            {/* Visual Image Header */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B0F14]">
              <img
                src="/assets/images/tip-sensitive-groups.webp"
                alt="Vulnerable populations including children and elderly walking in clean environment"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              <div className="absolute top-3 left-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500/30 backdrop-blur-md text-purple-200 flex items-center justify-center border border-purple-400/30">
                  <HeartPulse className="w-4 h-4" />
                </div>
              </div>

              <div className="absolute bottom-2.5 left-3 right-3">
                <span className="text-white font-bold text-sm drop-shadow-md image-text-overlay">
                  Sensitive Groups
                </span>
              </div>
            </div>

            <div className="p-5">
              <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 shadow-sm ${
                healthAdvice.sensitiveGroups.warning 
                  ? 'badge-aqi-unhealthy' 
                  : 'badge-aqi-good'
              }`}>
                {healthAdvice.sensitiveGroups.warning ? 'Precaution Advised' : 'No Specific Risks'}
              </span>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {healthAdvice.sensitiveGroups.advice}
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Indoor Air & Ventilation */}
        <div className="clean-card overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
          <div>
            {/* Visual Image Header */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B0F14]">
              <img
                src="/assets/images/tip-indoor-air.webp"
                alt="Modern residential living space with active HEPA air filtration and indoor purifying plants"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              <div className="absolute top-3 left-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/30 backdrop-blur-md text-blue-200 flex items-center justify-center border border-blue-400/30">
                  <Wind className="w-4 h-4" />
                </div>
              </div>

              <div className="absolute bottom-2.5 left-3 right-3">
                <span className="text-white font-bold text-sm drop-shadow-md image-text-overlay">
                  Indoor Air & Purifiers
                </span>
              </div>
            </div>

            <div className="p-5">
              <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 shadow-sm ${
                healthAdvice.ventilation.openWindows 
                  ? 'badge-aqi-good' 
                  : 'badge-aqi-moderate'
              }`}>
                {healthAdvice.ventilation.openWindows ? 'Open Windows Safe' : 'Keep Windows Closed'}
              </span>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {healthAdvice.ventilation.advice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
