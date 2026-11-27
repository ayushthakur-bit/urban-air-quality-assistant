import React from 'react';
import { Eye, ShieldAlert, Sparkles, AlertOctagon } from 'lucide-react';
import { AQIScaleCard, AQILevelItem } from './guide/AQIScaleCard';

const AQI_LEVELS: AQILevelItem[] = [
  {
    id: 'good',
    name: 'Good',
    range: '0 – 50 AQI',
    colorHex: '#10b981',
    image: '/assets/images/aqi-good.webp',
    alt: 'Crisp clear blue sky over an urban cityscape indicating Good air quality (AQI 0-50)',
    visibility: 'Full Horizon (>10 km)',
    healthAction: 'Air poses negligible risk. Ideal conditions for outdoor cardio and active recreation.',
    icon: Sparkles
  },
  {
    id: 'moderate',
    name: 'Moderate',
    range: '51 – 100 AQI',
    colorHex: '#f59e0b',
    image: '/assets/images/aqi-moderate.webp',
    alt: 'Mild atmospheric haze across urban skyline indicating Moderate air quality (AQI 51-100)',
    visibility: 'Slight Atmospheric Haze (6–9 km)',
    healthAction: 'Acceptable for general public. Unusually sensitive individuals may notice mild throat irritation.',
    icon: Eye
  },
  {
    id: 'unhealthy',
    name: 'Unhealthy',
    range: '151 – 200 AQI',
    colorHex: '#dc2626',
    image: '/assets/images/aqi-unhealthy.webp',
    alt: 'Thick smog obscuring downtown buildings during Unhealthy air conditions (AQI 151-200)',
    visibility: 'Heavy Smog Layer (2–4 km)',
    healthAction: 'Everyone begins to experience health effects. N95 respirators advised outdoors; suspend cardio.',
    icon: ShieldAlert
  },
  {
    id: 'hazardous',
    name: 'Hazardous',
    range: '301+ AQI',
    colorHex: '#7f1d1d',
    image: '/assets/images/aqi-hazardous.webp',
    alt: 'Severe hazardous winter smog and dark red haze blanketing city (AQI 301+)',
    visibility: 'Critical Inversion Fog (<1 km)',
    healthAction: 'Emergency warnings. Entire population at severe cardiovascular and respiratory risk. Stay indoors.',
    icon: AlertOctagon
  }
];

interface AQILevelsGuideProps {
  currentAqi?: number;
}

/**
 * Visual AQI spectrum reference section illustrating atmospheric conditions across levels.
 */
export const AQILevelsGuide: React.FC<AQILevelsGuideProps> = ({ currentAqi }) => {
  return (
    <section
      id="aqi-guide"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 scroll-mt-24"
      aria-label="Visual Guide to Atmospheric AQI Levels"
    >
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight">
          Visual Air Quality Index (AQI) Reference
        </h2>
        <p className="text-base text-[var(--color-text-secondary)] mt-2">
          How real-world urban atmospheres shift in visibility and health severity across the global AQI spectrum.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {AQI_LEVELS.map((level) => {
          const isCurrentMatch =
            currentAqi !== undefined &&
            ((level.id === 'good' && currentAqi <= 50) ||
              (level.id === 'moderate' && currentAqi > 50 && currentAqi <= 100) ||
              (level.id === 'unhealthy' && currentAqi > 100 && currentAqi <= 200) ||
              (level.id === 'hazardous' && currentAqi > 200));

          return <AQIScaleCard key={level.id} level={level} isCurrentMatch={isCurrentMatch} />;
        })}
      </div>
    </section>
  );
};
