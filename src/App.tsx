import React from 'react';
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
import { Footer } from './components/Footer';
import { SkeletonLoader } from './components/SkeletonLoader';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppModals } from './components/modals/AppModals';
import { useAirQualityApp } from './hooks/useAirQualityApp';

export const App: React.FC = () => {
  const {
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
  } = useAirQualityApp();

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-[var(--color-bg-base)] text-[var(--color-text-primary)] transition-colors duration-300 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-blue-600 focus:text-white font-semibold text-sm"
        >
          Skip to main content
        </a>

        <Navbar
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
          onOpenAbout={() => setIsAboutOpen(true)}
          onOpenAI={() => setIsAIOpen(true)}
        />

        <main id="main-content" className="flex-1 pb-16" tabIndex={-1}>
          <Hero
            currentCity={currentCity}
            onSelectCity={handleSelectCity}
            onLocateUser={handleLocateUser}
            isLocating={isLocating}
            onSearchCustom={handleSearchCustom}
            errorMessage={searchError}
          />

          <HowItHelpsResidents onOpenAI={() => setIsAIOpen(true)} />

          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              <LiveAQICard city={currentCity} />
              <WinterSmogAdvisory city={currentCity} onOpenAI={() => setIsAIOpen(true)} />
              <CityCards currentCityId={currentCity.id} onSelectCity={handleSelectCity} />
              <PollutantGrid city={currentCity} />
              <CausesOfPollution />
              <AirQualityCharts city={currentCity} isDarkMode={isDarkMode} />
              <AQILevelsGuide currentAqi={currentCity.currentAqi} />
              <HealthAdvice city={currentCity} />
            </>
          )}
        </main>

        <Footer
          onOpenAbout={() => setIsAboutOpen(true)}
          onOpenCredits={() => setIsCreditsOpen(true)}
        />

        <AppModals
          currentCity={currentCity}
          isAboutOpen={isAboutOpen}
          isCreditsOpen={isCreditsOpen}
          isAIOpen={isAIOpen}
          onCloseAbout={() => setIsAboutOpen(false)}
          onCloseCredits={() => setIsCreditsOpen(false)}
          onCloseAI={() => setIsAIOpen(false)}
        />
      </div>
    </ErrorBoundary>
  );
};

export default App;
