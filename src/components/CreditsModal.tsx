import React from 'react';
import { X, Image as ImageIcon, ShieldCheck } from 'lucide-react';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CREDITS_DATA = [
  {
    section: 'Hero Banner',
    filename: 'hero-smog-skyline.webp',
    photographer: 'SmartCity / Pixabay Contributors',
    source: 'SmartCity / Pixabay Royalty-Free',
    alt: 'Dense air pollution and winter smog enveloping urban city skyline at sunrise'
  },
  {
    section: 'Pollutant Cards',
    filename: 'pollutant-pm25.webp',
    photographer: 'Patrick Hendry',
    source: 'Unsplash (Free License)',
    alt: 'Fine particulate matter PM2.5 haze scattering sunlight in urban atmosphere'
  },
  {
    section: 'Pollutant Cards',
    filename: 'pollutant-pm10.webp',
    photographer: 'Ricardo Gomez Angel',
    source: 'Unsplash (Free License)',
    alt: 'Coarse particulate dust PM10 from urban road surfaces and excavation'
  },
  {
    section: 'Pollutant Cards',
    filename: 'pollutant-no2.webp',
    photographer: 'Denys Nevozhai',
    source: 'Unsplash (Free License)',
    alt: 'Dense city highway traffic generating nitrogen dioxide (NO2) tailpipe emissions'
  },
  {
    section: 'Pollutant Cards',
    filename: 'pollutant-so2.webp',
    photographer: 'Marten Bjork',
    source: 'Unsplash (Free License)',
    alt: 'Industrial smokestacks emitting sulfur dioxide (SO2) into the sky'
  },
  {
    section: 'Pollutant Cards',
    filename: 'pollutant-co.webp',
    photographer: 'Nuno Alberto',
    source: 'Unsplash (Free License)',
    alt: 'Heavy urban vehicle congestion producing toxic carbon monoxide (CO) gas'
  },
  {
    section: 'Pollutant Cards',
    filename: 'pollutant-o3.webp',
    photographer: 'Aleksandar Pasaric',
    source: 'Unsplash (Free License)',
    alt: 'Photochemical summer smog creating ground-level ozone (O3) over city towers'
  },
  {
    section: 'Causes of Pollution',
    filename: 'cause-traffic.webp',
    photographer: 'Denys Nevozhai',
    source: 'Unsplash (Free License)',
    alt: 'Urban rush hour bumper-to-bumper vehicle traffic emitting tailpipe fumes'
  },
  {
    section: 'Causes of Pollution',
    filename: 'cause-industry.webp',
    photographer: 'Ella Ivanescu',
    source: 'Unsplash (Free License)',
    alt: 'Heavy industrial manufacturing plant discharging particulate emissions and gases'
  },
  {
    section: 'Causes of Pollution',
    filename: 'cause-burning.webp',
    photographer: 'Tomasz Krawczyk',
    source: 'Unsplash (Free License)',
    alt: 'Agricultural stubble burning and open biomass waste combustion causing smoke plume'
  },
  {
    section: 'Causes of Pollution',
    filename: 'cause-construction.webp',
    photographer: 'Scott Blake',
    source: 'Unsplash (Free License)',
    alt: 'Major urban construction site machinery generating airborne fugitive dust'
  },
  {
    section: 'Health Tips',
    filename: 'tip-masks.webp',
    photographer: 'Mika Baumeister',
    source: 'Unsplash (Free License)',
    alt: 'Certified N95 / FFP2 particulate respirator mask for outdoor pollution defense'
  },
  {
    section: 'Health Tips',
    filename: 'tip-indoor-air.webp',
    photographer: 'Huy Nguyen',
    source: 'Unsplash (Free License)',
    alt: 'Modern residential living space with active HEPA air filtration and indoor purifying plants'
  },
  {
    section: 'Health Tips',
    filename: 'tip-exercise.webp',
    photographer: 'Jenny Hill',
    source: 'Unsplash (Free License)',
    alt: 'Person jogging safely outdoors in a fresh green park during low AQI periods'
  },
  {
    section: 'Health Tips',
    filename: 'tip-sensitive-groups.webp',
    photographer: 'CDC / Unsplash',
    source: 'Unsplash (Free License)',
    alt: 'Vulnerable populations including children and elderly walking in clean environment'
  },
  {
    section: 'AQI Levels',
    filename: 'aqi-good.webp',
    photographer: 'Pedro Lastra',
    source: 'Unsplash (Free License)',
    alt: 'Crisp clear blue sky over an urban cityscape indicating Good air quality (AQI 0-50)'
  },
  {
    section: 'AQI Levels',
    filename: 'aqi-moderate.webp',
    photographer: 'Benjamin Davies',
    source: 'Unsplash (Free License)',
    alt: 'Mild atmospheric haze across urban skyline indicating Moderate air quality (AQI 51-100)'
  },
  {
    section: 'AQI Levels',
    filename: 'aqi-unhealthy.webp',
    photographer: 'Patrick Hendry',
    source: 'Unsplash (Free License)',
    alt: 'Thick smog obscuring downtown buildings during Unhealthy air conditions (AQI 151-200)'
  },
  {
    section: 'AQI Levels',
    filename: 'aqi-hazardous.webp',
    photographer: 'Aleksandar Pasaric',
    source: 'Pexels / Unsplash',
    alt: 'Severe hazardous winter smog and dark red haze blanketing city (AQI 301+)'
  },
  {
    section: 'City Cards',
    filename: 'city-delhi.webp',
    photographer: 'Sylwia Bartyzel',
    source: 'Unsplash (Free License)',
    alt: 'Delhi skyline and India Gate monument in winter atmospheric conditions'
  },
  {
    section: 'City Cards',
    filename: 'city-newyork.webp',
    photographer: 'Alexander Rotker',
    source: 'Unsplash (Free License)',
    alt: 'New York City Manhattan skyscrapers and skyline'
  },
  {
    section: 'City Cards',
    filename: 'city-london.webp',
    photographer: 'Benjamin Davies',
    source: 'Unsplash (Free License)',
    alt: 'London skyline showing Tower Bridge and the River Thames'
  },
  {
    section: 'City Cards',
    filename: 'city-losangeles.webp',
    photographer: 'Sterling Davis',
    source: 'Unsplash (Free License)',
    alt: 'Downtown Los Angeles skyscrapers with palm trees and freeway'
  },
  {
    section: 'City Cards',
    filename: 'city-tokyo.webp',
    photographer: 'Su San Lee',
    source: 'Unsplash (Free License)',
    alt: 'Tokyo skyline featuring Tokyo Tower and vibrant metropolis panorama'
  },
  {
    section: 'City Cards',
    filename: 'city-paris.webp',
    photographer: 'Anthony DELANOIX',
    source: 'Unsplash (Free License)',
    alt: 'Paris skyline featuring the iconic Eiffel Tower and Seine river basin'
  },
  {
    section: 'City Cards',
    filename: 'city-mumbai.webp',
    photographer: 'Aditya Chache',
    source: 'Unsplash (Free License)',
    alt: 'Mumbai coastal skyline and Bandra-Worli Sea Link crossing the bay'
  },
  {
    section: 'City Cards',
    filename: 'city-surat.webp',
    photographer: 'Bhargav Joshi',
    source: 'Unsplash (Free License)',
    alt: 'Surat city Tapi riverfront and modern urban architecture'
  },
  {
    section: 'City Cards',
    filename: 'city-ahmedabad.webp',
    photographer: 'Dharmesh Patel',
    source: 'Unsplash (Free License)',
    alt: 'Ahmedabad Sabarmati Riverfront skyline and promenade'
  }
];

