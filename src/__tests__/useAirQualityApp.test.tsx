import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAirQualityApp } from '../hooks/useAirQualityApp';
import * as openMeteoService from '../services/openMeteoService';
import { CITIES_DATABASE } from '../data/cities';

describe('useAirQualityApp Hook Comprehensive Suite', () => {
  const mockCity = CITIES_DATABASE[0]!;

  beforeEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
    document.documentElement.className = '';
    Object.defineProperty(navigator, 'geolocation', {
      writable: true,
      configurable: true,
      value: {
        getCurrentPosition: vi.fn()
      }
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes dark mode from prefers-color-scheme when no query or storage is present', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('dark'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }));

    const { result } = renderHook(() => useAirQualityApp());
    expect(result.current.isDarkMode).toBe(true);
  });

  it('toggles dark mode, updates document classes, and persists to storage', () => {
    const { result } = renderHook(() => useAirQualityApp());

    act(() => {
      result.current.setIsDarkMode(true);
    });
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(window.localStorage.getItem('URBANAIR_THEME')).toBe('dark');

    act(() => {
      result.current.setIsDarkMode(false);
    });
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(window.localStorage.getItem('URBANAIR_THEME')).toBe('light');
  });

  it('selects city and fetches live air quality data successfully', async () => {
    const fetchSpy = vi.spyOn(openMeteoService, 'fetchLiveAirQuality').mockResolvedValue({
      data: { ...mockCity, name: 'Mumbai', currentAqi: 112 },
      isLive: true
    });

    const { result } = renderHook(() => useAirQualityApp());

    await act(async () => {
      await result.current.handleSelectCity(mockCity);
    });

    expect(fetchSpy).toHaveBeenCalled();
    expect(result.current.currentCity.name).toBe('Mumbai');
    expect(result.current.currentCity.currentAqi).toBe(112);
    expect(result.current.isLoading).toBe(false);
  });

  it('handles fetch failure gracefully during city selection', async () => {
    vi.spyOn(openMeteoService, 'fetchLiveAirQuality').mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useAirQualityApp());

    await act(async () => {
      await result.current.handleSelectCity(mockCity);
    });

    expect(result.current.currentCity.dataSource).toBe('fallback');
    expect(result.current.isLoading).toBe(false);
  });

  it('handles geolocation when navigator.geolocation is unavailable', () => {
    // @ts-expect-error Mocking geolocation absence
    navigator.geolocation = undefined;

    const { result } = renderHook(() => useAirQualityApp());

    act(() => {
      result.current.handleLocateUser();
    });

    expect(result.current.searchError).toContain('Geolocation is not supported');
  });

  it('handles geolocation success and fetches coordinates telemetry', async () => {
    const mockPosition = {
      coords: {
        latitude: 28.6139,
        longitude: 77.209,
        accuracy: 10,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null
      },
      timestamp: Date.now()
    } as unknown as GeolocationPosition;

    navigator.geolocation.getCurrentPosition = vi.fn().mockImplementation((success) => {
      success(mockPosition);
    });

    const coordsSpy = vi.spyOn(openMeteoService, 'fetchLiveAirQualityByCoords').mockResolvedValue({
      data: { ...mockCity, name: 'Detected Location', currentAqi: 95 },
      isLive: true
    });

    const { result } = renderHook(() => useAirQualityApp());

    await act(async () => {
      result.current.handleLocateUser();
    });

    expect(coordsSpy).toHaveBeenCalledWith(28.6139, 77.209, 'Detected Location');
    expect(result.current.currentCity.name).toBe('Detected Location');
    expect(result.current.isLocating).toBe(false);
  });

  it('handles geolocation error when user denies permission', () => {
    const mockError: GeolocationPositionError = {
      code: 1, // PERMISSION_DENIED
      message: 'User denied Geolocation',
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3
    };

    navigator.geolocation.getCurrentPosition = vi.fn().mockImplementation((_, error) => {
      error(mockError);
    });

    const { result } = renderHook(() => useAirQualityApp());

    act(() => {
      result.current.handleLocateUser();
    });

    expect(result.current.searchError).toContain('Location permission denied');
    expect(result.current.isLocating).toBe(false);
  });

  it('handles custom search with invalid input', async () => {
    const { result } = renderHook(() => useAirQualityApp());

    await act(async () => {
      await result.current.handleSearchCustom('A');
    });

    expect(result.current.searchError).toBeDefined();
    expect(result.current.isLoading).toBe(false);
  });

  it('handles custom search with valid query and network fallback', async () => {
    vi.spyOn(openMeteoService, 'fetchLiveAirQuality').mockRejectedValue(
      new Error('City not found')
    );

    const { result } = renderHook(() => useAirQualityApp());

    await act(async () => {
      await result.current.handleSearchCustom('Kyoto City');
    });

    expect(result.current.currentCity.name).toBe('Kyoto City');
    expect(result.current.currentCity.dataSource).toBe('fallback');
    expect(result.current.isLoading).toBe(false);
  });

  it('toggles modal states (About, Credits, AI)', () => {
    const { result } = renderHook(() => useAirQualityApp());

    act(() => {
      result.current.setIsAboutOpen(true);
      result.current.setIsCreditsOpen(true);
      result.current.setIsAIOpen(true);
    });

    expect(result.current.isAboutOpen).toBe(true);
    expect(result.current.isCreditsOpen).toBe(true);
    expect(result.current.isAIOpen).toBe(true);

    act(() => {
      result.current.setIsAboutOpen(false);
      result.current.setIsCreditsOpen(false);
      result.current.setIsAIOpen(false);
    });

    expect(result.current.isAboutOpen).toBe(false);
    expect(result.current.isCreditsOpen).toBe(false);
    expect(result.current.isAIOpen).toBe(false);
  });
});
