import React from 'react';
import { ShieldAlert, Wind, Clock } from 'lucide-react';
import { InversionAdvisory, CityAirData } from '../../types';

interface InversionMetricCardsProps {
  advisory: InversionAdvisory;
  weather: CityAirData['weather'];
}

/** 3 Metric cards for morning smog ceiling, breakup window, and wind dispersion. */
export const InversionMetricCards: React.FC<InversionMetricCardsProps> = ({
  advisory,
  weather
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Ceiling Box */}
      <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-base)] flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-semibold text-[var(--color-text-secondary)] block">
            Morning Smog Ceiling Trap
          </span>
          <span className="text-base font-bold text-red-600 dark:text-red-400">
            Trapped until {advisory.smogCeilingTrappedUntil}
          </span>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">
            Cool ground-level air lid traps vehicle soot and dust within 100m altitude.
          </p>
        </div>
      </div>

      {/* Breakup Window Box */}
      <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-base)] flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
          <Wind className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-semibold text-[var(--color-text-secondary)] block">
            Safe Ventilation Window
          </span>
          <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
            {advisory.ventilationBreakupWindow}
          </span>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">
            Peak solar thermal lift breaks inversion lid; optimal for 15-min air exchange.
          </p>
        </div>
      </div>

      {/* Wind & Dispersion Box */}
      <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-base)] flex items-start gap-3 sm:col-span-2 lg:col-span-1">
        <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-semibold text-[var(--color-text-secondary)] block">
            Atmospheric Dispersion
          </span>
          <span className="text-base font-bold text-[var(--color-text-primary)]">
            Stagnant ({weather.windSpeed} km/h wind)
          </span>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">
            Humidity {weather.humidity}% binds hygroscopic PM2.5 into toxic secondary aerosols.
          </p>
        </div>
      </div>
    </div>
  );
};
