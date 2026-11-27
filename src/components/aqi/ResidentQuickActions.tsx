import React from 'react';
import { Activity, ShieldCheck, Wind } from 'lucide-react';
import { CityAirData } from '../../types';

interface ResidentQuickActionsProps {
  city: CityAirData;
}

/**
 * Three prominent, actionable status badges providing city residents
 * immediate advice on outdoor exercise, mask protection, and room ventilation.
 */
export const ResidentQuickActions: React.FC<ResidentQuickActionsProps> = ({ city }) => {
  const { currentAqi } = city;

  const exerciseAdvice =
    currentAqi <= 50
      ? { label: 'Outdoor Exercise', status: 'Safe', desc: 'Ideal for running & cycling' }
      : currentAqi <= 100
        ? {
            label: 'Outdoor Exercise',
            status: 'Moderate',
            desc: 'Safe for most; sensitive take caution'
          }
        : currentAqi <= 150
          ? { label: 'Outdoor Exercise', status: 'Limit', desc: 'Move strenuous cardio indoors' }
          : { label: 'Outdoor Exercise', status: 'Avoid', desc: 'Exercise indoors only' };

  const maskAdvice =
    currentAqi <= 50
      ? { label: 'Mask Defense', status: 'Not Needed', desc: 'Clean ambient breathing' }
      : currentAqi <= 100
        ? { label: 'Mask Defense', status: 'Optional', desc: 'Optional for sensitive groups' }
        : currentAqi <= 150
          ? { label: 'Mask Defense', status: 'Advisory', desc: 'Recommended for respiratory risks' }
          : {
              label: 'Mask Defense',
              status: 'N95 Required',
              desc: 'Wear certified N95 / FFP2 mask'
            };

  const ventilationAdvice =
    currentAqi <= 50
      ? { label: 'Ventilation', status: 'Open Windows', desc: 'Safe fresh air exchange' }
      : currentAqi <= 100
        ? { label: 'Ventilation', status: 'Safe Window', desc: 'Ventilate during midday hours' }
        : currentAqi <= 150
          ? { label: 'Ventilation', status: 'Timed Window', desc: 'Open windows only 13:00–15:00' }
          : { label: 'Ventilation', status: 'Keep Sealed', desc: 'Seal windows & run HEPA filter' };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
      <div className="p-3 rounded-2xl bg-[var(--color-bg-base)] border border-[var(--color-border)] flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
          <Activity className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] block">
            {exerciseAdvice.label}
          </span>
          <span className="text-xs font-bold text-[var(--color-text-primary)] block truncate">
            {exerciseAdvice.status}
          </span>
          <span className="text-[11px] text-[var(--color-text-secondary)] block truncate">
            {exerciseAdvice.desc}
          </span>
        </div>
      </div>

      <div className="p-3 rounded-2xl bg-[var(--color-bg-base)] border border-[var(--color-border)] flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] block">
            {maskAdvice.label}
          </span>
          <span className="text-xs font-bold text-[var(--color-text-primary)] block truncate">
            {maskAdvice.status}
          </span>
          <span className="text-[11px] text-[var(--color-text-secondary)] block truncate">
            {maskAdvice.desc}
          </span>
        </div>
      </div>

      <div className="p-3 rounded-2xl bg-[var(--color-bg-base)] border border-[var(--color-border)] flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <Wind className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] block">
            {ventilationAdvice.label}
          </span>
          <span className="text-xs font-bold text-[var(--color-text-primary)] block truncate">
            {ventilationAdvice.status}
          </span>
          <span className="text-[11px] text-[var(--color-text-secondary)] block truncate">
            {ventilationAdvice.desc}
          </span>
        </div>
      </div>
    </div>
  );
};
