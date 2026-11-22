import React from 'react';
import { CityAirData } from '../types';
import {
  ShieldCheck,
  HeartPulse,
  Activity,
  Wind,
  AlertCircle,
  Baby,
  UserCheck,
  Stethoscope,
  Dumbbell
} from 'lucide-react';

interface HealthAdviceProps {
  city: CityAirData;
}

/**
 * Health advice and protective recommendations tailored to current AQI levels,
 * with explicit guidance for sensitive sub-populations and medical disclaimer.
 */
export const HealthAdvice: React.FC<HealthAdviceProps> = ({ city }) => {
  const { healthAdvice } = city;
  const isHighSmog = city.currentAqi > 100;

  return (
    <section
      id="health-tips"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 scroll-mt-24"
      aria-label="Health Advice and Protective Recommendations"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight">
          Personal Health Recommendations
        </h2>
        <p className="text-base text-[var(--color-text-secondary)] mt-2">
          Practical, actionable guidelines based on the current AQI ({city.currentAqi} –{' '}
          {city.category}) in {city.name}.
        </p>
      </div>

      {/* Core Protective Actions (4 Grid Cards with real photos) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Card 1: Mask Advice */}
        <div className="clean-card overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
          <div>
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
              <span
                className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 shadow-sm ${
                  healthAdvice.exercise.allowed ? 'badge-aqi-good' : 'badge-aqi-unhealthy'
                }`}
              >
                {healthAdvice.exercise.allowed ? 'Safe for Cardio' : 'Limit Heavy Exertion'}
              </span>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {healthAdvice.exercise.advice}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Sensitive Groups Overview */}
        <div className="clean-card overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
          <div>
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
              <span
                className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 shadow-sm ${
                  healthAdvice.sensitiveGroups.warning ? 'badge-aqi-unhealthy' : 'badge-aqi-good'
                }`}
              >
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
              <span
                className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 shadow-sm ${
                  healthAdvice.ventilation.openWindows ? 'badge-aqi-good' : 'badge-aqi-moderate'
                }`}
              >
                {healthAdvice.ventilation.openWindows ? 'Open Windows Safe' : 'Keep Windows Closed'}
              </span>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {healthAdvice.ventilation.advice}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sensitive Sub-Populations Action Matrix */}
      <div className="clean-card p-6 sm:p-8 mb-8 border border-[var(--color-border)] bg-[var(--color-bg-surface)]">
        <div className="flex items-center gap-2 mb-6">
          <HeartPulse className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
            Tailored Guidelines by Vulnerable Group
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Group 1: Children & Infants */}
          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-base)]">
            <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400">
              <Baby className="w-4 h-4" />
              <span className="font-bold text-sm">Children & Infants</span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              {isHighSmog
                ? 'Children inhale 50% more air per pound of body weight. Keep play sessions indoors with active filtration.'
                : 'Safe for playground visits, sports, and outdoor physical recreation.'}
            </p>
          </div>

          {/* Group 2: Older Adults */}
          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-base)]">
            <div className="flex items-center gap-2 mb-2 text-amber-600 dark:text-amber-400">
              <UserCheck className="w-4 h-4" />
              <span className="font-bold text-sm">Older Adults (65+)</span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              {isHighSmog
                ? 'Elevated particle levels increase cardiovascular strain. Postpone morning outdoor walks until afternoon.'
                : 'Great conditions for garden walks and light outdoor mobility activities.'}
            </p>
          </div>

          {/* Group 3: Asthma & Respiratory */}
          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-base)]">
            <div className="flex items-center gap-2 mb-2 text-rose-600 dark:text-rose-400">
              <Stethoscope className="w-4 h-4" />
              <span className="font-bold text-sm">Asthma & COPD</span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              {isHighSmog
                ? 'High bronchoconstriction trigger risk. Keep prescribed fast-acting rescue inhalers accessible at all times.'
                : 'Normal baseline respiratory risk. Carry preventative medication as normally advised.'}
            </p>
          </div>

          {/* Group 4: Athletes & Runners */}
          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-base)]">
            <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400">
              <Dumbbell className="w-4 h-4" />
              <span className="font-bold text-sm">Athletes & Runners</span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              {isHighSmog
                ? 'Deep mouth breathing bypasses nasal filters, pulling soot deep into alveoli. Shift workouts indoors.'
                : 'Optimal atmospheric conditions for long-distance runs and high-intensity interval training.'}
            </p>
          </div>
        </div>
      </div>

      {/* Prominent Medical Disclaimer Banner */}
      <div
        className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-3 shadow-sm"
        role="note"
        aria-label="Medical Disclaimer"
      >
        <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold block mb-0.5 text-amber-950 dark:text-amber-100">
            Medical & Clinical Health Disclaimer
          </span>
          Health recommendations and air quality precautions provided by UrbanAir are for general
          informational, educational, and preventive awareness only. They do not constitute
          certified medical diagnosis, individualized clinical advice, or treatment plans.
          Individuals with chronic cardiopulmonary disorders, asthma, pregnancy, or acute symptoms
          must consult their licensed physician or emergency medical provider.
        </div>
      </div>
    </section>
  );
};
