import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItHelpsResidents } from './components/HowItHelpsResidents';
import { LiveAQICard } from './components/LiveAQICard';
import { WinterSmogAdvisory } from './components/WinterSmogAdvisory';
import { CityCards } from './components/CityCards';
import { PollutantGrid } from './components/PollutantGrid';
import { CausesOfPollution } from './components/CausesOfPollution';
import { AirQualityCharts } from './components/AirQualityCharts';
import { AQILevelsGuide } from './components/AQILevelsGuide';
import { HealthAdvice } from './components/HealthAdvice';
import { AboutModal } from './components/AboutModal';
import { CreditsModal } from './components/CreditsModal';
import { AIAssistantChat } from './components/AIAssistantChat';
import { Footer } from './components/Footer';
import { SkeletonLoader } from './components/SkeletonLoader';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CITIES_DATABASE } from './data/cities';
import { CityAirData } from './types';
import { safeGetStorage, safeSetStorage } from './utils/storage';
import {
  findNearestCity,
  generateEstimatedCityData,
  validateCitySearchInput
} from './services/airQualityService';

/**
 * Main application component orchestrating urban air quality telemetry,
 * real-time city selection, winter thermal inversion advisories,
 * and AI-driven aerosol health recommendations.
 */
export const App: React.FC = () => {
  // Theme state: defaults to stored preference or OS color scheme
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

  const [currentCity, setCurrentCity] = useState<CityAirData>(CITIES_DATABASE[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState<boolean>(false);
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);

  // Synchronize dark theme class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      safeSetStorage('URBANAIR_THEME', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      safeSetStorage('URBANAIR_THEME', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = (): void => {
    setIsDarkMode((prev) => !prev);
  };

  /**
   * Switches the active monitored city with smooth transition.
   */
  const handleSelectCity = (city: CityAirData): void => {
    setIsLoading(true);
    setSearchError(null);
    setTimeout(() => {
      setCurrentCity(city);
      setIsLoading(false);
    }, 200);
  };

  /**
   * "Use My Location" GPS handler using Euclidean distance matching.
   */
  const handleLocateUser = (): void => {
    if (!navigator.geolocation) {
      setSearchError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setSearchError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nearest = findNearestCity(latitude, longitude);

        setTimeout(() => {
          setCurrentCity(nearest);
          setIsLocating(false);
        }, 400);
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setSearchError(
            'Location permission denied. Please select or search for your city manually above.'
          );
        } else {
          setSearchError('Unable to detect current GPS location. Please choose a city manually.');
        }
      },
      { timeout: 8000 }
    );
  };

  /**
   * Custom city query handler for unlisted global locations.
   */
  const handleSearchCustom = (query: string): void => {
    const validation = validateCitySearchInput(query);
    if (!validation.isValid) {
      setSearchError(validation.errorMessage || 'Please enter a valid city name.');
      return;
    }

    setIsLoading(true);
    setSearchError(null);

    setTimeout(() => {
      const customCityData = generateEstimatedCityData(validation.sanitized);
      setCurrentCity(customCityData);
      setIsLoading(false);
    }, 300);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-[var(--color-bg-base)] text-[var(--color-text-primary)] transition-colors duration-300 antialiased">
        {/* Skip to Main Content Link for Keyboard and Screen Reader Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-blue-600 focus:text-white focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold text-sm"
        >
          Skip to main content
        </a>

        {/* 1. Primary Navigation Bar */}
        <Navbar
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
          onOpenAbout={() => setIsAboutOpen(true)}
          onOpenAI={() => setIsAIOpen(true)}
        />

        <main id="main-content" className="flex-1 pb-16" tabIndex={-1}>
          {/* 2. Hero Section with Search & Geolocation */}
          <Hero
            currentCity={currentCity}
            onSelectCity={handleSelectCity}
            onLocateUser={handleLocateUser}
            isLocating={isLocating}
            onSearchCustom={handleSearchCustom}
            errorMessage={searchError}
          />

          {/* 3. How This Helps City Residents Section */}
          <HowItHelpsResidents onOpenAI={() => setIsAIOpen(true)} />

          {/* Loading Skeleton Transition */}
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <div className="space-y-12 animate-fadeIn">
              {/* 4. Live AQI Card with Gauge */}
              <LiveAQICard city={currentCity} />

              {/* 5. Winter Smog & Thermal Inversion Advisory (Active for High AQI / Delhi NCR) */}
              <WinterSmogAdvisory city={currentCity} onOpenAI={() => setIsAIOpen(true)} />

              {/* 6. Monitored City Skylines Quick Selector */}
              <CityCards currentCityId={currentCity.id} onSelectCity={handleSelectCity} />

              {/* 7. Core Pollutant Breakdown (6 Cards with real photos) */}
              <PollutantGrid city={currentCity} />

              {/* 8. Major Causes of Urban Air Pollution (4 Cards with real photos) */}
              <CausesOfPollution />

              {/* 9. Forecast & Trend Charts (24h Trend & 7-Day Forecast) */}
              <AirQualityCharts city={currentCity} isDarkMode={isDarkMode} />

              {/* 10. Visual AQI Levels Scale & Category Legend */}
              <AQILevelsGuide currentAqi={currentCity.currentAqi} />

              {/* 11. Health Advice Recommendations & Sensitive Groups Matrix */}
              <HealthAdvice city={currentCity} />
            </div>
          )}
        </main>

        {/* 12. Application Footer */}
        <Footer
          onOpenAbout={() => setIsAboutOpen(true)}
          onOpenCredits={() => setIsCreditsOpen(true)}
        />

        {/* About AQI & Science Modal */}
        <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

        {/* Image Credits & Source Licensing Modal */}
        <CreditsModal isOpen={isCreditsOpen} onClose={() => setIsCreditsOpen(false)} />

        {/* GenAI Urban Air & Winter Smog Defense Advisor Modal */}
        <AIAssistantChat city={currentCity} isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
      </div>
    </ErrorBoundary>
  );
};

export default App;
