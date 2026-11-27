import React from 'react';
import { HeartPulse, Baby, UserCheck, Stethoscope, Dumbbell } from 'lucide-react';

interface SensitiveGroupsMatrixProps {
  isHighSmog: boolean;
}

/**
 * Matrix displaying tailored protection guidance for sensitive sub-populations:
 * Children & Infants, Older Adults, Asthma & COPD, and Athletes.
 */
export const SensitiveGroupsMatrix: React.FC<SensitiveGroupsMatrixProps> = ({ isHighSmog }) => {
  return (
    <div className="clean-card p-6 sm:p-8 mb-8 border border-[var(--color-border)] bg-[var(--color-bg-surface)]">
      <div className="flex items-center gap-2 mb-6">
        <HeartPulse className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
          Tailored Guidelines by Vulnerable Group
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Children */}
        <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-base)]">
          <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400">
            <Baby className="w-4 h-4" />
            <span className="font-bold text-sm">Children & Infants</span>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
            {isHighSmog
              ? 'Children inhale 50% more air per pound of body weight. Keep play sessions indoors with active filtration.'
              : 'Safe for playground visits, sports, and outdoor physical recreation.'}
          </p>
        </div>

        {/* Older Adults */}
        <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-base)]">
          <div className="flex items-center gap-2 mb-2 text-amber-600 dark:text-amber-400">
            <UserCheck className="w-4 h-4" />
            <span className="font-bold text-sm">Older Adults (65+)</span>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
            {isHighSmog
              ? 'Elevated particle levels increase cardiovascular strain. Postpone morning outdoor walks until afternoon.'
              : 'Great conditions for garden walks and light outdoor mobility activities.'}
          </p>
        </div>

        {/* Asthma */}
        <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-base)]">
          <div className="flex items-center gap-2 mb-2 text-rose-600 dark:text-rose-400">
            <Stethoscope className="w-4 h-4" />
            <span className="font-bold text-sm">Asthma & COPD</span>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
            {isHighSmog
              ? 'High bronchoconstriction trigger risk. Keep prescribed fast-acting rescue inhalers accessible at all times.'
              : 'Normal baseline respiratory risk. Carry preventative medication as normally advised.'}
          </p>
        </div>

        {/* Athletes */}
        <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-base)]">
          <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400">
            <Dumbbell className="w-4 h-4" />
            <span className="font-bold text-sm">Athletes & Runners</span>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
            {isHighSmog
              ? 'Deep mouth breathing bypasses nasal filters, pulling soot deep into alveoli. Shift workouts indoors.'
              : 'Optimal atmospheric conditions for long-distance runs and high-intensity interval training.'}
          </p>
        </div>
      </div>
    </div>
  );
};
