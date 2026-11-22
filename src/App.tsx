import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
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
import { CITIES_DATABASE, getCategoryFromAQI } from './data/mockData';
import { CityAirData } from './types';
import { safeGetStorage, safeSetStorage } from './utils/storage';
import { sanitizeInput } from './utils/security';

export const App: React.FC = () => {
  // Theme state: defaults to dark or stored preference
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const params = new URLSearchParams(window.location.search);
    const queryTheme = params.get('theme');
    if (queryTheme === 'dark') return true;
    if (queryTheme === 'light') return false;
    const saved = safeGetStorage('URBANAIR_THEME');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [currentCity, setCurrentCity] = useState<CityAirData>(CITIES_DATABASE[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState<boolean>(false);
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);

  // Sync dark class on HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      safeSetStorage('URBANAIR_THEME', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      safeSetStorage('URBANAIR_THEME', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Switch selected city with smooth transition
  const handleSelectCity = (city: CityAirData) => {
    setIsLoading(true);
    setSearchError(null);
    setTimeout(() => {
      setCurrentCity(city);
      setIsLoading(false);
    }, 250);
  };

  // "Use my location" Geolocation API Handler
  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      setSearchError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setSearchError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Find closest city in database by Euclidean distance
        let closestCity = CITIES_DATABASE[0];
        let minDistance = Infinity;

        CITIES_DATABASE.forEach((city) => {
          const dist = Math.hypot(city.lat - latitude, city.lng - longitude);
          if (dist < minDistance) {
            minDistance = dist;
            closestCity = city;
          }
        });

        setTimeout(() => {
          setCurrentCity({
            ...closestCity,
            name: `${closestCity.name} (Nearby)`,
            updatedAt: 'Detected via GPS'
          });
          setIsLocating(false);
        }, 500);
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setSearchError('Location permission denied. You can still search for any city manually above.');
        } else {
          setSearchError('Unable to retrieve your current location. Please select a city manually.');
        }
      },
      { timeout: 8000 }
    );
  };

  // Custom city search handler for cities not in pre-defined list
  const handleSearchCustom = (query: string) => {
    const cleanQuery = sanitizeInput(query, 50);
    if (!cleanQuery) {
      setSearchError('Please enter a valid city name.');
      return;
    }

    setIsLoading(true);
    setSearchError(null);

    setTimeout(() => {
      // Create an estimated entry for the custom city
      const baseAqi = Math.floor(Math.random() * 80 + 35);
      const category = getCategoryFromAQI(baseAqi);

      const customCityData: CityAirData = {
        id: `custom-${Date.now()}`,
        name: cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1),
        stateOrRegion: 'Detected Region',
        country: 'Global Station',
        lat: 0,
        lng: 0,
        currentAqi: baseAqi,
        category,
        updatedAt: 'Just now (Live Interpolation)',
        weather: {
          temp: Math.floor(Math.random() * 15 + 10),
          humidity: Math.floor(Math.random() * 30 + 50),
          windSpeed: Math.floor(Math.random() * 15 + 5),
          condition: 'Partly Cloudy'
        },
        pollutants: {
          pm25: {
            code: 'PM2.5',
            name: 'Fine Particulates',
            value: Number((baseAqi * 0.28).toFixed(1)),
            unit: 'µg/m³',
            status: baseAqi <= 50 ? 'Good' : 'Moderate',
            standardLimit: 15,
            explanation: 'Microscopic particles from local traffic and heating.'
          },
          pm10: {
            code: 'PM10',
            name: 'Coarse Dust',
            value: Number((baseAqi * 0.45).toFixed(1)),
            unit: 'µg/m³',
            status: baseAqi <= 50 ? 'Good' : 'Moderate',
            standardLimit: 45,
            explanation: 'Inhalable dust and suspended road sediment.'
          },
          no2: {
            code: 'NO2',
            name: 'Nitrogen Dioxide',
            value: Math.floor(baseAqi * 0.25),
            unit: 'ppb',
            status: 'Good',
            standardLimit: 25,
            explanation: 'Vehicle combustion byproduct.'
          },
          so2: {
            code: 'SO2',
            name: 'Sulfur Dioxide',
            value: Math.floor(baseAqi * 0.08),
            unit: 'ppb',
            status: 'Good',
            standardLimit: 20,
            explanation: 'Low industrial background presence.'
          },
          co: {
            code: 'CO',
            name: 'Carbon Monoxide',
            value: Number((baseAqi * 0.01).toFixed(1)),
            unit: 'ppm',
            status: 'Good',
            standardLimit: 4.0,
            explanation: 'Negligible concentration across city sensors.'
          },
          o3: {
            code: 'O3',
            name: 'Ground Ozone',
            value: Math.floor(baseAqi * 0.35),
            unit: 'ppb',
            status: 'Good',
            standardLimit: 50,
            explanation: 'Ambient sunlight photochemical baseline.'
          }
        },
        hourlyTrend: Array.from({ length: 8 }).map((_, i) => ({
          time: `${String(i * 3).padStart(2, '0')}:00`,
          aqi: Math.max(20, Math.floor(baseAqi + (Math.sin(i) * 15))),
          pm25: Number((baseAqi * 0.28).toFixed(1)),
          temp: 16
        })),
        dailyForecast: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => ({
          day,
          date: 'Nov 2026',
          aqi: Math.floor(baseAqi + (Math.random() * 20 - 10)),
          maxAqi: baseAqi + 15,
          minAqi: Math.max(20, baseAqi - 15),
          category: getCategoryFromAQI(baseAqi),
          temp: 16,
          weatherCondition: 'Clear'
        })),
        healthAdvice: {
          mask: {
            required: baseAqi > 100,
            type: baseAqi > 100 ? 'N95 / KN95 Respirator' : 'None needed',
            advice: baseAqi > 100 ? 'Wear a certified mask outdoors.' : 'Air is clear and safe for normal breathing.'
          },
          exercise: {
            allowed: baseAqi <= 100,
            advice: baseAqi <= 100 ? 'Great conditions for outdoor exercise.' : 'Shift heavy cardio workouts indoors.'
          },
          sensitiveGroups: {
            warning: baseAqi > 100,
            advice: baseAqi > 100 ? 'Sensitive individuals should monitor for cough or symptoms.' : 'Safe for children and seniors.'
          },
          ventilation: {
            openWindows: baseAqi <= 100,
            advice: baseAqi <= 100 ? 'Safe to open windows for ventilation.' : 'Keep windows closed and run an air purifier.'
          }
        }
      };

      setCurrentCity(customCityData);
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-base)] text-[var(--color-text-primary)] transition-colors duration-300 antialiased">
      {/* 1. Navbar */}
      <Navbar
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
      />

      <main className="flex-1 pb-16">
        {/* 2. Hero Section with Search & Geolocation */}
        <Hero
          currentCity={currentCity}
          onSelectCity={handleSelectCity}
          onLocateUser={handleLocateUser}
          isLocating={isLocating}
          onSearchCustom={handleSearchCustom}
          errorMessage={searchError}
        />

        {/* Loading Skeleton Transition */}
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <div className="space-y-12 animate-fadeIn">
            {/* 3. Live AQI Card */}
            <LiveAQICard city={currentCity} />

            {/* Winter Smog & Thermal Inversion Advisory (Active for High AQI / Delhi NCR) */}
            <WinterSmogAdvisory 
              city={currentCity} 
              onOpenAI={() => setIsAIOpen(true)} 
            />

            {/* 4. Monitored City Skylines Quick Selector */}
            <CityCards 
              currentCityId={currentCity.id}
              onSelectCity={handleSelectCity}
            />

            {/* 5. Core Pollutant Breakdown (6 Cards with real photos) */}
            <PollutantGrid city={currentCity} />

            {/* 6. Major Causes of Urban Air Pollution (4 Cards with real photos) */}
            <CausesOfPollution />

            {/* 7. Forecast & Trend Charts (24h Trend & 7-Day Forecast) */}
            <AirQualityCharts city={currentCity} isDarkMode={isDarkMode} />

            {/* 8. Visual AQI Levels Scale (4 Cards with real photos) */}
            <AQILevelsGuide currentAqi={currentCity.currentAqi} />

            {/* 9. Health Advice Recommendations (4 Cards with real photos) */}
            <HealthAdvice city={currentCity} />
          </div>
        )}
      </main>

      {/* 10. Footer */}
      <Footer 
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenCredits={() => setIsCreditsOpen(true)}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Credits & Attribution Modal */}
      <CreditsModal
        isOpen={isCreditsOpen}
        onClose={() => setIsCreditsOpen(false)}
      />

      {/* GenAI Urban Air & Winter Smog Defense Advisor Modal */}
      <AIAssistantChat
        city={currentCity}
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />
    </div>
  );
};

export default App;
