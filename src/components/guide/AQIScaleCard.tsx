import React from 'react';
import { getAQIBadgeClasses } from '../../constants/aqi';
import { AQICategory } from '../../types';

export interface AQILevelItem {
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

interface AQIScaleCardProps {
  level: AQILevelItem;
  isCurrentMatch: boolean;
}

/** Individual visual spectrum card representing one discrete AQI bracket. */
export const AQIScaleCard: React.FC<AQIScaleCardProps> = ({ level, isCurrentMatch }) => {
  const IconComponent = level.icon;

  return (
    <div
      className={`clean-card overflow-hidden flex flex-col justify-between group transition-all duration-300 relative ${
        isCurrentMatch ? 'ring-2 ring-offset-2 ring-[#3b82f6]' : ''
      }`}
    >
      <div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B0F14]">
          <img
            src={level.image}
            alt={level.alt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          <div className="absolute top-3 right-3">
            <span
              className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold shadow-md ${getAQIBadgeClasses(level.name)}`}
            >
              {level.range}
            </span>
          </div>

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

        <div className="p-5">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="text-[var(--color-text-secondary)] font-medium">Visibility:</span>
            <span className="font-bold text-[var(--color-text-primary)]">{level.visibility}</span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {level.healthAction}
          </p>
        </div>
      </div>

      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: level.colorHex }}
        aria-hidden="true"
      />
    </div>
  );
};
