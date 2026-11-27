import React from 'react';
import { Car, Factory, Flame, HardHat, AlertTriangle } from 'lucide-react';
import { CauseCard, CauseItem } from './causes/CauseCard';

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
        {CAUSES.map((item) => (
          <CauseCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};
