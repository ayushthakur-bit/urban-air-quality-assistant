import React from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';
import { LowEmissionRoutine } from '../../types';

interface LowEmissionRoutinesSectionProps {
  routines: LowEmissionRoutine[];
}

/** Section rendering quantified low-emission community action cards. */
export const LowEmissionRoutinesSection: React.FC<LowEmissionRoutinesSectionProps> = ({
  routines
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <h3 className="font-bold text-sm text-[var(--color-text-primary)] uppercase tracking-wide">
          Low-Emission Daily Routines & Direct Impact
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {routines.map((routine, idx) => (
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
  );
};
