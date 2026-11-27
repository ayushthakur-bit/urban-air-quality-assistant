import { useState, useEffect } from 'react';
import { CityAirData } from '../types';
import { DEFAULT_FALLBACK_CITY } from '../data/cities';
import { safeGetStorage, safeSetStorage } from '../utils/storage';
import { validateCitySearchInput, findNearestCity, generateEstimatedCityData } from '../services/airQualityService';
import { fetchLiveAirQuality, fetchLiveAirQualityByCoords } from '../services/openMeteoService';

/**
 * Custom hook orchestrating global application state:
 * Theme synchronization, live Open-Meteo telemetry hydration, GPS geolocation, and modals.
 */
export function useAirQualityApp() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const params = new URLSearchParams(window.location.search);
    const queryTheme = params.get('theme');
    if (queryTheme === 'dark') return true;
    if (queryTheme === 'light') return false;
    const saved = safeGetStorage('URBANAIR_THEME');
    if (saved) return saved === 'dark';
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [currentCity, setCurrentCity] = useState<CityAirData>(DEFAULT_FALLBACK_CITY);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState<boolean>(false);
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      safeSetStorage('URBANAIR_THEME', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      safeSetStorage('URBANAIR_THEME', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    let isMounted = true;
    fetchLiveAirQuality('Delhi')
      .then((res) => { if (isMounted) setCurrentCity(res.data); })
      .catch(() => {});
    return () => { isMounted = false; };
  }, []);

  const handleSelectCity = async (city: CityAirData): Promise<void> => {
    setIsLoading(true);
    setSearchError(null);
    try {
      const result = await fetchLiveAirQuality(city.name);
      setCurrentCity(result.data);
      if (result.errorMessage) setSearchError(result.errorMessage);
    } catch {
      setCurrentCity({ ...city, dataSource: 'fallback' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocateUser = (): void => {
    if (!navigator.geolocation) {
      setSearchError('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    setSearchError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const result = await fetchLiveAirQualityByCoords(pos.coords.latitude, pos.coords.longitude, 'Detected Location');
          setCurrentCity(result.data);
          if (result.errorMessage) setSearchError(result.errorMessage);
        } catch {
          const nearest = findNearestCity(pos.coords.latitude, pos.coords.longitude);
          setCurrentCity(nearest);
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        setIsLocating(false);
        setSearchError(err.code === err.PERMISSION_DENIED
          ? 'Location permission denied. Please select or search for your city manually.'
          : 'Unable to detect GPS location. Please choose a city manually.');
      },
      { timeout: 8000 }
    );
  };

  const handleSearchCustom = async (query: string): Promise<void> => {
    const validation = validateCitySearchInput(query);
    if (!validation.isValid) {
      setSearchError(validation.errorMessage || 'Please enter a valid city name.');
      return;
    }
    setIsLoading(true);
    setSearchError(null);
    try {
      const result = await fetchLiveAirQuality(validation.sanitized);
      setCurrentCity(result.data);
      if (result.errorMessage) setSearchError(result.errorMessage);
    } catch {
      const fallback = generateEstimatedCityData(validation.sanitized);
      setCurrentCity({ ...fallback, dataSource: 'fallback' });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isDarkMode,
    setIsDarkMode,
    currentCity,
    isLoading,
    isLocating,
    searchError,
    isAboutOpen,
    setIsAboutOpen,
    isCreditsOpen,
    setIsCreditsOpen,
    isAIOpen,
    setIsAIOpen,
    handleSelectCity,
    handleLocateUser,
    handleSearchCustom
  };
}
