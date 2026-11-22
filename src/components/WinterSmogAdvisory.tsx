import React, { useState } from 'react';
import { 
  AlertTriangle, Clock, Wind, ShieldAlert, Sparkles, 
  CheckCircle2, ChevronDown, ChevronUp, Layers, Flame
} from 'lucide-react';
import { CityAirData } from '../types';

interface WinterSmogAdvisoryProps {
  city: CityAirData;
  onOpenAI: () => void;
}

export const WinterSmogAdvisory: React.FC<WinterSmogAdvisoryProps> = ({
  city,
  onOpenAI,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Determine if inversion advisory is applicable
  const hasInversion = city.inversionAdvisory?.isActive || city.currentAqi > 200;

  if (!hasInversion) {
    return null;
  }

  const advisory = city.inversionAdvisory || {
    isActive: true,
    status: 'High Particulate Stagnation Alert',
    locationDetails: `${city.name} Air Basin`,
    smogCeilingTrappedUntil: '10:30 AM',
    ventilationBreakupWindow: '13:00 - 15:00 (Breakup Window)',
    alertMessage: `Ground-level temperature inversion active in ${city.name} NCR. Smog ceiling trapped until 10:30 AM. Safe ventilation window opens at 13:00 - 15:00 (Breakup Window).`,
    lowEmissionRoutines: [
      {
        title: 'Shift Morning Commute & Anti-Idling',
        timing: 'Before 09:00 AM or after 11:00 AM',
        impact: 'Reduces personal particulate inhalation by up to 48% and cuts idling vehicle emissions.',
        category: 'Transit'
      },
      {
        title: 'Postpone High-Heat Indoor Searing & Frying',
        timing: 'Hold until 13:00 PM Breakup Window',
        impact: 'Prevents compounding indoor PM2.5 spikes while windows remain sealed.',
        category: 'Home'
      },
      {
        title: 'Window Aeration Breakup Window',
        timing: '13:00 – 15:00 PM',
        impact: 'Capitalizes on solar thermal lift to purge stale air without drawing morning soot ceiling.',
        category: 'Ventilation'
      }
    ],
    indoorHacks: [
      {
        title: 'Dual-Layer HEPA + Activated Carbon Airlock',
        description: 'Position purifier centrally in master bedroom with door threshold silicone sweeps installed.',
        impact: 'Lowers indoor PM2.5 from 325 µg/m³ to under 20 µg/m³ (94% exposure reduction).'
      },
      {
        title: 'DIY Corsi-Rosenthal Box ($35–$45)',
        description: 'Four MERV-13 furnace filters taped to a standard 20" box fan generates 450+ CFM clean air delivery.',
        impact: 'Achieves 5 air changes per hour (ACH) at a fraction of commercial purifier costs.'
      }
    ]
  };

  return (
    <section 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2"
      aria-label="Winter Smog and Ground-Level Temperature Inversion Advisory"
    >
      <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-[var(--color-bg-surface)] to-purple-500/10 shadow-lg overflow-hidden transition-all duration-300">
        {/* Banner Top Strip */}
        <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] bg-amber-500/10 dark:bg-amber-500/15">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-black flex items-center justify-center flex-shrink-0 shadow-md">
              <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                  Severe Winter Smog Telemetry
                </span>
                <span className="text-xs text-[var(--color-text-secondary)] font-medium">
                  {city.name} NCR
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)] mt-1 tracking-tight">
                {advisory.alertMessage}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onOpenAI}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label="Ask AeroBot AI about this thermal inversion"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Ask AeroBot AI</span>
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-expanded={isExpanded}
              aria-label={isExpanded ? 'Collapse advisory details' : 'Expand advisory details'}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expandable Advisory Details */}
        {isExpanded && (
          <div className="p-5 sm:p-6 space-y-6 animate-fadeIn">
            {/* Telemetry Metric Cards */}
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
                    Stagnant ({city.weather.windSpeed} km/h wind)
                  </span>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                    Humidity {city.weather.humidity}% binds hygroscopic PM2.5 into toxic secondary aerosols.
                  </p>
                </div>
              </div>
            </div>

            {/* Low-Emission Daily Routines & Direct Impact */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-bold text-sm text-[var(--color-text-primary)] uppercase tracking-wide">
                  Low-Emission Daily Routines & Direct Impact
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {advisory.lowEmissionRoutines.map((routine, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-base)] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                          {routine.category}
                        </span>
                        <span className="text-xs text-[var(--color-text-secondary)] font-medium">
                          {routine.timing}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm text-[var(--color-text-primary)] mb-1">
                        {routine.title}
                      </h4>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-[var(--color-border)] text-xs text-emerald-700 dark:text-emerald-400 font-medium flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{routine.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indoor Air Hacks */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-sm text-[var(--color-text-primary)] uppercase tracking-wide">
                  Indoor Air Quality Hacks & DIY Filtration
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {advisory.indoorHacks.map((hack, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-base)] flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="font-semibold text-sm text-[var(--color-text-primary)] mb-1">
                        {hack.title}
                      </h4>
                      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                        {hack.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-[var(--color-border)] text-xs text-blue-700 dark:text-blue-300 font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-blue-500" />
                      <span>Direct Impact: {hack.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
