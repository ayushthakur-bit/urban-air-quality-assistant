import { CityAirData } from '../types';
import { CITIES_DATABASE } from '../data/cities';
import { getCategoryFromAQI, WHO_STANDARD_LIMITS } from '../constants/aqi';
import { sanitizeInput } from '../utils/security';

/**
 * Result of input validation for city search queries.
 */
export interface ValidationResult {
  isValid: boolean;
  sanitized: string;
  errorMessage?: string;
}

/**
 * Validates and sanitizes a user-entered city search string.
 * Enforces length limits and strips malicious/control characters.
 *
 * @param query - Raw search query from user.
 * @returns ValidationResult object containing validity boolean, sanitized text, and optional error message.
 */
export function validateCitySearchInput(query: string): ValidationResult {
  if (!query || typeof query !== 'string') {
    return {
      isValid: false,
      sanitized: '',
      errorMessage: 'Please enter a city name to search.'
    };
  }

  const sanitized = sanitizeInput(query, 60);

  if (sanitized.length < 2) {
    return {
      isValid: false,
      sanitized,
      errorMessage: 'City name must be at least 2 characters long.'
    };
  }

  // Prevent numeric-only searches
  if (/^\d+$/.test(sanitized)) {
    return {
      isValid: false,
      sanitized,
      errorMessage: 'Please enter a valid alphabetic city name, not solely numbers.'
    };
  }

  return {
    isValid: true,
    sanitized
  };
}

/**
 * Finds the nearest monitored city in the database using Euclidean distance.
 * Gracefully handles non-finite coordinates by returning the primary reference station (Delhi).
 *
 * @param latitude - GPS latitude coordinate (-90 to 90).
 * @param longitude - GPS longitude coordinate (-180 to 180).
 * @returns CityAirData of the closest metropolitan monitoring station.
 */
export function findNearestCity(latitude: number, longitude: number): CityAirData {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return CITIES_DATABASE[0];
  }

  let closestCity = CITIES_DATABASE[0];
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

/**
 * Generates an estimated, physically consistent Air Quality dataset for custom cities
 * not currently indexed in the core metropolitan database.
 *
 * @param cityName - Name of the custom city.
 * @param explicitAqi - Optional explicit baseline AQI for deterministic testing.
 * @returns Fully constructed CityAirData record.
 */
