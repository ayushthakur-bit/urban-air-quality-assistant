import React, { useState } from 'react';
import { AlertTriangle, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { CityAirData } from '../types';
import { InversionMetricCards } from './smog/InversionMetricCards';
import { LowEmissionRoutinesSection } from './smog/LowEmissionRoutineCard';
import { IndoorAirHacksSection } from './smog/IndoorAirHackCard';

interface WinterSmogAdvisoryProps {
  city: CityAirData;
  onOpenAI: () => void;
}

/**
 * Winter Smog and Ground-Level Temperature Inversion Advisory component.
 */
export const WinterSmogAdvisory: React.FC<WinterSmogAdvisoryProps> = ({ city, onOpenAI }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const hasInversion = city.inversionAdvisory?.isActive || city.currentAqi > 200;
  if (!hasInversion) return null;

  const advisory = city.inversionAdvisory || {
    isActive: true,
    status: 'High Particulate Stagnation Alert',
    locationDetails: `${city.name} Air Basin`,
    smogCeilingTrappedUntil: '10:30 AM',
    ventilationBreakupWindow: '13:00 - 15:00 (Breakup Window)',
    alertMessage: `Ground-level temperature inversion active in ${city.name} NCR. Smog ceiling trapped until 10:30 AM. Safe ventilation window opens at 13:00 - 15:00 (Breakup Window).`,
    lowEmissionRoutines: [
      { title: 'Shift Morning Commute & Anti-Idling', timing: 'Before 09:00 AM or after 11:00 AM', impact: 'Reduces personal particulate inhalation by up to 48% and cuts idling emissions.', category: 'Transit' as const },
      { title: 'Postpone High-Heat Indoor Searing & Frying', timing: 'Hold until 13:00 PM Breakup Window', impact: 'Prevents compounding indoor PM2.5 spikes while windows remain sealed.', category: 'Home' as const },
      { title: 'Window Aeration Breakup Window', timing: '13:00 – 15:00 PM', impact: 'Solar thermal lift breaks inversion lid, allowing safe air exchange.', category: 'Ventilation' as const }
    ],
    indoorHacks: [
      { title: 'Dual-Layer HEPA + Activated Carbon Airlock', description: 'Position purifier centrally in bedroom with door threshold silicone sweeps installed.', impact: 'Lowers indoor PM2.5 from 325 µg/m³ to under 20 µg/m³ (94% exposure reduction).' },
      { title: 'DIY Corsi-Rosenthal Box ($35–$45)', description: 'Four MERV-13 filters taped to a standard 20" box fan generates 450+ CFM clean air delivery.', impact: 'Achieves 5 air changes per hour (ACH) at a fraction of commercial costs.' }
    ]
  };

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2"
      aria-label="Winter Smog and Ground-Level Temperature Inversion Advisory"
    >
      <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-[var(--color-bg-surface)] to-purple-500/10 shadow-lg overflow-hidden transition-all duration-300">
        {/* Banner Strip */}
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
                <span className="text-xs text-[var(--color-text-secondary)] font-medium">{city.name} NCR</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)] mt-1 tracking-tight">
                {advisory.alertMessage}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onOpenAI}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md transition-transform hover:scale-105"
              aria-label="Ask AeroBot AI about this thermal inversion"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Ask AeroBot AI</span>
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-expanded={isExpanded}
              aria-label={isExpanded ? 'Collapse advisory details' : 'Expand advisory details'}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expandable Content */}
        {isExpanded && (
          <div className="p-5 sm:p-6 space-y-6 animate-fadeIn">
            <InversionMetricCards advisory={advisory} weather={city.weather} />
            <LowEmissionRoutinesSection routines={advisory.lowEmissionRoutines} />
            <IndoorAirHacksSection hacks={advisory.indoorHacks} />
          </div>
        )}
      </div>
    </section>
  );
};
