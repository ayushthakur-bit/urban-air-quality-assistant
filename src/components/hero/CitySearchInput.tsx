import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Loader2, X, Navigation } from 'lucide-react';
import { CityAirData } from '../../types';
import { CITIES_DATABASE } from '../../data/cities';
import { validateCitySearchInput } from '../../services/airQualityService';

interface CitySearchInputProps {
  onSelectCity: (city: CityAirData) => void;
  onLocateUser: () => void;
  isLocating: boolean;
  onSearchCustom: (query: string) => void;
  setLocalError: (err: string | null) => void;
}

/** Form search input with autocomplete dropdown and Geolocation trigger. */
export const CitySearchInput: React.FC<CitySearchInputProps> = ({
  onSelectCity,
  onLocateUser,
  isLocating,
  onSearchCustom,
  setLocalError
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const suggestions = searchQuery.trim()
    ? CITIES_DATABASE.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.stateOrRegion.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setSuggestionsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    const validation = validateCitySearchInput(searchQuery);
    if (!validation.isValid) {
      setLocalError(validation.errorMessage || 'Please enter a valid city name.');
      return;
    }
    const matched = CITIES_DATABASE.find(
      (c) => c.name.toLowerCase() === validation.sanitized.toLowerCase()
    );
    if (matched) {
      onSelectCity(matched);
    } else {
      onSearchCustom(validation.sanitized);
    }
    setSearchQuery('');
    setSuggestionsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3 relative" role="search">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--color-placeholder)]">
          <Search className="w-5 h-5" aria-hidden="true" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setSuggestionsOpen(true); }}
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

        {suggestionsOpen && suggestions.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 mt-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl z-30 overflow-hidden text-left max-h-64 overflow-y-auto animate-fadeIn"
          >
            {suggestions.map((city) => (
              <button
                key={city.id}
                type="button"
                onClick={() => { onSelectCity(city); setSearchQuery(''); setSuggestionsOpen(false); }}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-[var(--color-bg-base)] transition-colors text-left border-b border-[var(--color-border)] last:border-0 min-h-[44px]"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#3b82f6] shrink-0" />
                  <div>
                    <span className="font-bold text-[var(--color-text-primary)] text-sm block">{city.name}</span>
                    <span className="text-xs text-[var(--color-text-secondary)]">{city.stateOrRegion}, {city.country}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[var(--color-text-primary)]">AQI {city.currentAqi}</span>
              </button>
            ))}
          </div>
        )}
      </div>

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
  );
};
