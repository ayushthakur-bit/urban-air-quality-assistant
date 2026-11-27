import { describe, it, expect } from 'vitest';
import { getPollutantBadgeClasses } from '../constants/aqi';
import { CITIES_DATABASE } from '../data/cities';

describe('Pollutants and Standard Threshold Verification', () => {
  const referenceCity = CITIES_DATABASE[0]!;

  it('includes all 6 mandated core pollutants with valid metadata and WHO limits', () => {
    const { pollutants } = referenceCity;

    // PM2.5
    expect(pollutants.pm25).toBeDefined();
    expect(pollutants.pm25.code).toBe('PM2.5');
    expect(pollutants.pm25.unit).toBe('µg/m³');
    expect(pollutants.pm25.standardLimit).toBe(15);
    expect(pollutants.pm25.value).toBeGreaterThan(0);

    // PM10
    expect(pollutants.pm10).toBeDefined();
    expect(pollutants.pm10.code).toBe('PM10');
    expect(pollutants.pm10.unit).toBe('µg/m³');
    expect(pollutants.pm10.standardLimit).toBe(45);

    // NO2
    expect(pollutants.no2).toBeDefined();
    expect(pollutants.no2.code).toBe('NO2');
    expect(pollutants.no2.unit).toBe('ppb');
    expect(pollutants.no2.standardLimit).toBe(25);

    // SO2
    expect(pollutants.so2).toBeDefined();
    expect(pollutants.so2.code).toBe('SO2');
    expect(pollutants.so2.unit).toBe('ppb');
    expect(pollutants.so2.standardLimit).toBe(20);

    // CO
    expect(pollutants.co).toBeDefined();
    expect(pollutants.co.code).toBe('CO');
    expect(pollutants.co.unit).toBe('ppm');
    expect(pollutants.co.standardLimit).toBe(4.0);

    // O3
    expect(pollutants.o3).toBeDefined();
    expect(pollutants.o3.code).toBe('O3');
    expect(pollutants.o3.unit).toBe('ppb');
    expect(pollutants.o3.standardLimit).toBe(50);
  });

  it('correctly maps pollutant statuses to high-contrast badge CSS classes', () => {
    expect(getPollutantBadgeClasses('Good')).toContain('badge-aqi-good');
    expect(getPollutantBadgeClasses('Moderate')).toContain('badge-aqi-moderate');
    expect(getPollutantBadgeClasses('Unhealthy')).toContain('badge-aqi-unhealthy');
    expect(getPollutantBadgeClasses('Hazardous')).toContain('badge-aqi-hazardous');
  });

  it('verifies that every city in CITIES_DATABASE has 24h hourly trends and 7d forecasts', () => {
    CITIES_DATABASE.forEach((city) => {
      expect(city.hourlyTrend.length).toBeGreaterThanOrEqual(8);
      expect(city.dailyForecast.length).toBe(7);
      expect(city.weather).toBeDefined();
      expect(city.healthAdvice).toBeDefined();
    });
  });
});