export function generateEstimatedCityData(cityName: string, explicitAqi?: number): CityAirData {
  const cleanName = sanitizeInput(cityName, 50) || 'Global Station';
  const capitalized = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

  // Use explicit AQI if provided (useful for tests), else generate a moderate/elevated reading
  const baseAqi =
    typeof explicitAqi === 'number' && Number.isFinite(explicitAqi)
      ? Math.max(0, Math.round(explicitAqi))
      : Math.floor(Math.random() * 80 + 35);

  const category = getCategoryFromAQI(baseAqi);
  const isHighSmog = baseAqi > 150;

  return {
    id: `custom-${Date.now()}`,
    name: capitalized,
    stateOrRegion: 'Regional Air Basin',
    country: 'Global Station',
    lat: 0,
    lng: 0,
    currentAqi: baseAqi,
    category,
    updatedAt: 'Just now (Live Interpolation)',
    weather: {
      temp: 18,
      humidity: 55,
      windSpeed: 8,
      condition: isHighSmog ? 'Atmospheric Haze' : 'Partly Cloudy'
    },
    pollutants: {
      pm25: {
        code: 'PM2.5',
        name: 'Fine Particulate Matter',
        value: Number((baseAqi * 0.28).toFixed(1)),
        unit: 'µg/m³',
        status: baseAqi <= 50 ? 'Good' : baseAqi <= 100 ? 'Moderate' : 'Unhealthy',
        standardLimit: WHO_STANDARD_LIMITS.PM25,
        explanation:
          'Microscopic particles (< 2.5µm) from traffic combustion and atmospheric aerosols.'
      },
      pm10: {
        code: 'PM10',
        name: 'Coarse Particulates',
        value: Number((baseAqi * 0.45).toFixed(1)),
        unit: 'µg/m³',
        status: baseAqi <= 50 ? 'Good' : baseAqi <= 100 ? 'Moderate' : 'Unhealthy',
        standardLimit: WHO_STANDARD_LIMITS.PM10,
        explanation: 'Inhalable dust, pollen, and ground construction sediment.'
      },
      no2: {
        code: 'NO2',
        name: 'Nitrogen Dioxide',
        value: Math.floor(baseAqi * 0.25),
        unit: 'ppb',
        status: 'Good',
        standardLimit: WHO_STANDARD_LIMITS.NO2,
        explanation: 'Combustion byproduct from urban vehicle traffic.'
      },
      so2: {
        code: 'SO2',
        name: 'Sulfur Dioxide',
        value: Math.floor(baseAqi * 0.08),
        unit: 'ppb',
        status: 'Good',
        standardLimit: WHO_STANDARD_LIMITS.SO2,
        explanation: 'Low baseline from regional industrial fuel combustion.'
      },
      co: {
        code: 'CO',
        name: 'Carbon Monoxide',
        value: Number((baseAqi * 0.01).toFixed(1)),
        unit: 'ppm',
        status: 'Good',
        standardLimit: WHO_STANDARD_LIMITS.CO,
        explanation: 'Trace byproduct of incomplete gasoline combustion.'
      },
      o3: {
        code: 'O3',
        name: 'Ground Ozone',
        value: Math.floor(baseAqi * 0.35),
        unit: 'ppb',
        status: 'Good',
        standardLimit: WHO_STANDARD_LIMITS.O3,
        explanation: 'Photochemical smog component formed under direct sunlight.'
      }
    },
    hourlyTrend: Array.from({ length: 8 }).map((_, i) => ({
      time: `${String(i * 3).padStart(2, '0')}:00`,
      aqi: Math.max(10, Math.floor(baseAqi + Math.sin(i) * 12)),
      pm25: Number((baseAqi * 0.28).toFixed(1)),
      temp: 18
    })),
    dailyForecast: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => ({
      day,
      date: 'Projections',
      aqi: Math.max(15, Math.floor(baseAqi + Math.sin(day.charCodeAt(0)) * 10)),
      maxAqi: baseAqi + 12,
      minAqi: Math.max(10, baseAqi - 12),
      category: getCategoryFromAQI(baseAqi),
      temp: 18,
      weatherCondition: isHighSmog ? 'Hazy' : 'Clear'
    })),
    healthAdvice: {
      mask: {
        required: isHighSmog,
        type: isHighSmog ? 'N95 / KN95 Respirator' : 'None needed',
        advice: isHighSmog
          ? 'Wear a certified N95 particulate respirator when outdoors.'
          : 'Air is within acceptable guidelines for normal breathing.'
      },
      exercise: {
        allowed: !isHighSmog,
        advice: !isHighSmog
          ? 'Safe conditions for outdoor walks and cardio exercise.'
          : 'Shift heavy cardio workouts indoors to reduce deep pulmonary ventilation.'
      },
      sensitiveGroups: {
        warning: baseAqi > 100,
        advice:
          baseAqi > 100
            ? 'Children, older adults, and asthmatics should monitor for coughing or chest tightness.'
            : 'Low exposure risk for sensitive individuals.'
      },
      ventilation: {
        openWindows: !isHighSmog,
        advice: !isHighSmog
          ? 'Safe to open windows for continuous home ventilation.'
          : 'Keep windows latched shut during peak morning hours; run an indoor air purifier.'
      }
    }
  };
}

/**
 * Formats a pollutant numerical reading with its appropriate physical unit.
 *
 * @param value - Numerical concentration.
 * @param unit - Physical measurement unit string (e.g. 'µg/m³', 'ppb', 'ppm').
 * @returns Cleanly formatted string.
 */
export function formatPollutantValue(value: number, unit: string): string {
  if (!Number.isFinite(value)) return `0 ${unit}`;
  return `${value} ${unit}`;
}
