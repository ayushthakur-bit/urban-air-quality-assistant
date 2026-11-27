import { CityAirData, PollutantDetail, HourlyForecast, DailyForecast } from '../types';
import { CITIES_DATABASE, DEFAULT_FALLBACK_CITY } from '../data/cities';
import { getCategoryFromAQI, WHO_STANDARD_LIMITS } from '../constants/aqi';
import { sanitizeInput } from '../utils/security';

/** Result of input validation for city search queries. */
export interface ValidationResult {
  isValid: boolean;
  sanitized: string;
  errorMessage?: string;
}

/**
 * Validates and sanitizes a user-entered city search string.
 *
 * @param query - Raw search query from user.
 * @returns ValidationResult with validity flag and sanitized string.
 */
export function validateCitySearchInput(query: string): ValidationResult {
  if (!query || typeof query !== 'string') {
    return { isValid: false, sanitized: '', errorMessage: 'Please enter a city name to search.' };
  }
  const sanitized = sanitizeInput(query, 60);
  if (sanitized.length < 2) {
    return { isValid: false, sanitized, errorMessage: 'City name must be at least 2 characters long.' };
  }
  if (/^\d+$/.test(sanitized)) {
    return { isValid: false, sanitized, errorMessage: 'Please enter an alphabetic city name, not solely numbers.' };
  }
  return { isValid: true, sanitized };
}

/**
 * Finds the nearest monitored city in the database using Euclidean distance.
 *
 * @param latitude - GPS latitude coordinate (-90 to 90).
 * @param longitude - GPS longitude coordinate (-180 to 180).
 * @returns CityAirData of the closest metropolitan monitoring station.
 */
export function findNearestCity(latitude: number, longitude: number): CityAirData {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return DEFAULT_FALLBACK_CITY;
  }
  let closestCity: CityAirData = DEFAULT_FALLBACK_CITY;
  let minDistance = Infinity;

  for (const city of CITIES_DATABASE) {
    const dist = Math.hypot(city.lat - latitude, city.lng - longitude);
    if (dist < minDistance) {
      minDistance = dist;
      closestCity = city;
    }
  }

  return {
    ...closestCity,
    name: `${closestCity.name} (Nearest Station)`,
    updatedAt: 'Detected via GPS Station'
  };
}

/** Constructs synthetic pollutant breakdown for estimated cities. */
function buildSyntheticPollutants(baseAqi: number): CityAirData['pollutants'] {
  const getStatus = (v: number, l: number): PollutantDetail['status'] =>
    v <= l ? 'Good' : v <= l * 2 ? 'Moderate' : 'Unhealthy';

  const pm25 = Number((baseAqi * 0.28).toFixed(1));
  const pm10 = Number((baseAqi * 0.45).toFixed(1));
  const no2 = Number((baseAqi * 0.22).toFixed(1));
  const so2 = Number((baseAqi * 0.12).toFixed(1));
  const co = Number(((baseAqi * 4.5) / 1000).toFixed(2));
  const o3 = Number((baseAqi * 0.35).toFixed(1));

  return {
    pm25: { code: 'PM2.5', name: 'Fine Particulate Matter', value: pm25, unit: 'µg/m³', status: getStatus(pm25, WHO_STANDARD_LIMITS.pm25), standardLimit: WHO_STANDARD_LIMITS.pm25, explanation: 'Combustion particles from traffic & industry.' },
    pm10: { code: 'PM10', name: 'Coarse Particulates', value: pm10, unit: 'µg/m³', status: getStatus(pm10, WHO_STANDARD_LIMITS.pm10), standardLimit: WHO_STANDARD_LIMITS.pm10, explanation: 'Suspended dust and mechanical abrasion.' },
    no2: { code: 'NO2', name: 'Nitrogen Dioxide', value: no2, unit: 'µg/m³', status: getStatus(no2, WHO_STANDARD_LIMITS.no2), standardLimit: WHO_STANDARD_LIMITS.no2, explanation: 'Vehicle emissions causing respiratory irritation.' },
    so2: { code: 'SO2', name: 'Sulfur Dioxide', value: so2, unit: 'µg/m³', status: getStatus(so2, WHO_STANDARD_LIMITS.so2), standardLimit: WHO_STANDARD_LIMITS.so2, explanation: 'Industrial power generation byproduct.' },
    co: { code: 'CO', name: 'Carbon Monoxide', value: co, unit: 'mg/m³', status: getStatus(co, WHO_STANDARD_LIMITS.co), standardLimit: WHO_STANDARD_LIMITS.co, explanation: 'Incomplete combustion exhaust.' },
    o3: { code: 'O3', name: 'Ozone', value: o3, unit: 'µg/m³', status: getStatus(o3, WHO_STANDARD_LIMITS.o3), standardLimit: WHO_STANDARD_LIMITS.o3, explanation: 'Photochemical smog secondary oxidant.' }
  };
}

