import React from 'react';
import { CityAirData } from '../../types';
import { CITIES_DATABASE } from '../../data/cities';

interface QuickCityChipsProps {
  currentCityId: string;
  onSelectCity: (city: CityAirData) => void;
}

/** Quick selectable pills for popular metropolitan centers. */
export const QuickCityChips: React.FC<QuickCityChipsProps> = ({ currentCityId, onSelectCity }) => {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
      <span className="text-[var(--color-text-secondary)] font-medium mr-1">Popular:</span>
      {CITIES_DATABASE.slice(0, 5).map((city) => (
        <button
          key={city.id}
          type="button"
          onClick={() => onSelectCity(city)}
          className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-all min-h-[36px] ${
            currentCityId === city.id
              ? 'bg-[#3b82f6] text-white border-[#3b82f6] shadow-sm'
              : 'bg-[var(--color-bg-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[#3b82f6]'
          }`}
        >
          {city.name}
        </button>
      ))}
    </div>
  );
};
