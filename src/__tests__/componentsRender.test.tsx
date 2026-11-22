import { describe, it, expect, vi, afterEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { LiveAQICard } from '../components/LiveAQICard';
import { PollutantGrid } from '../components/PollutantGrid';
import { HealthAdvice } from '../components/HealthAdvice';
import { WinterSmogAdvisory } from '../components/WinterSmogAdvisory';
import { AQILevelsGuide } from '../components/AQILevelsGuide';
import { CityCards } from '../components/CityCards';
import { CausesOfPollution } from '../components/CausesOfPollution';
import { Footer } from '../components/Footer';
import { AboutModal } from '../components/AboutModal';
import { CreditsModal } from '../components/CreditsModal';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { AIAssistantChat } from '../components/AIAssistantChat';
import { App } from '../App';
import { CITIES_DATABASE } from '../data/cities';

describe('Comprehensive Component Coverage & Rendering Suite', () => {
  const mockCity = CITIES_DATABASE[0]; // Delhi (Hazardous AQI with inversion)

  afterEach(() => {
    cleanup();
  });

  it('renders LiveAQICard with city telemetry, gauge, and weather metrics', () => {
    render(<LiveAQICard city={mockCity} />);

    expect(screen.getAllByText(/Delhi/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Hazardous/i)).toBeDefined();
    expect(screen.getByText('Humidity')).toBeDefined();
    expect(screen.getByText('Wind')).toBeDefined();
  });

  it('renders PollutantGrid with all 6 criteria pollutants and WHO limits', () => {
    render(<PollutantGrid city={mockCity} />);

    expect(screen.getByText('PM2.5')).toBeDefined();
    expect(screen.getByText('PM10')).toBeDefined();
    expect(screen.getByText('NO2')).toBeDefined();
    expect(screen.getByText('SO2')).toBeDefined();
    expect(screen.getByText('CO')).toBeDefined();
    expect(screen.getByText('O3')).toBeDefined();
  });

  it('renders HealthAdvice with core advice, sensitive groups matrix, and medical disclaimer', () => {
    render(<HealthAdvice city={mockCity} />);

    expect(screen.getByText(/Personal Health Recommendations/i)).toBeDefined();
    expect(screen.getByText('Mask Guidance')).toBeDefined();
    expect(screen.getByText('Outdoor Exercise')).toBeDefined();
    expect(screen.getByText(/Tailored Guidelines by Vulnerable Group/i)).toBeDefined();
    expect(screen.getByText(/Children & Infants/i)).toBeDefined();
    expect(screen.getByText(/Older Adults \(65\+\)/i)).toBeDefined();
    expect(screen.getByText(/Asthma & COPD/i)).toBeDefined();
    expect(screen.getByText(/Medical & Clinical Health Disclaimer/i)).toBeDefined();
  });

  it('renders WinterSmogAdvisory with temperature inversion telemetry and allows expand/collapse', () => {
    const handleOpenAI = vi.fn();
    render(<WinterSmogAdvisory city={mockCity} onOpenAI={handleOpenAI} />);

    expect(screen.getByText(/Severe Winter Smog Telemetry/i)).toBeDefined();
    expect(screen.getByText(/Morning Smog Ceiling Trap/i)).toBeDefined();
    expect(screen.getAllByText(/Safe Ventilation Window/i).length).toBeGreaterThan(0);

    // Trigger AI click
    const aiBtn = screen.getByLabelText(/Ask AeroBot AI about this thermal inversion/i);
    fireEvent.click(aiBtn);
    expect(handleOpenAI).toHaveBeenCalledTimes(1);

    // Toggle collapse
    const toggleBtn = screen.getByLabelText(/Collapse advisory details/i);
    fireEvent.click(toggleBtn);
  });

  it('returns null for WinterSmogAdvisory when city has no inversion and low AQI', () => {
    const cleanCity = { ...CITIES_DATABASE[1], currentAqi: 35, inversionAdvisory: undefined };
    const { container } = render(<WinterSmogAdvisory city={cleanCity} onOpenAI={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders AQILevelsGuide with all visual spectrum brackets', () => {
    render(<AQILevelsGuide currentAqi={mockCity.currentAqi} />);

    expect(screen.getByText(/Visual Air Quality Index/i)).toBeDefined();
    expect(screen.getByText('0 – 50 AQI')).toBeDefined();
    expect(screen.getByText('51 – 100 AQI')).toBeDefined();
    expect(screen.getByText('151 – 200 AQI')).toBeDefined();
    expect(screen.getByText('301+ AQI')).toBeDefined();
  });

  it('renders CityCards and switches city on click', () => {
    const handleSelect = vi.fn();
    render(
      <CityCards 
        currentCityId={mockCity.id} 
        onSelectCity={handleSelect} 
      />
    );

    expect(screen.getByText(/Monitored City Skylines/i)).toBeDefined();
    const mumbaiCard = screen.getByText('Mumbai');
    fireEvent.click(mumbaiCard);
    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'mumbai' })
    );
  });

  it('renders CausesOfPollution cards', () => {
    render(<CausesOfPollution />);
    expect(screen.getByText(/Major Causes of Urban Air Pollution/i)).toBeDefined();
    expect(screen.getByText(/Industrial Manufacturing & Energy Plants/i)).toBeDefined();
  });

  it('renders Footer with links and handles about/credits modals trigger', () => {
    const handleOpenAbout = vi.fn();
    const handleOpenCredits = vi.fn();

    render(<Footer onOpenAbout={handleOpenAbout} onOpenCredits={handleOpenCredits} />);

    expect(screen.getAllByText(/UrbanAir Assistant/i).length).toBeGreaterThan(0);
    const aboutBtn = screen.getByText(/View AQI Scale Guide/i);
    fireEvent.click(aboutBtn);
    expect(handleOpenAbout).toHaveBeenCalledTimes(1);

    const creditsBtn = screen.getByText(/Image Credits & Attribution/i);
    fireEvent.click(creditsBtn);
    expect(handleOpenCredits).toHaveBeenCalledTimes(1);
  });

  it('renders AboutModal and handles close', () => {
    const handleClose = vi.fn();
    render(<AboutModal isOpen={true} onClose={handleClose} />);

    expect(screen.getByText(/About the Air Quality Index/i)).toBeDefined();
    const closeBtn = screen.getByLabelText(/Close modal/i);
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders CreditsModal and handles close', () => {
    const handleClose = vi.fn();
    render(<CreditsModal isOpen={true} onClose={handleClose} />);

    expect(screen.getByText(/Image Credits & Attribution/i)).toBeDefined();
    const closeBtn = screen.getByLabelText(/Close image credits dialog/i);
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders SkeletonLoader placeholders', () => {
    render(<SkeletonLoader />);
    expect(screen.getByRole('status', { name: /Loading air quality telemetry/i })).toBeDefined();
  });

  it('renders AIAssistantChat, sends prompt and handles API Key drawer', async () => {
    const handleClose = vi.fn();
    render(
      <AIAssistantChat 
        city={mockCity} 
        isOpen={true} 
        onClose={handleClose} 
      />
    );

    expect(screen.getByText(/AeroBot AI Smog Advisor/i)).toBeDefined();

    // Toggle API key drawer
    const keyBtn = screen.getByLabelText(/Configure Optional Gemini API Key/i);
    fireEvent.click(keyBtn);
    expect(screen.getByPlaceholderText(/Paste AI Studio API Key/i)).toBeDefined();

    // Type a chat message
    const input = screen.getByLabelText(/Message to AeroBot AI/i);
    fireEvent.change(input, { target: { value: 'When should I open my windows?' } });
    const sendBtn = screen.getByLabelText(/Send Message/i);
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(screen.getByText(/Winter Thermal Inversion/i)).toBeDefined();
    });

    // Close chat
    const closeBtn = screen.getByLabelText(/Close AI Assistant/i);
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders full App and allows city switching and modal triggers', async () => {
    render(<App />);

    // Verify initial Delhi telemetry is mounted
    expect(screen.getAllByText(/Delhi/i).length).toBeGreaterThan(0);

    // Click another city (e.g. Mumbai) in CityCards
    const mumbaiCards = screen.getAllByText('Mumbai');
    fireEvent.click(mumbaiCards[0]);

    // Verify Mumbai is selected
    await waitFor(() => {
      expect(screen.getAllByText(/Mumbai/i).length).toBeGreaterThan(0);
    });
  });

  it('handles App modals, geolocation fallback, and custom search', async () => {
    render(<App />);

    // Open About Modal from Navbar
    const aboutBtn = screen.getAllByRole('button', { name: /About/i })[0];
    fireEvent.click(aboutBtn);
    expect(screen.getByText(/About the Air Quality Index/i)).toBeDefined();

    // Close About Modal
    fireEvent.click(screen.getByLabelText(/Close modal/i));

    // Open Credits Modal from Footer
    const creditsBtn = screen.getByText(/Image Credits & Attribution/i);
    fireEvent.click(creditsBtn);
    expect(screen.getAllByText(/Image Credits & Attribution/i).length).toBeGreaterThan(1);

    // Close Credits Modal
    fireEvent.click(screen.getByLabelText(/Close image credits dialog/i));

    // Trigger Use My Location with mock geolocation
    const locateBtn = screen.getByLabelText(/Detect air quality at my current location/i);
    fireEvent.click(locateBtn);

    // Custom city search
    const input = screen.getByPlaceholderText(/search city/i);
    fireEvent.change(input, { target: { value: 'Kyoto' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(screen.getAllByText(/Kyoto/i).length).toBeGreaterThan(0);
    });
  });
});
