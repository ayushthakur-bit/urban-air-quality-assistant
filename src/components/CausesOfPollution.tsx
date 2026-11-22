import React from 'react';
import { Car, Factory, Flame, HardHat, AlertTriangle } from 'lucide-react';

interface CauseItem {
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

const CAUSES: CauseItem[] = [
  {
    id: 'traffic',
    title: 'Vehicular Traffic & Highway Congestion',
    category: 'Mobile Sources',
    image: '/assets/images/cause-traffic.webp',
    alt: 'Urban rush hour bumper-to-bumper vehicle traffic emitting tailpipe fumes',
    pollutants: ['NO2', 'CO', 'PM2.5'],
    icon: Car,
    description:
      'Internal combustion engines, diesel freight transport, and stop-and-go congestion create massive surges in tailpipe aerosols, trapped close to the ground during low morning inversion layers.',
    mitigation: 'EV transition, rapid transit corridors, odd-even traffic rationing.'
  },
  {
    id: 'industry',
    title: 'Industrial Manufacturing & Energy Plants',
    category: 'Stationary Point Sources',
    image: '/assets/images/cause-industry.webp',
    alt: 'Heavy industrial manufacturing plant discharging particulate emissions and gases',
    pollutants: ['SO2', 'NO2', 'PM10'],
    icon: Factory,
    description:
      'Coal-powered thermal plants, metallurgical smelters, brick kilns, and chemical refineries discharge heavy plumes containing sulfur dioxide and ultrafine metal condensates.',
    mitigation:
      'Flue-gas desulfurization scrubbers, shift to natural gas, continuous emission monitoring.'
  },
  {
    id: 'burning',
    title: 'Biomass & Agricultural Stubble Burning',
    category: 'Aerosol Plumes',
    image: '/assets/images/cause-burning.webp',
    alt: 'Agricultural stubble burning and open biomass waste combustion causing smoke plume',
    pollutants: ['PM2.5', 'CO', 'Black Carbon'],
    icon: Flame,
    description:
      'Post-harvest seasonal crop residue burning combined with municipal solid waste combustion unleashes dense smoke sheets that drift across regional basins.',
    mitigation: 'Happy Seeder machinery, bio-decomposer sprays, biomass pellet power plants.'
  },
  {
    id: 'construction',
    title: 'Urban Construction & Demolition Dust',
    category: 'Fugitive Dust',
    image: '/assets/images/cause-construction.webp',
    alt: 'Major urban construction site machinery generating airborne fugitive dust',
    pollutants: ['PM10', 'Coarse Dust', 'Silica'],
    icon: HardHat,
    description:
      'Uncovered excavation pits, concrete pulverizing, and heavy haulage truck turbulence inject massive coarse particulate matter directly into residential street corridors.',
    mitigation: 'Anti-smog mist water cannons, green dust netting, paved truck washing bays.'
  }
];

export const CausesOfPollution: React.FC = () => {
  return (
    <section
      id="causes"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 scroll-mt-24"
      aria-label="Major Causes of Urban Air Pollution"
    >
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3b82f6]/10 text-[#2563eb] dark:text-[#60a5fa] text-xs font-bold uppercase tracking-wider mb-3">
          <AlertTriangle className="w-3.5 h-3.5 text-[#3b82f6]" />
          Source Analysis
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight">
          Major Causes of Urban Air Pollution
        </h2>
        <p className="text-base text-[var(--color-text-secondary)] mt-2 leading-relaxed">
          The primary anthropogenic and meteorological sources driving dangerous smog events and
          atmospheric degradation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CAUSES.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="clean-card overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Visual Image with Fixed Aspect Ratio & Dark Gradient Overlay */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B0F14]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                  {/* Category Pill Over Image */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-md border border-white/20 image-text-overlay">
                      {item.category}
                    </span>
                  </div>

                  {/* Icon & Title over Bottom of Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-white text-xs sm:text-sm font-bold line-clamp-1 drop-shadow-md image-text-overlay">
                      {item.title}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5">
                  {/* Pollutants Generated Badges */}
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

                  {/* Description */}
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Mitigation / Solution Footer */}
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
        })}
      </div>
    </section>
  );
};
