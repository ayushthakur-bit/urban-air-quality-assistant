import React from 'react';
import { CityAirData } from '../types';
import { CITIES_DATABASE } from '../data/cities';
import { getAQIBadgeClasses } from '../constants/aqi';
import { MapPin, ArrowUpRight, CloudSun } from 'lucide-react';

interface CityCardsProps {
  currentCityId: string;
  onSelectCity: (city: CityAirData) => void;
}

export const CityCards: React.FC<CityCardsProps> = ({ currentCityId, onSelectCity }) => {
  return (
    <section
      id="cities"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 scroll-mt-24"
      aria-label="Monitored City Skylines and Real-Time AQI"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3b82f6]/10 text-[#2563eb] dark:text-[#60a5fa] text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#3b82f6]" />
            Global & Regional Stations
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight">
            Monitored City Skylines
          </h2>
          <p className="text-base text-[var(--color-text-secondary)] mt-1">
            Click any city to switch real-time atmospheric telemetry and health advisories.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {CITIES_DATABASE.map((city) => {
          const isSelected = city.id === currentCityId;

          return (
            <button
              key={city.id}
              type="button"
              onClick={() => {
                onSelectCity(city);
                const aqiSection = document.getElementById('live-aqi');
                if (aqiSection) {
                  aqiSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`clean-card overflow-hidden text-left group transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-[#3b82f6] ${
                isSelected
                  ? 'ring-2 ring-[#3b82f6] shadow-xl'
                  : 'hover:-translate-y-1 hover:shadow-lg'
              }`}
              aria-label={`Select ${city.name}, current AQI ${city.currentAqi} ${city.category}`}
            >
              {/* Skyline Photo with Fixed Aspect Ratio & Dark Gradient Overlay */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B0F14]">
                <img
                  src={city.image || '/assets/images/hero-smog-skyline.webp'}
                  alt={`${city.name} skyline under atmospheric urban conditions`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark gradient overlay so text remains 100% legible */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                {/* Country / Region Tag on Top Left */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md border border-white/20 image-text-overlay">
                    {city.country}
                  </span>
                </div>

                {/* AQI Badge on Top Right */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold shadow-lg backdrop-blur-md flex items-center gap-1.5 ${getAQIBadgeClasses(city.category)}`}
                  >
                    <span>AQI</span>
                    <span className="text-sm">{city.currentAqi}</span>
                  </span>
                </div>

                {/* City Name & Condition over Bottom of Image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl drop-shadow-md tracking-tight image-text-overlay">
                      {city.name}
                    </h3>
                    <p className="text-white/90 text-xs font-medium drop-shadow-sm flex items-center gap-1 image-text-overlay">
                      <CloudSun className="w-3.5 h-3.5" />
                      {city.weather.temp}°C · {city.weather.condition}
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#3b82f6] transition-colors">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="p-4 flex items-center justify-between bg-[var(--color-bg-surface)]">
                <div>
                  <span className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider block">
                    Category
                  </span>
                  <span className="text-sm font-bold text-[var(--color-text-primary)]">
                    {city.category}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider block">
                    Dominant
                  </span>
                  <span className="text-sm font-mono font-bold text-[var(--color-text-primary)]">
                    PM2.5: {city.pollutants.pm25.value} µg/m³
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
