import React from 'react';
import { CityAirData, PollutantDetail } from '../types';
import { PollutantCard } from './pollutants/PollutantCard';

interface PollutantGridProps {
  city: CityAirData;
}

/**
 * Grid rendering individual cards for the 6 criteria pollutants.
 */
export const PollutantGrid: React.FC<PollutantGridProps> = ({ city }) => {
  const pollutantList: PollutantDetail[] = [
    city.pollutants.pm25,
    city.pollutants.pm10,
    city.pollutants.no2,
    city.pollutants.so2,
    city.pollutants.co,
    city.pollutants.o3
  ];

  return (
    <section
      id="pollutants"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 scroll-mt-24"
      aria-label="Core Atmospheric Pollutants Breakdown"
    >
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight">
          Core Pollutants Breakdown
        </h2>
        <p className="text-base text-[var(--color-text-secondary)] mt-2">
          Real-time measurement and visual context for the 6 criteria pollutants monitored by the
          EPA and WHO.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pollutantList.map((item) => (
          <PollutantCard key={item.code} item={item} />
        ))}
      </div>
    </section>
  );
};
