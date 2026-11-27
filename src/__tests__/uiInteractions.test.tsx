import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { HowItHelpsResidents } from '../components/HowItHelpsResidents';
import { AirQualityCharts } from '../components/AirQualityCharts';
import { CITIES_DATABASE } from '../data/cities';
import { findNearestCity, generateEstimatedCityData } from '../services/airQualityService';

describe('UI Component Interaction & Accessibility Tests', () => {
  describe('Navbar & Theme Toggle Flow', () => {
    it('renders navigation links and triggers theme toggle on click', () => {
      const handleToggle = vi.fn();
      const handleOpenAbout = vi.fn();
      const handleOpenAI = vi.fn();

      render(
        <Navbar
          isDarkMode={false}
          onToggleDarkMode={handleToggle}
          onOpenAbout={handleOpenAbout}
          onOpenAI={handleOpenAI}
        />
      );

      // Verify Brand Logo
      expect(screen.getByText('UrbanAir')).toBeDefined();

      // Find theme toggle button by aria-label
      const themeBtn = screen.getByLabelText('Switch to dark mode');
      expect(themeBtn).toBeDefined();

      fireEvent.click(themeBtn);
      expect(handleToggle).toHaveBeenCalledTimes(1);

      // Find AI Advisor button
      const aiBtn = screen.getByLabelText('Open AI Smog & Air Quality Advisor');
      fireEvent.click(aiBtn);
      expect(handleOpenAI).toHaveBeenCalledTimes(1);
    });

    it('toggles mobile menu open and closes when link or close button clicked', () => {
      const handleToggle = vi.fn();
      const handleOpenAbout = vi.fn();
      const handleOpenAI = vi.fn();

      render(
        <Navbar
          isDarkMode={true}
          onToggleDarkMode={handleToggle}
          onOpenAbout={handleOpenAbout}
          onOpenAI={handleOpenAI}
        />
      );

      const menuBtn = screen.getByLabelText(/Open navigation menu/i);
      fireEvent.click(menuBtn);

      // Mobile menu should be visible
      const closeBtn = screen.getByLabelText(/Close navigation menu/i);
      expect(closeBtn).toBeDefined();

      // Click a nav link inside the mobile menu
      const howItHelpsLinks = screen.getAllByText('How It Helps');
      fireEvent.click(howItHelpsLinks[howItHelpsLinks.length - 1]!);

      // Reopen and test about trigger and AI trigger in mobile menu
      fireEvent.click(screen.getByLabelText(/Open navigation menu/i));
      const aiMobileBtn = screen.getByText('AeroBot AI Smog Advisor');
      fireEvent.click(aiMobileBtn);
      expect(handleOpenAI).toHaveBeenCalled();

      fireEvent.click(screen.getByLabelText(/Open navigation menu/i));
      const aboutButtons = screen.getAllByText('About');
      fireEvent.click(aboutButtons[aboutButtons.length - 1]!);
      expect(handleOpenAbout).toHaveBeenCalled();
    });
  });

  describe('AirQualityCharts Tab Switching & Interactivity', () => {
    it('switches between 24-hour and 7-day forecast views', () => {
      const mockCity = CITIES_DATABASE[0]!;
      render(<AirQualityCharts city={mockCity} isDarkMode={false} />);

      expect(screen.getByText(/Air Quality Trends & Forecast/i)).toBeDefined();

      // Default is 24h trend
      const tab24h = screen.getByRole('tab', { name: /24-Hour Trend/i });
      const tab7d = screen.getByRole('tab', { name: /7-Day Forecast/i });
      expect(tab24h).toBeDefined();
      expect(tab7d).toBeDefined();

      // Switch to 7-Day Forecast
      fireEvent.click(tab7d);
      expect(screen.getByLabelText(/7-day daily forecast AQI chart/i)).toBeDefined();

      // Switch back to 24-Hour Trend
      fireEvent.click(tab24h);
      expect(screen.getByLabelText(/24-hour hourly AQI trend chart/i)).toBeDefined();
    });
  });

  describe('Air Quality Service Fallback & Geospatial Calculation', () => {
    it('generates complete telemetry estimates for an unlisted city', () => {
      const customCity = generateEstimatedCityData('Kyoto');
      expect(customCity.name).toBe('Kyoto');
      expect(customCity.currentAqi).toBeGreaterThanOrEqual(10);
      expect(customCity.pollutants.pm25).toBeDefined();
      expect(customCity.hourlyTrend.length).toBeGreaterThan(0);
      expect(customCity.dailyForecast.length).toBeGreaterThan(0);
    });

    it('finds nearest city using haversine calculation accurately', () => {
      // Coordinates near New York (40.7128, -74.006)
      const nearestToNY = findNearestCity(40.75, -73.98);
      expect(nearestToNY.id).toBe('new-york');

      // Coordinates near London (51.5074, -0.1278)
      const nearestToLondon = findNearestCity(51.5, -0.1);
      expect(nearestToLondon.id).toBe('london');
    });
  });

  describe('Hero Search Flow & Input Handling', () => {
    it('allows typing into the search input and handles submission of a known city', () => {
      const handleSelect = vi.fn();
      const handleLocate = vi.fn();
      const handleCustom = vi.fn();

      render(
        <Hero
          currentCity={CITIES_DATABASE[0]!}
          onSelectCity={handleSelect}
          onLocateUser={handleLocate}
          isLocating={false}
          onSearchCustom={handleCustom}
        />
      );

      const input = screen.getByPlaceholderText(/search city/i) as HTMLInputElement;
      expect(input).toBeDefined();

      fireEvent.change(input, { target: { value: 'Mumbai' } });
      expect(input.value).toBe('Mumbai');

      const form = input.closest('form')!;
      fireEvent.submit(form);

      expect(handleSelect).toHaveBeenCalledWith(expect.objectContaining({ name: 'Mumbai' }));
    });

    it('triggers custom city creation when a non-indexed city name is searched', () => {
      const handleSelect = vi.fn();
      const handleLocate = vi.fn();
      const handleCustom = vi.fn();

      render(
        <Hero
          currentCity={CITIES_DATABASE[0]!}
          onSelectCity={handleSelect}
          onLocateUser={handleLocate}
          isLocating={false}
          onSearchCustom={handleCustom}
        />
      );

      const input = screen.getByPlaceholderText(/search city/i);
      fireEvent.change(input, { target: { value: 'Zurich' } });

      const form = input.closest('form')!;
      fireEvent.submit(form);

      expect(handleCustom).toHaveBeenCalledWith('Zurich');
    });

    it('prevents search and shows validation message on invalid input', () => {
      const handleSelect = vi.fn();
      const handleLocate = vi.fn();
      const handleCustom = vi.fn();

      render(
        <Hero
          currentCity={CITIES_DATABASE[0]!}
          onSelectCity={handleSelect}
          onLocateUser={handleLocate}
          isLocating={false}
          onSearchCustom={handleCustom}
        />
      );

      const input = screen.getByPlaceholderText(/search city/i);
      // Type single character
      fireEvent.change(input, { target: { value: 'X' } });

      const form = input.closest('form')!;
      fireEvent.submit(form);

      expect(handleSelect).not.toHaveBeenCalled();
      expect(handleCustom).not.toHaveBeenCalled();
      expect(screen.getByRole('alert')).toBeDefined();
    });

    it('displays suggestions dropdown, allows clicking a suggestion, and clears input', () => {
      const handleSelect = vi.fn();
      render(
        <Hero
          currentCity={CITIES_DATABASE[0]!}
          onSelectCity={handleSelect}
          onLocateUser={vi.fn()}
          isLocating={false}
          onSearchCustom={vi.fn()}
        />
      );

      const input = screen.getByPlaceholderText(/search city/i);
      fireEvent.change(input, { target: { value: 'Del' } });

      // Suggestions dropdown should show Delhi
      const delhiMatches = screen.getAllByText('Delhi');
      expect(delhiMatches.length).toBeGreaterThan(0);

      fireEvent.click(delhiMatches[delhiMatches.length - 1]!);
      expect(handleSelect).toHaveBeenCalled();

      // Re-type and click clear button
      fireEvent.change(input, { target: { value: 'Mumbai' } });
      const clearBtn = screen.getByLabelText(/Clear search input/i);
      fireEvent.click(clearBtn);
      expect((input as HTMLInputElement).value).toBe('');

      // Focus and click outside
      fireEvent.focus(input);
      fireEvent.mouseDown(document.body);
    });
  });

  describe('ErrorBoundary Component', () => {
    it('renders fallback error alert when a child throws a render exception', () => {
      const FaultyComponent: React.FC = () => {
        throw new Error('Sensor telemetry network failure');
      };

      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const handleError = (e: ErrorEvent) => e.preventDefault();
      window.addEventListener('error', handleError);

      render(
        <ErrorBoundary>
          <FaultyComponent />
        </ErrorBoundary>
      );

      expect(screen.getByRole('alert')).toBeDefined();
      expect(screen.getByText(/Something went wrong loading air quality data/i)).toBeDefined();

      window.removeEventListener('error', handleError);
      spy.mockRestore();
    });
  });

  describe('How It Helps Residents Section', () => {
    it('renders all resident utility benefit pillars and triggers AI on button click', () => {
      const handleOpenAI = vi.fn();

      render(<HowItHelpsResidents onOpenAI={handleOpenAI} />);

      expect(screen.getByText(/How UrbanAir Helps City Residents/i)).toBeDefined();
      expect(screen.getByText(/Actionable Timing for Commutes & Workouts/i)).toBeDefined();
      expect(screen.getByText(/Personalized Protection for Sensitive Groups/i)).toBeDefined();
      expect(screen.getByText(/Inversion Breakup Ventilation Windows/i)).toBeDefined();
      expect(screen.getByText(/Affordable DIY Indoor Aerosol Defense/i)).toBeDefined();

      const askBtn = screen.getByLabelText(
        /Open AeroBot AI Assistant for personalized resident guidance/i
      );
      fireEvent.click(askBtn);
      expect(handleOpenAI).toHaveBeenCalledTimes(1);
    });
  });
});
