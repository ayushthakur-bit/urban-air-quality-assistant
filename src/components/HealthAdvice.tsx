import React from 'react';
import { CityAirData } from '../types';
import { ShieldCheck, Activity, Wind, AlertCircle } from 'lucide-react';
import { HealthAdviceCard } from './health/HealthAdviceCard';
import { SensitiveGroupsMatrix } from './health/SensitiveGroupsMatrix';
import { MedicalDisclaimer } from './health/MedicalDisclaimer';

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
          Practical, actionable guidelines based on the current AQI ({city.currentAqi} – {city.category}) in {city.name}.
        </p>
      </div>

      {/* Core Protective Actions (4 Grid Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <HealthAdviceCard
          image="/assets/images/tip-masks.webp"
          alt="Certified N95 / FFP2 particulate respirator mask for outdoor pollution defense"
          title="Mask Guidance"
          badgeText={healthAdvice.mask.type}
          advice={healthAdvice.mask.advice}
          icon={
            <div className="w-8 h-8 rounded-xl bg-amber-500/30 backdrop-blur-md text-amber-200 flex items-center justify-center border border-amber-400/30">
              <ShieldCheck className="w-4 h-4" />
            </div>
          }
        />

        <HealthAdviceCard
          image="/assets/images/tip-exercise.webp"
          alt="Person jogging safely outdoors in a fresh green park during low AQI periods"
          title="Outdoor Exercise"
          badgeText={healthAdvice.exercise.allowed ? 'Outdoor Exercise Safe' : 'Exercise Indoors'}
          badgeClass={healthAdvice.exercise.allowed ? 'badge-aqi-good' : 'badge-aqi-unhealthy'}
          advice={healthAdvice.exercise.advice}
          icon={
            <div className="w-8 h-8 rounded-xl bg-emerald-500/30 backdrop-blur-md text-emerald-200 flex items-center justify-center border border-emerald-400/30">
              <Activity className="w-4 h-4" />
            </div>
          }
        />

        <HealthAdviceCard
          image="/assets/images/tip-sensitive-groups.webp"
          alt="Vulnerable populations including children and elderly walking in clean environment"
          title="Sensitive Groups"
          badgeText={healthAdvice.sensitiveGroups.warning ? 'Precaution Advised' : 'No Specific Risks'}
          badgeClass={healthAdvice.sensitiveGroups.warning ? 'badge-aqi-unhealthy' : 'badge-aqi-good'}
          advice={healthAdvice.sensitiveGroups.advice}
          icon={
            <div className="w-8 h-8 rounded-xl bg-rose-500/30 backdrop-blur-md text-rose-200 flex items-center justify-center border border-rose-400/30">
              <AlertCircle className="w-4 h-4" />
            </div>
          }
        />

        <HealthAdviceCard
          image="/assets/images/tip-indoor-air.webp"
          alt="Modern residential living space with active HEPA air filtration and indoor purifying plants"
          title="Indoor Air & Purifiers"
          badgeText={healthAdvice.ventilation.openWindows ? 'Open Windows Safe' : 'Keep Windows Closed'}
          badgeClass={healthAdvice.ventilation.openWindows ? 'badge-aqi-good' : 'badge-aqi-moderate'}
          advice={healthAdvice.ventilation.advice}
          icon={
            <div className="w-8 h-8 rounded-xl bg-blue-500/30 backdrop-blur-md text-blue-200 flex items-center justify-center border border-blue-400/30">
              <Wind className="w-4 h-4" />
            </div>
          }
        />
      </div>

      {/* Sensitive Sub-Populations Action Matrix */}
      <SensitiveGroupsMatrix isHighSmog={isHighSmog} />

      {/* Prominent Medical Disclaimer Banner */}
      <MedicalDisclaimer />
    </section>
  );
};
