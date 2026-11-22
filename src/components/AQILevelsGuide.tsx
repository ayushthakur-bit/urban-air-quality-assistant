import React from 'react';
import { Eye, ShieldAlert, Sparkles, AlertOctagon } from 'lucide-react';
import { getAQIBadgeClasses } from '../data/mockData';
import { AQICategory } from '../types';

interface AQILevelItem {
  id: string;
  name: AQICategory;
  range: string;
  colorHex: string;
  image: string;
  alt: string;
  visibility: string;
  healthAction: string;
  icon: React.ComponentType<{ className?: string }>;
}

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
    icon: Sparkles,
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
    icon: Eye,
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
    icon: ShieldAlert,
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
    icon: AlertOctagon,
  },
];

interface AQILevelsGuideProps {
  currentAqi?: number;
}

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
          const IconComponent = level.icon;
          const isCurrentMatch = currentAqi !== undefined && (
            (level.id === 'good' && currentAqi <= 50) ||
            (level.id === 'moderate' && currentAqi > 50 && currentAqi <= 100) ||
            (level.id === 'unhealthy' && currentAqi > 100 && currentAqi <= 200) ||
            (level.id === 'hazardous' && currentAqi > 200)
          );

          return (
            <div
              key={level.id}
              className={`clean-card overflow-hidden flex flex-col justify-between group transition-all duration-300 relative ${
                isCurrentMatch ? 'ring-2 ring-offset-2 ring-[#3b82f6]' : ''
              }`}
            >
              <div>
                {/* Visual Image with Fixed Aspect Ratio & Dark Gradient Overlay */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B0F14]">
                  <img
                    src={level.image}
                    alt={level.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                  {/* Range Pill on top-right */}
                  <div className="absolute top-3 right-3">
                    <span 
                      className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold shadow-md ${getAQIBadgeClasses(level.name)}`}
                    >
                      {level.range}
                    </span>
                  </div>

                  {/* Level Name & Icon on bottom-left */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-white backdrop-blur-md"
                        style={{ backgroundColor: `${level.colorHex}99` }}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-white font-bold text-sm drop-shadow-md image-text-overlay">
                        {level.name}
                      </span>
                    </div>

                    {isCurrentMatch && (
                      <span className="px-2 py-0.5 text-xs font-bold uppercase rounded bg-white text-slate-900 shadow">
                        Current
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-[var(--color-text-secondary)] font-medium">Visibility:</span>
                    <span className="font-bold text-[var(--color-text-primary)]">
                      {level.visibility}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {level.healthAction}
                  </p>
                </div>
              </div>

              {/* Status color indicator bar at bottom */}
              <div 
                className="h-1.5 w-full"
                style={{ backgroundColor: level.colorHex }}
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
