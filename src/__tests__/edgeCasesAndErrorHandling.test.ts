import { describe, it, expect, vi } from 'vitest';
import { getCategoryFromAQI, getAQIColorHex, AQI_COLORS } from '../constants/aqi';
import {
  validateCitySearchInput,
  findNearestCity,
  generateEstimatedCityData,
  formatPollutantValue
} from '../services/airQualityService';
import { SmogAIService } from '../services/aiService';
import { CITIES_DATABASE } from '../data/cities';
import { safeGetStorage, safeSetStorage, safeRemoveStorage } from '../utils/storage';

describe('Edge Cases and Robust Error Handling Suite', () => {
  describe('Zero, Negative, and Extreme AQI Boundary Conditions', () => {
    it('handles negative AQI values by safely clamping to zero and categorizing as Good', () => {
      expect(getCategoryFromAQI(-1)).toBe('Good');
      expect(getCategoryFromAQI(-50)).toBe('Good');
      expect(getCategoryFromAQI(-999)).toBe('Good');
      expect(getAQIColorHex(-20)).toBe(AQI_COLORS.GOOD);
    });

    it('handles zero AQI properly', () => {
      expect(getCategoryFromAQI(0)).toBe('Good');
      expect(getAQIColorHex(0)).toBe(AQI_COLORS.GOOD);
    });

    it('handles extreme and off-scale high AQI values (500, 999, 1500) as Hazardous', () => {
      expect(getCategoryFromAQI(500)).toBe('Hazardous');
      expect(getCategoryFromAQI(999)).toBe('Hazardous');
      expect(getCategoryFromAQI(1500)).toBe('Hazardous');
      expect(getAQIColorHex(500)).toBe(AQI_COLORS.HAZARDOUS);
      expect(getAQIColorHex(1200)).toBe(AQI_COLORS.HAZARDOUS);
    });
  });

  describe('Search Input Validation & Edge Cases', () => {
    it('rejects empty, null, or whitespace-only search strings with helpful messages', () => {
      const empty = validateCitySearchInput('');
      expect(empty.isValid).toBe(false);
      expect(empty.errorMessage).toContain('Please enter a city name');

      const whitespace = validateCitySearchInput('     ');
      expect(whitespace.isValid).toBe(false);

      const nullInput = validateCitySearchInput(null as unknown as string);
      expect(nullInput.isValid).toBe(false);
    });

    it('rejects inputs shorter than 2 characters', () => {
      const singleChar = validateCitySearchInput('A');
      expect(singleChar.isValid).toBe(false);
      expect(singleChar.errorMessage).toContain('at least 2 characters');
    });

    it('rejects purely numeric searches to prevent meaningless city queries', () => {
      const numbersOnly = validateCitySearchInput('123456');
      expect(numbersOnly.isValid).toBe(false);
      expect(numbersOnly.errorMessage).toContain('alphabetic');
    });

    it('accepts and cleans valid city names with accents and hyphens', () => {
      const valid = validateCitySearchInput('  New-York City  ');
      expect(valid.isValid).toBe(true);
      expect(valid.sanitized).toBe('New-York City');
    });
  });

  describe('Data Formatting & Non-Finite Coordinates', () => {
    it('gracefully handles non-finite GPS coordinates (NaN, Infinity)', () => {
      const nanCity = findNearestCity(NaN, NaN);
      expect(nanCity).toBeDefined();
      expect(nanCity.id).toBe(CITIES_DATABASE[0]!.id);

      const infCity = findNearestCity(Infinity, -Infinity);
      expect(infCity).toBeDefined();
      expect(infCity.id).toBe(CITIES_DATABASE[0]!.id);
    });

    it('formats pollutant values cleanly, protecting against non-finite values', () => {
      expect(formatPollutantValue(25.4, 'µg/m³')).toBe('25.4 µg/m³');
      expect(formatPollutantValue(0, 'ppm')).toBe('0 ppm');
      expect(formatPollutantValue(NaN, 'ppb')).toBe('0 ppb');
      expect(formatPollutantValue(Infinity, 'µg/m³')).toBe('0 µg/m³');
    });

    it('generates deterministic estimated city datasets for unindexed cities', () => {
      const estimated = generateEstimatedCityData('Valparaiso', 180);
      expect(estimated.name).toBe('Valparaiso');
      expect(estimated.currentAqi).toBe(180);
      expect(estimated.category).toBe('Unhealthy');
      expect(estimated.pollutants.pm25.value).toBeGreaterThan(0);
      expect(estimated.hourlyTrend.length).toBe(8);
      expect(estimated.dailyForecast.length).toBe(7);
    });
  });

  describe('API Failure and Network Resilience', () => {
    it('falls back to local aerosol reasoning engine without crashing when API fetch fails', async () => {
      // Mock global fetch to simulate network error
      const originalFetch = global.fetch;
      global.fetch = vi.fn().mockRejectedValue(new Error('Network offline or ECONNREFUSED'));

      SmogAIService.setApiKey('AIzaSyMockFaultyKey');
      const response = await SmogAIService.askAeroBot(
        'What should I do during high smog?',
        CITIES_DATABASE[0]!
      );

      expect(response).toBeDefined();
      expect(response.content).toContain('AeroBot');
      expect(response.content.length).toBeGreaterThan(50);

      // Restore fetch
      global.fetch = originalFetch;
      SmogAIService.setApiKey('');
    });

    it('handles localStorage throwing errors gracefully and uses in-memory map', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const setSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });
      const getSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('SecurityError');
      });
      const removeSpy = vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('SecurityError');
      });

      expect(safeSetStorage('testErrorKey', 'value123')).toBe(true);
      expect(safeGetStorage('testErrorKey', 'defaultVal')).toBe('value123');
      expect(safeGetStorage('missingKey', 'fallback')).toBe('fallback');
      expect(safeRemoveStorage('testErrorKey')).toBe(true);
      expect(safeGetStorage('testErrorKey', 'gone')).toBe('gone');

      setSpy.mockRestore();
      getSpy.mockRestore();
      removeSpy.mockRestore();
      warnSpy.mockRestore();
    });

    it('performs normal get, set, and remove operations with local storage', () => {
      expect(safeSetStorage('normalKey', 'hello')).toBe(true);
      expect(safeGetStorage('normalKey')).toBe('hello');
      expect(safeRemoveStorage('normalKey')).toBe(true);
      expect(safeGetStorage('normalKey', 'default')).toBe('default');
    });
  });
});