export const CreditsModal: React.FC<CreditsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="credits-title"
    >
      <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-3xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden text-[var(--color-text-primary)]">
        {/* Header */}
        <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 id="credits-title" className="text-xl font-bold text-[var(--color-text-primary)]">
                Image Credits & Attribution
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)]">
                All assets are converted to WebP and licensed under royalty-free Unsplash and
                Pixabay terms.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-base)] transition-colors"
            aria-label="Close image credits dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Table Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-200">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>
              Self-contained offline assets saved locally in <code>/public/assets/images</code> with
              fixed aspect ratios and zero third-party hotlinking.
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--color-bg-base)] text-[var(--color-text-secondary)] font-bold border-b border-[var(--color-border)]">
                <tr>
                  <th className="py-3 px-4">Section</th>
                  <th className="py-3 px-4">Image Filename</th>
                  <th className="py-3 px-4">Photographer / Source</th>
                  <th className="py-3 px-4">License</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)] text-[var(--color-text-primary)]">
                {CREDITS_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[var(--color-bg-base)]/60 transition-colors">
                    <td className="py-2.5 px-4 font-semibold text-[var(--color-text-primary)]">
                      {row.section}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-xs text-[#2563eb] dark:text-[#60a5fa]">
                      {row.filename}
                    </td>
                    <td className="py-2.5 px-4 text-[var(--color-text-secondary)]">
                      {row.photographer}
                    </td>
                    <td className="py-2.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                      {row.source}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--color-border)] flex justify-end bg-[var(--color-bg-surface)]">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#2563eb] text-white font-bold text-xs hover:bg-[#1d4ed8] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
