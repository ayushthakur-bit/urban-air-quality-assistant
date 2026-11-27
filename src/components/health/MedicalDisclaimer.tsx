import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Prominent medical disclaimer banner clarifying that guidance is general information.
 */
export const MedicalDisclaimer: React.FC = () => {
  return (
    <div
      className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-3 shadow-sm"
      role="note"
      aria-label="Medical Disclaimer"
    >
      <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
      <div className="leading-relaxed">
        <span className="font-bold block mb-0.5 text-amber-950 dark:text-amber-100">
          Medical & Clinical Health Disclaimer
        </span>
        Health recommendations and air quality precautions provided by UrbanAir are for general informational, educational, and preventive awareness only. They do not constitute certified medical diagnosis, individualized clinical advice, or treatment plans. Individuals with chronic cardiopulmonary disorders, asthma, pregnancy, or acute symptoms must consult their licensed physician or emergency medical provider.
      </div>
    </div>
  );
};
