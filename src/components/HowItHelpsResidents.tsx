import React from 'react';
import { ShieldCheck, Compass, Users, Wind, Sparkles } from 'lucide-react';

interface HowItHelpsResidentsProps {
  onOpenAI?: () => void;
}

/**
 * Dedicated feature section explaining how UrbanAir provides practical,
 * everyday utility for urban families and residents facing city air pollution.
 */
export const HowItHelpsResidents: React.FC<HowItHelpsResidentsProps> = ({ onOpenAI }) => {
  const residentBenefits = [
    {
      icon: <Compass className="w-5 h-5 text-blue-500" />,
      title: 'Actionable Timing for Commutes & Workouts',
      description:
        'Know the optimal hours for morning school dropoffs, cycling, or outdoor jogs before breathing toxic street-level soot plumes.'
    },
    {
      icon: <Users className="w-5 h-5 text-purple-500" />,
      title: 'Personalized Protection for Sensitive Groups',
      description:
        'Custom risk warnings for asthmatics, infants, and seniors, translating raw pollutant numbers into clear precautions.'
    },
    {
      icon: <Wind className="w-5 h-5 text-emerald-500" />,
      title: 'Inversion Breakup Ventilation Windows',
      description:
        'Science-backed scheduling to safely flush stale indoor air during the 13:00–15:00 breakup window without letting morning smog inside.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-amber-500" />,
      title: 'Affordable DIY Indoor Aerosol Defense',
      description:
        'Step-by-step guides for $35 Corsi-Rosenthal purifiers and room sealing hacks that achieve 90%+ PM2.5 reduction at a fraction of commercial costs.'
    }
  ];

  return (
    <section
      id="how-it-helps"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24"
      aria-label="How This Assistant Helps City Residents"
    >
      <div className="clean-card p-6 sm:p-8 md:p-10 border border-[var(--color-border)] bg-[var(--color-bg-surface)]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[var(--color-border)]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Resident Utility & Health</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight">
              How UrbanAir Helps City Residents
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
              We translate complex atmospheric aerosol science into actionable daily decisions so
              families can protect their lungs without disrupting their lives.
            </p>
          </div>

          {onOpenAI && (
            <button
              onClick={onOpenAI}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all shrink-0 self-start sm:self-auto focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Open AeroBot AI Assistant for personalized resident guidance"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Ask AeroBot AI</span>
            </button>
          )}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {residentBenefits.map((benefit, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-base)] flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] flex items-center justify-center mb-4 shadow-sm">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-base text-[var(--color-text-primary)] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
