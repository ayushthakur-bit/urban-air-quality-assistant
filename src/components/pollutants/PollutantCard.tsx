import React from 'react';
import { PollutantDetail } from '../../types';
import { getPollutantBadgeClasses } from '../../constants/aqi';

export const POLLUTANT_MEDIA: Record<string, { image: string; alt: string; sourceDesc: string }> = {
  'PM2.5': {
    image: '/assets/images/pollutant-pm25.webp',
    alt: 'Fine particulate matter PM2.5 haze scattering sunlight in urban atmosphere',
    sourceDesc: 'Soot & combustion aerosols'
  },
  PM10: {
    image: '/assets/images/pollutant-pm10.webp',
    alt: 'Coarse particulate dust PM10 from urban road surfaces and excavation',
    sourceDesc: 'Road dust & excavation grit'
  },
  NO2: {
    image: '/assets/images/pollutant-no2.webp',
    alt: 'Dense city highway traffic generating nitrogen dioxide (NO2) tailpipe emissions',
    sourceDesc: 'Vehicle exhaust & engines'
  },
  SO2: {
    image: '/assets/images/pollutant-so2.webp',
    alt: 'Industrial smokestacks emitting sulfur dioxide (SO2) into the sky',
    sourceDesc: 'Industrial smokestack plumes'
  },
  CO: {
    image: '/assets/images/pollutant-co.webp',
    alt: 'Heavy urban vehicle congestion producing toxic carbon monoxide (CO) gas',
    sourceDesc: 'Traffic congestion idling fumes'
  },
  O3: {
    image: '/assets/images/pollutant-o3.webp',
    alt: 'Photochemical summer smog creating ground-level ozone (O3) over city towers',
    sourceDesc: 'Sunlight photochemical haze'
  }
};

interface PollutantCardProps {
  item: PollutantDetail;
}

/** Individual pollutant telemetry card with visual photo and WHO limit ratio. */
export const PollutantCard: React.FC<PollutantCardProps> = ({ item }) => {
  const ratio = Math.min(Math.round((item.value / item.standardLimit) * 100), 100);
  const media = POLLUTANT_MEDIA[item.code] || {
    image: '/assets/images/pollutant-pm25.webp',
    alt: item.name,
    sourceDesc: 'Atmospheric pollutant'
  };

  const getBarColor = (status: PollutantDetail['status']) => {
    switch (status) {
      case 'Good':
        return 'bg-emerald-500';
      case 'Moderate':
        return 'bg-amber-500';
      case 'Unhealthy':
        return 'bg-red-500';
      case 'Hazardous':
      default:
        return 'bg-rose-700';
    }
  };

  return (
    <div className="clean-card p-5 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
      <div>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl mb-4 bg-[#0B0F14] group/img">
          <img
            src={media.image}
            alt={media.alt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute top-2.5 left-2.5">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-md border border-white/20 image-text-overlay">
              {item.code}
            </span>
          </div>
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
            <span className="text-white/95 text-xs font-medium drop-shadow truncate max-w-[170px] image-text-overlay">
              {media.sourceDesc}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold shadow-md ${getPollutantBadgeClasses(item.status)}`}
            >
              {item.status}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-bold text-[var(--color-text-primary)] tracking-tight">
            {item.name}
          </h3>
          <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
            Standard: {item.standardLimit} {item.unit}
          </span>
        </div>

        <div className="flex items-baseline gap-1.5 my-2">
          <span className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] tracking-tight font-mono">
            {item.value}
          </span>
          <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
            {item.unit}
          </span>
        </div>

        <div className="my-3 space-y-1">
          <div className="w-full h-2 rounded-full bg-[var(--color-border)] overflow-hidden">
            <div
              className={`h-full ${getBarColor(item.status)} transition-all duration-700 rounded-full`}
              style={{ width: `${ratio}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-[var(--color-text-secondary)] font-medium">
            <span>WHO limit ratio</span>
            <span className="font-semibold text-[var(--color-text-primary)]">{ratio}%</span>
          </div>
        </div>

        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mt-3 pt-3 border-t border-[var(--color-border)]">
          {item.explanation}
        </p>
      </div>
    </div>
  );
};
