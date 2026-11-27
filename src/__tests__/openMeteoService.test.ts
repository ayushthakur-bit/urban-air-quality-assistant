import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchLiveAirQuality,
  fetchLiveAirQualityByCoords,
  clearAirQualityCache,
  getCachedAirQuality,
  setCachedAirQuality,
  geocodeCityQuery
} from '../services/openMeteoService';
import { DEFAULT_FALLBACK_CITY } from '../data/cities';

describe('Open-Meteo Air Quality Service Suite', () => {
  beforeEach(() => {
    clearAirQualityCache();
    vi.restoreAllMocks();
  });

  describe('Geocoding & City Resolution', () => {
    it('returns geocoded coordinates when search matches a city', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          results: [
            { id: 101, name: 'Berlin', latitude: 52.52, longitude: 13.405, country: 'Germany' }
          ]
        })
      });

      const res = await geocodeCityQuery('Berlin');
      expect(res).not.toBeNull();
      expect(res?.name).toBe('Berlin');
      expect(res?.latitude).toBe(52.52);
    });

    it('returns null when geocoding service yields no matching locations', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ results: [] })
      });

      const res = await geocodeCityQuery('NonExistentPlaceXYZ');
      expect(res).toBeNull();
    });
  });

  describe('Live Telemetry Fetching', () => {
    it('fetches live air quality and weather telemetry successfully', async () => {
      global.fetch = vi.fn().mockImplementation((url: string) => {
        if (url.includes('geocoding-api')) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: async () => ({
              results: [
                { id: 1, name: 'Tokyo', latitude: 35.68, longitude: 139.76, country: 'Japan' }
              ]
            })
          });
        }
        if (url.includes('air-quality-api')) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: async () => ({
              current: {
                us_aqi: 42,
                pm2_5: 10.2,
                pm10: 22.1,
                carbon_monoxide: 300,
                nitrogen_dioxide: 18,
                sulphur_dioxide: 8,
                ozone: 25
              },
              hourly: {
                time: ['2026-11-23T00:00', '2026-11-23T03:00'],
                us_aqi: [40, 45],
                pm2_5: [10, 12]
              },
              daily: { time: ['2026-11-23'], us_aqi_max: [50], us_aqi_min: [35] }
            })
          });
        }
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            current: { temperature_2m: 16, relative_humidity_2m: 60, wind_speed_10m: 11 }
          })
        });
      });

      const outcome = await fetchLiveAirQuality('Tokyo');
      expect(outcome.isLive).toBe(true);
      expect(outcome.data.name).toBe('Tokyo');
      expect(outcome.data.currentAqi).toBe(42);
      expect(outcome.data.dataSource).toBe('live');
    });

    it('falls back to local verified telemetry when API responds with 429 rate limit', async () => {
      global.fetch = vi.fn().mockImplementation((url: string) => {
        if (url.includes('geocoding-api')) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: async () => ({
              results: [
                { id: 2, name: 'Delhi', latitude: 28.61, longitude: 77.2, country: 'India' }
              ]
            })
          });
        }
        return Promise.resolve({
          ok: false,
          status: 429,
          json: async () => ({ error: true, reason: 'Daily quota exceeded' })
        });
      });

      const outcome = await fetchLiveAirQuality('Delhi');
      expect(outcome.isLive).toBe(false);
      expect(outcome.isRateLimited).toBe(true);
      expect(outcome.data.dataSource).toBe('fallback');
    });

    it('handles request timeout cleanly and serves fallback data', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('The operation was aborted'));

      const outcome = await fetchLiveAirQuality('Paris', { timeoutMs: 100 });
      expect(outcome.isLive).toBe(false);
      expect(outcome.data).toBeDefined();
      expect(outcome.data.dataSource).toBe('fallback');
    });

    it('handles empty city name gracefully without throwing', async () => {
      const outcome = await fetchLiveAirQuality('   ');
      expect(outcome.isLive).toBe(false);
      expect(outcome.data.name).toBe(DEFAULT_FALLBACK_CITY.name);
    });

    it('supports coordinate queries for geolocation workflows', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          current: {
            us_aqi: 78,
            pm2_5: 24,
            pm10: 48,
            carbon_monoxide: 400,
            nitrogen_dioxide: 20,
            sulphur_dioxide: 10,
            ozone: 30
          }
        })
      });

      const outcome = await fetchLiveAirQualityByCoords(19.076, 72.877, 'Mumbai Coastal');
      expect(outcome.isLive).toBe(true);
      expect(outcome.data.name).toBe('Mumbai Coastal');
    });
  });

  describe('In-Memory Telemetry Caching', () => {
    it('stores and retrieves cached air quality records', () => {
      const mockCity = { ...DEFAULT_FALLBACK_CITY, name: 'CacheCity', currentAqi: 88 };
      setCachedAirQuality('cachecity', mockCity);

      const cached = getCachedAirQuality('cachecity');
      expect(cached).not.toBeNull();
      expect(cached?.currentAqi).toBe(88);
    });

    it('clears cache on demand', () => {
      setCachedAirQuality('item', DEFAULT_FALLBACK_CITY);
      clearAirQualityCache();
      expect(getCachedAirQuality('item')).toBeNull();
    });

    it('returns null for expired cache entries', () => {
      const mockCity = { ...DEFAULT_FALLBACK_CITY, name: 'ExpiredCity' };
      setCachedAirQuality('expiredcity', mockCity);

      // Advance Date.now or mock it
      const originalNow = Date.now;
      Date.now = vi.fn().mockReturnValue(originalNow() + 600000); // 10 minutes later

      expect(getCachedAirQuality('expiredcity')).toBeNull();
      Date.now = originalNow;
    });

    it('handles HTTP 500 server errors cleanly and serves fallback data', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Internal server error' })
      });

      const outcome = await fetchLiveAirQuality('Berlin', { forceRefresh: true });
      expect(outcome.isLive).toBe(false);
      expect(outcome.data.dataSource).toBe('fallback');
    });

    it('handles empty hourly and daily responses cleanly', async () => {
      global.fetch = vi.fn().mockImplementation((url: string) => {
        if (url.includes('geocoding-api')) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: async () => ({
              results: [
                { id: 8, name: 'Sydney', latitude: -33.86, longitude: 151.2, country: 'Australia' }
              ]
            })
          });
        }
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            current: { us_aqi: 25, pm2_5: 6, pm10: 12 },
            hourly: {},
            daily: {}
          })
        });
      });

      const outcome = await fetchLiveAirQuality('Sydney', { forceRefresh: true });
      expect(outcome.isLive).toBe(true);
      expect(outcome.data.name).toBe('Sydney');
      expect(outcome.data.hourlyTrend.length).toBeGreaterThan(0);
      expect(outcome.data.dailyForecast.length).toBeGreaterThan(0);
    });
  });
});
