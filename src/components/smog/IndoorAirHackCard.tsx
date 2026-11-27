import React from 'react';
import { Flame, Sparkles } from 'lucide-react';
import { IndoorAirHack } from '../../types';

interface IndoorAirHacksSectionProps {
  hacks: IndoorAirHack[];
}

/** Section displaying DIY Corsi-Rosenthal filtration and sealing hacks. */
export const IndoorAirHacksSection: React.FC<IndoorAirHacksSectionProps> = ({ hacks }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Flame className="w-4 h-4 text-amber-500" />
        <h3 className="font-bold text-sm text-[var(--color-text-primary)] uppercase tracking-wide">
          Indoor Air Quality Hacks & DIY Filtration
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hacks.map((hack, idx) => (
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
  );
};