/** Constructs synthetic 24-hour diurnal trend for estimated cities. */
function buildSyntheticHourly(baseAqi: number): HourlyForecast[] {
  const times = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
  return times.map((t, i) => {
    const factor = [0.85, 0.9, 1.15, 1.25, 0.95, 0.8, 1.1, 1.0][i] ?? 1.0;
    return {
      time: t,
      aqi: Math.round(baseAqi * factor),
      pm25: Number((baseAqi * factor * 0.28).toFixed(1)),
      temp: 22 - (i % 3)
    };
  });
}

/** Constructs synthetic 7-day extended forecast for estimated cities. */
function buildSyntheticDaily(baseAqi: number): DailyForecast[] {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((d, i) => {
    const aqi = Math.max(10, Math.round(baseAqi + (i - 3) * 6));
    return {
      day: d,
      date: `Nov ${23 + i}`,
      aqi,
      maxAqi: Math.round(aqi * 1.15),
      minAqi: Math.round(aqi * 0.85),
      category: getCategoryFromAQI(aqi),
      temp: 24,
      weatherCondition: aqi > 150 ? 'Smog Haze' : 'Partly Cloudy'
    };
  });
}

/** Formats a numeric pollutant reading safely for display, supporting optional units. */
export function formatPollutantValue(value: number, unitOrDecimals: string | number = 1): string {
  if (typeof unitOrDecimals === 'string') {
    const valStr = !Number.isFinite(value) || value < 0 ? '0' : String(value);
    return `${valStr} ${unitOrDecimals}`;
  }
  if (!Number.isFinite(value) || value < 0) return '0.0';
  return value.toFixed(unitOrDecimals);
}

/**
 * Generates an estimated, physically consistent Air Quality dataset for custom cities
 * not currently indexed in the core metropolitan database.
 *
 * @param cityName - Name of the custom city.
 * @param explicitAqi - Optional explicit baseline AQI for deterministic testing.
 * @returns Fully constructed CityAirData record.
 */
export function generateEstimatedCityData(cityName: string, explicitAqi?: number): CityAirData {
  const clean = sanitizeInput(cityName, 50) || 'Global Station';
  const name = clean.charAt(0).toUpperCase() + clean.slice(1);
  const baseAqi = Number.isFinite(explicitAqi) ? Math.max(0, Math.round(explicitAqi!)) : 68;
  const isHigh = baseAqi > 150;

  return {
    id: `custom-${Date.now()}`,
    name,
    stateOrRegion: 'Regional Air Basin',
    country: 'Global Station',
    lat: 0,
    lng: 0,
    currentAqi: baseAqi,
    category: getCategoryFromAQI(baseAqi),
    updatedAt: 'Just now (Live Interpolation)',
    weather: { temp: 18, humidity: 55, windSpeed: 8, condition: isHigh ? 'Atmospheric Haze' : 'Partly Cloudy' },
    pollutants: buildSyntheticPollutants(baseAqi),
    hourlyTrend: buildSyntheticHourly(baseAqi),
    dailyForecast: buildSyntheticDaily(baseAqi),
    healthAdvice: {
      mask: { required: isHigh, type: isHigh ? 'N95 Respirator' : 'Optional', advice: isHigh ? 'Wear N95 outdoors.' : 'No mask required.' },
      exercise: { allowed: !isHigh, advice: isHigh ? 'Move workouts indoors.' : 'Safe for outdoor exercise.' },
      sensitiveGroups: { warning: baseAqi > 100, advice: 'Vulnerable individuals should limit prolonged outdoor exertion.' },
      ventilation: { openWindows: !isHigh, advice: isHigh ? 'Keep windows sealed; use filtration.' : 'Safe natural ventilation.' }
    }
  };
}
