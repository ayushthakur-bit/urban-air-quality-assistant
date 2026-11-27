import React from 'react';

interface HealthAdviceCardProps {
  image: string;
  alt: string;
  title: string;
  badgeText: string;
  badgeClass?: string;
  advice: string;
  icon: React.ReactNode;
}

/**
 * Reusable image card for individual core health recommendations.
 */
export const HealthAdviceCard: React.FC<HealthAdviceCardProps> = ({
  image,
  alt,
  title,
  badgeText,
  badgeClass = 'bg-[var(--color-bg-base)] text-[var(--color-text-primary)] border border-[var(--color-border)]',
  advice,
  icon
}) => {
  return (
    <div className="clean-card overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
      <div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B0F14]">
          <img
            src={image}
            alt={alt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute top-3 left-3">{icon}</div>
          <div className="absolute bottom-2.5 left-3 right-3">
            <span className="text-white font-bold text-sm drop-shadow-md image-text-overlay">{title}</span>
          </div>
        </div>

        <div className="p-5">
          <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 shadow-sm ${badgeClass}`}>
            {badgeText}
          </span>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{advice}</p>
        </div>
      </div>
    </div>
  );
};
