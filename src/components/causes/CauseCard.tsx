import React from 'react';

export interface CauseItem {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  pollutants: string[];
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  mitigation: string;
}

interface CauseCardProps {
  item: CauseItem;
}

/** Individual pollution source card with visual photo and mitigation action. */
export const CauseCard: React.FC<CauseCardProps> = ({ item }) => {
  const IconComponent = item.icon;

  return (
    <div className="clean-card overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
      <div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B0F14]">
          <img
            src={item.image}
            alt={item.alt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-md border border-white/20 image-text-overlay">
              {item.category}
            </span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
              <IconComponent className="w-4 h-4" />
            </div>
            <span className="text-white text-xs sm:text-sm font-bold line-clamp-1 drop-shadow-md image-text-overlay">
              {item.title}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.pollutants.map((pol) => (
              <span
                key={pol}
                className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-[var(--color-bg-base)] text-[var(--color-text-primary)] border border-[var(--color-border)]"
              >
                {pol}
              </span>
            ))}
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
            {item.description}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 border-t border-[var(--color-border)] bg-[var(--color-bg-surface)]">
        <span className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider block mb-1">
          Primary Control Action
        </span>
        <p className="text-xs sm:text-sm text-[var(--color-text-primary)] font-medium">
          {item.mitigation}
        </p>
      </div>
    </div>
  );
};
