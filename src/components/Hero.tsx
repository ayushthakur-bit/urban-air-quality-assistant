import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Loader2, X, Navigation } from 'lucide-react';
import { CityAirData } from '../types';
import { CITIES_DATABASE } from '../data/mockData';
import { sanitizeInput } from '../utils/security';

interface HeroProps {
  currentCity: CityAirData;
  onSelectCity: (city: CityAirData) => void;
  onLocateUser: () => void;
  isLocating: boolean;
  onSearchCustom: (query: string) => void;
  errorMessage?: string | null;
}

export const Hero: React.FC<HeroProps> = ({
  currentCity,
  onSelectCity,
  onLocateUser,
  isLocating,
  onSearchCustom,
  errorMessage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter autocomplete suggestions from database
  const suggestions = searchQuery.trim()
    ? CITIES_DATABASE.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.stateOrRegion.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setSuggestionsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = sanitizeInput(searchQuery, 50);
    if (!cleanQuery) return;

    const matched = CITIES_DATABASE.find(
      c => c.name.toLowerCase() === cleanQuery.toLowerCase()
    );
    if (matched) {
      onSelectCity(matched);
      setSearchQuery('');
      setSuggestionsOpen(false);
    } else {
      onSearchCustom(cleanQuery);
      setSuggestionsOpen(false);
    }
  };

  const handleSelectSuggestion = (city: CityAirData) => {
    onSelectCity(city);
    setSearchQuery('');
    setSuggestionsOpen(false);
  };

  return (
    <section 
      id="home" 
      className="relative pt-10 pb-8 md:pt-16 md:pb-12 text-center overflow-hidden"
      aria-label="Air Quality City Search & Introduction"
    >
      {/* Atmospheric Hero Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <img
          src="/assets/images/hero-smog-skyline.webp"
          alt="Dense air pollution and winter smog enveloping urban city skyline at sunrise"
          loading="lazy"
          className="w-full h-full object-cover opacity-15 dark:opacity-20 transition-opacity duration-700 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-base)]/80 via-[var(--color-bg-base)]/92 to-[var(--color-bg-base)]" />
      </div>

      {/* Subtle Floating Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div 
          className="particle-dot w-48 h-48 bg-[#3b82f6]/10 blur-3xl -top-10 -left-10" 
          style={{ animationDuration: '10s' }}
        />
        <div 
          className="particle-dot w-64 h-64 bg-[#60a5fa]/10 blur-3xl top-20 right-10" 
          style={{ animationDuration: '12s' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] leading-tight">
          Breathe Informed,{' '}
          <span className="bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#10b981] dark:from-[#60a5fa] dark:via-[#93c5fd] dark:to-[#34d399] bg-clip-text text-transparent">
            Live Healthier
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[var(--color-text-secondary)] max-w-[65ch] mx-auto font-normal leading-relaxed">
          Real-time urban air quality telemetry, pollutant breakdowns, and tailored health guidance for your city.
        </p>

        {/* Search Bar + Use My Location Button */}
        <div className="mt-8 max-w-2xl mx-auto">
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-3 relative"
            role="search"
          >
            {/* Input with Search Icon */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--color-placeholder)]">
                <Search className="w-5 h-5" aria-hidden="true" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSuggestionsOpen(true);
                }}
                onFocus={() => setSuggestionsOpen(true)}
                placeholder="Search city (e.g. New York, London, Tokyo, Delhi)..."
                aria-label="Search city for real-time air quality"
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-placeholder)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent text-base transition-all min-h-[48px]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search input"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Suggestions Dropdown */}
              {suggestionsOpen && suggestions.length > 0 && (
                <div 
                  ref={dropdownRef}
                  className="absolute left-0 right-0 mt-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl z-30 overflow-hidden text-left max-h-64 overflow-y-auto animate-fadeIn"
                >
                  {suggestions.map((city) => (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => handleSelectSuggestion(city)}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-[var(--color-bg-base)] transition-colors text-left border-b border-[var(--color-border)] last:border-0 min-h-[44px]"
                    >
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-[#3b82f6] shrink-0" />
                        <div>
                          <span className="font-bold text-[var(--color-text-primary)] text-sm block">
                            {city.name}
                          </span>
                          <span className="text-xs text-[var(--color-text-secondary)]">
                            {city.stateOrRegion}, {city.country}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[var(--color-text-primary)]">
                          AQI {city.currentAqi}
                        </span>
                        <span 
                          className="w-2.5 h-2.5 rounded-full" 
                          style={{
                            backgroundColor: city.currentAqi <= 50 ? '#10b981' :
                                            city.currentAqi <= 100 ? '#f59e0b' :
                                            city.currentAqi <= 150 ? '#ea580c' :
                                            city.currentAqi <= 200 ? '#dc2626' :
                                            city.currentAqi <= 300 ? '#7c3aed' : '#7f1d1d'
                          }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* "Use my location" GPS Button */}
            <button
              type="button"
              onClick={onLocateUser}
              disabled={isLocating}
              aria-label="Detect air quality at my current location"
              className="px-5 py-3.5 rounded-2xl bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-base)] text-[var(--color-text-primary)] font-bold text-base border border-[var(--color-border)] hover:border-[#3b82f6] flex items-center justify-center gap-2 transition-all shrink-0 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            >
              {isLocating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-[#3b82f6]" />
                  <span>Locating...</span>
                </>
              ) : (
                <>
                  <Navigation className="w-5 h-5 text-[#3b82f6]" />
                  <span>Use My Location</span>
                </>
              )}
            </button>
          </form>

          {/* Quick city pill chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-[var(--color-text-secondary)] font-medium mr-1">Popular:</span>
            {CITIES_DATABASE.slice(0, 5).map((city) => (
              <button
                key={city.id}
                type="button"
                onClick={() => onSelectCity(city)}
                className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-all min-h-[36px] ${
                  currentCity.id === city.id
                    ? 'bg-[#3b82f6] text-white border-[#3b82f6] shadow-sm'
                    : 'bg-[var(--color-bg-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[#3b82f6]'
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>

          {/* Error Message if city not found */}
          {errorMessage && (
            <div className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/40 text-rose-700 dark:text-rose-300 text-sm font-medium animate-fadeIn">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
