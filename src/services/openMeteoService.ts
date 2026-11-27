import { CityAirData, PollutantDetail, HourlyForecast, DailyForecast } from '../types';
import { CITIES_DATABASE, DEFAULT_FALLBACK_CITY } from '../data/cities';
import { getCategoryFromAQI, WHO_STANDARD_LIMITS } from '../constants/aqi';

/** Open-Meteo geocoding search result. */
export interface OpenMeteoGeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
}

/** Open-Meteo air quality response payload. */
export interface OpenMeteoAirQualityResponse {
  current?: {
    time?: string;
    us_aqi?: number;
    pm10?: number;
    pm2_5?: number;
    carbon_monoxide?: number;
    nitrogen_dioxide?: number;
    sulphur_dioxide?: number;
    ozone?: number;
  };
  hourly?: {
    time?: string[];
    us_aqi?: number[];
    pm2_5?: number[];
  };
  daily?: {
    time?: string[];
    us_aqi_max?: number[];
    us_aqi_min?: number[];
  };
}

/** Open-Meteo weather response payload. */
export interface OpenMeteoWeatherResponse {
  current?: {
    temperature_2m?: number;
    relative_humidity_2m?: number;
    wind_speed_10m?: number;
  };
  hourly?: {
    time?: string[];
    temperature_2m?: number[];
  };
}

/** Telemetry fetch options. */
export interface FetchAirQualityOptions {
  timeoutMs?: number;
  forceRefresh?: boolean;
}

/** Result envelope returning CityAirData and connectivity metadata. */
export interface AirQualityFetchResult {
  data: CityAirData;
  isLive: boolean;
  isRateLimited?: boolean;
  errorMessage?: string;
}

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, { data: CityAirData; timestamp: number }>();

/**
 * Retrieves unexpired cached telemetry for the given key.
 *
 * @param key - Cache identifier (city name or coords string).
 * @returns Cached CityAirData or null if expired/missing.
 */
export function getCachedAirQuality(key: string): CityAirData | null {
  const entry = cache.get(key.toLowerCase());
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(key.toLowerCase());
    return null;
  }
  return entry.data;
}

/**
 * Caches telemetry data with a fresh timestamp.
 *
 * @param key - Cache identifier.
 * @param data - CityAirData to cache.
 */
export function setCachedAirQuality(key: string, data: CityAirData): void {
  cache.set(key.toLowerCase(), { data, timestamp: Date.now() });
}

/** Clears all in-memory telemetry cache entries. */
export function clearAirQualityCache(): void {
  cache.clear();
}

/**
 * Performs a fetch with AbortController timeout handling.
 *
 * @param url - Destination endpoint.
 * @param timeoutMs - Max wait duration before cancellation.
 * @returns Response object with parsed JSON or error status.
 */
export async function fetchJsonWithTimeout<T>(
  url: string,
  timeoutMs: number = 8000
): Promise<{ ok: boolean; status: number; data?: T; error?: string }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) {
      return { ok: false, status: response.status, error: `HTTP ${response.status}` };
    }
    const data = (await response.json()) as T;
    return { ok: true, status: response.status, data };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const message = err instanceof Error ? err.message : 'Network request failed';
    return { ok: false, status: 0, error: message };
  }
}

/**
 * Resolves latitude and longitude for a city name via Open-Meteo Geocoding.
 *
 * @param cityName - Name of the city to locate.
 * @param timeoutMs - Max timeout in milliseconds.
 * @returns GeocodedLocation or null.
 */
export async function geocodeCityQuery(
  cityName: string,
  timeoutMs: number = 8000
): Promise<OpenMeteoGeocodingResult | null> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName.trim())}&count=1&language=en&format=json`;
  const result = await fetchJsonWithTimeout<{ results?: OpenMeteoGeocodingResult[] }>(
    url,
    timeoutMs
  );
  if (!result.ok || !result.data?.results || result.data.results.length === 0) {
    return null;
  }
  return result.data.results[0] ?? null;
}

/**
 * Constructs the Open-Meteo Air Quality API query URL.
 *
 * @param lat - Latitude coordinate.
 * @param lng - Longitude coordinate.
 * @returns Full API endpoint URL.
 */
export function buildAirQualityUrl(lat: number, lng: number): string {
  return `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&current=us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&hourly=us_aqi,pm2_5&daily=us_aqi_max,us_aqi_min&timezone=auto`;
}

/**
 * Constructs the Open-Meteo Weather Forecast API query URL.
 *
 * @param lat - Latitude coordinate.
 * @param lng - Longitude coordinate.
 * @returns Full API endpoint URL.
 */
export function buildWeatherUrl(lat: number, lng: number): string {
  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m&timezone=auto`;
}

/** Maps raw Open-Meteo current air measurements to typed PollutantDetail records. */
function mapPollutants(
  current?: OpenMeteoAirQualityResponse['current']
): CityAirData['pollutants'] {
  const pm25Val = Math.max(0, Math.round((current?.pm2_5 ?? 25) * 10) / 10);
  const pm10Val = Math.max(0, Math.round((current?.pm10 ?? 45) * 10) / 10);
  const no2Val = Math.max(0, Math.round((current?.nitrogen_dioxide ?? 22) * 10) / 10);
  const so2Val = Math.max(0, Math.round((current?.sulphur_dioxide ?? 12) * 10) / 10);
  const coVal = Math.max(0, Math.round(((current?.carbon_monoxide ?? 450) / 1000) * 10) / 10);
  const o3Val = Math.max(0, Math.round((current?.ozone ?? 40) * 10) / 10);

  const getStatus = (val: number, limit: number): PollutantDetail['status'] =>
    val <= limit
      ? 'Good'
      : val <= limit * 2
        ? 'Moderate'
        : val <= limit * 3
          ? 'Unhealthy'
          : 'Hazardous';

  return {
    pm25: {
      code: 'PM2.5',
      name: 'Fine Particulate Matter',
      value: pm25Val,
      unit: 'µg/m³',
      status: getStatus(pm25Val, WHO_STANDARD_LIMITS.pm25),
      standardLimit: WHO_STANDARD_LIMITS.pm25,
      explanation: 'Fine respirable combustion particles penetrating deep into lungs.'
    },
    pm10: {
      code: 'PM10',
      name: 'Coarse Particulate Matter',
      value: pm10Val,
      unit: 'µg/m³',
      status: getStatus(pm10Val, WHO_STANDARD_LIMITS.pm10),
      standardLimit: WHO_STANDARD_LIMITS.pm10,
      explanation: 'Inhalable dust, mechanical abrasion particles, and road grit.'
    },
    no2: {
      code: 'NO2',
      name: 'Nitrogen Dioxide',
      value: no2Val,
      unit: 'µg/m³',
      status: getStatus(no2Val, WHO_STANDARD_LIMITS.no2),
      standardLimit: WHO_STANDARD_LIMITS.no2,
      explanation: 'Vehicle and power generation exhaust causing bronchial irritation.'
    },
    so2: {
      code: 'SO2',
      name: 'Sulfur Dioxide',
      value: so2Val,
      unit: 'µg/m³',
      status: getStatus(so2Val, WHO_STANDARD_LIMITS.so2),
      standardLimit: WHO_STANDARD_LIMITS.so2,
      explanation: 'Industrial smelting and coal combustion gas causing throat tightness.'
    },
    co: {
      code: 'CO',
      name: 'Carbon Monoxide',
      value: coVal,
      unit: 'mg/m³',
      status: getStatus(coVal, WHO_STANDARD_LIMITS.co),
      standardLimit: WHO_STANDARD_LIMITS.co,
      explanation: 'Incomplete fuel combustion gas impairing blood oxygenation.'
    },
    o3: {
      code: 'O3',
      name: 'Ground-Level Ozone',
      value: o3Val,
      unit: 'µg/m³',
      status: getStatus(o3Val, WHO_STANDARD_LIMITS.o3),
      standardLimit: WHO_STANDARD_LIMITS.o3,
      explanation: 'Photochemical smog oxidant formed by sunlight reacting with VOCs.'
    }
  };
}

/** Formats hourly trend points from Open-Meteo time series. */
function mapHourlyTrend(
  hourly?: OpenMeteoAirQualityResponse['hourly'],
  weatherHourly?: OpenMeteoWeatherResponse['hourly']
): HourlyForecast[] {
  if (!hourly?.time || hourly.time.length === 0) {
    return DEFAULT_FALLBACK_CITY.hourlyTrend;
  }
  const points: HourlyForecast[] = [];
  const count = Math.min(24, hourly.time.length);
  for (let i = 0; i < count; i += 3) {
    const timeStr = hourly.time[i] ?? '00:00';
    const hours = timeStr.includes('T') ? (timeStr.split('T')[1]?.slice(0, 5) ?? '12:00') : timeStr;
    points.push({
      time: hours,
      aqi: Math.round(hourly.us_aqi?.[i] ?? 50),
      pm25: Math.round(hourly.pm2_5?.[i] ?? 25),
      temp: Math.round(weatherHourly?.temperature_2m?.[i] ?? 22)
    });
  }
  return points;
}

/** Maps daily forecast array from Open-Meteo. */
function mapDailyForecast(daily?: OpenMeteoAirQualityResponse['daily']): DailyForecast[] {
  if (!daily?.time || daily.time.length === 0) {
    return DEFAULT_FALLBACK_CITY.dailyForecast;
  }
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  return daily.time.slice(0, 7).map((dateStr, i) => {
    const d = new Date(dateStr);
    const day = daysOfWeek[d.getDay()] ?? 'Today';
    const dateFormatted = `${months[d.getMonth()] ?? ''} ${d.getDate()}`;
    const maxAqi = Math.round(daily.us_aqi_max?.[i] ?? 75);
    const minAqi = Math.round(daily.us_aqi_min?.[i] ?? 40);
    const avgAqi = Math.round((maxAqi + minAqi) / 2);
    return {
      day,
      date: dateFormatted,
      aqi: avgAqi,
      maxAqi,
      minAqi,
      category: getCategoryFromAQI(maxAqi),
      temp: 24,
      weatherCondition: avgAqi > 200 ? 'Severe Smog' : avgAqi > 100 ? 'Hazy' : 'Clear Skies'
    };
  });
}

/** Derives structured health advice matrix based on computed AQI. */
function deriveHealthAdvice(aqi: number): CityAirData['healthAdvice'] {
  if (aqi <= 50) {
    return {
      mask: {
        required: false,
        type: 'Mask Optional',
        advice: 'Air quality is satisfactory; clean ambient air.'
      },
      exercise: {
        allowed: true,
        advice: 'Ideal conditions for outdoor running, workouts, and sports.'
      },
      sensitiveGroups: {
        warning: false,
        advice: 'No special health precautions needed for sensitive groups.'
      },
      ventilation: {
        openWindows: true,
        advice: 'Windows can be safely opened for natural room ventilation.'
      }
    };
  }
  if (aqi <= 100) {
    return {
      mask: {
        required: false,
        type: 'Mask Discretionary',
        advice: 'Acceptable quality; unusually sensitive people may feel irritation.'
      },
      exercise: {
        allowed: true,
        advice: 'Outdoor exercise is generally safe for healthy individuals.'
      },
      sensitiveGroups: {
        warning: true,
        advice: 'Asthma sufferers should carry quick-relief rescue inhalers.'
      },
      ventilation: {
        openWindows: true,
        advice: 'Moderate ventilation is safe during mid-day hours.'
      }
    };
  }
  const isSevere = aqi > 200;
  return {
    mask: {
      required: true,
      type: isSevere ? 'Certified N95 Mask Mandatory' : 'N95 Respirator Recommended',
      advice: 'Wear a well-fitted N95 mask outdoors to filter respirable soot.'
    },
    exercise: {
      allowed: false,
      advice: 'Avoid intense outdoor cardio; exercise indoors with filtered air.'
    },
    sensitiveGroups: {
      warning: true,
      advice: 'Children, seniors, and cardiopulmonary patients should remain indoors.'
    },
    ventilation: {
      openWindows: false,
      advice: 'Keep windows closed; run HEPA air cleaners continuously.'
    }
  };
}

/** Assembles full CityAirData from live API payloads. */
function assembleLiveCityData(
  geo: { name: string; latitude: number; longitude: number; country?: string; admin1?: string },
  airData: OpenMeteoAirQualityResponse,
  weatherData?: OpenMeteoWeatherResponse
): CityAirData {
  const currentAqi = Math.max(1, Math.round(airData.current?.us_aqi ?? 50));
  const category = getCategoryFromAQI(currentAqi);
  const now = new Date();
  const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Match existing local image if known city
  const matched = CITIES_DATABASE.find(
    (c) => c.name.toLowerCase() === geo.name.toLowerCase() || c.id === geo.name.toLowerCase()
  );

  return {
    id: geo.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    name: geo.name,
    stateOrRegion: geo.admin1 ?? 'Metro Basin',
    country: geo.country ?? 'Global Station',
    lat: geo.latitude,
    lng: geo.longitude,
    currentAqi,
    category,
    updatedAt: `${timeFormatted} (Live)`,
    dataSource: 'live',
    image: matched?.image ?? '/assets/images/hero-city.webp',
    inversionAdvisory: matched?.inversionAdvisory,
    weather: {
      temp: Math.round(weatherData?.current?.temperature_2m ?? 24),
      humidity: Math.round(weatherData?.current?.relative_humidity_2m ?? 55),
      windSpeed: Math.round(weatherData?.current?.wind_speed_10m ?? 8),
      condition:
        currentAqi > 200 ? 'Hazy Smog' : currentAqi > 100 ? 'Moderate Haze' : 'Clear Ambient'
    },
    pollutants: mapPollutants(airData.current),
    hourlyTrend: mapHourlyTrend(airData.hourly, weatherData?.hourly),
    dailyForecast: mapDailyForecast(airData.daily),
    healthAdvice: deriveHealthAdvice(currentAqi)
  };
}

/**
 * Finds offline fallback city from local database when network fails.
 *
 * @param query - City name or identifier.
 * @returns Matched or default fallback CityAirData with labeled source.
 */
export function getOfflineFallbackCity(query?: string): CityAirData {
  const clean = query?.toLowerCase().trim();
  const match = clean
    ? CITIES_DATABASE.find((c) => c.name.toLowerCase() === clean || c.id === clean)
    : undefined;
  const fallback = match ?? DEFAULT_FALLBACK_CITY;
  return {
    ...fallback,
    dataSource: 'fallback',
    updatedAt: `Offline verified sample (${fallback.updatedAt})`
  };
}

/**
 * Primary telemetry fetcher: Queries Open-Meteo Geocoding, Air Quality, and Weather APIs.
 * Includes timeout handling, 429 rate-limit resilience, in-memory caching, and offline fallback.
 *
 * @param cityName - Name of the city to query.
 * @param options - Configuration options (timeoutMs, forceRefresh).
 * @returns AirQualityFetchResult containing live data or labeled offline fallback.
 */
export async function fetchLiveAirQuality(
  cityName: string,
  options: FetchAirQualityOptions = {}
): Promise<AirQualityFetchResult> {
  const cleanName = cityName.trim();
  if (!cleanName) {
    return {
      data: getOfflineFallbackCity(),
      isLive: false,
      errorMessage: 'Empty city name provided.'
    };
  }

  if (!options.forceRefresh) {
    const cached = getCachedAirQuality(cleanName);
    if (cached) return { data: cached, isLive: true };
  }

  const geo = await geocodeCityQuery(cleanName, options.timeoutMs);
  if (!geo) {
    return {
      data: getOfflineFallbackCity(cleanName),
      isLive: false,
      errorMessage: `Could not locate "${cleanName}". Showing verified offline sample data.`
    };
  }

  return fetchLiveAirQualityByCoords(geo.latitude, geo.longitude, geo.name, {
    ...options,
    country: geo.country,
    admin1: geo.admin1
  });
}

/**
 * Coordinates telemetry fetcher: Used for GPS Geolocation ("Use my location") and direct lat/lon queries.
 *
 * @param lat - Latitude coordinate.
 * @param lng - Longitude coordinate.
 * @param locationLabel - Human-readable label for the location.
 * @param options - Configuration options.
 * @returns AirQualityFetchResult containing live data or labeled offline fallback.
 */
export async function fetchLiveAirQualityByCoords(
  lat: number,
  lng: number,
  locationLabel: string = 'Current Location',
  options: FetchAirQualityOptions & { country?: string; admin1?: string } = {}
): Promise<AirQualityFetchResult> {
  const cacheKey = `${lat.toFixed(3)},${lng.toFixed(3)}`;
  if (!options.forceRefresh) {
    const cached = getCachedAirQuality(cacheKey);
    if (cached) return { data: cached, isLive: true };
  }

  const airUrl = buildAirQualityUrl(lat, lng);
  const weatherUrl = buildWeatherUrl(lat, lng);
  const timeoutMs = options.timeoutMs ?? 8000;

  const [airRes, weatherRes] = await Promise.all([
    fetchJsonWithTimeout<OpenMeteoAirQualityResponse>(airUrl, timeoutMs),
    fetchJsonWithTimeout<OpenMeteoWeatherResponse>(weatherUrl, timeoutMs)
  ]);

  if (!airRes.ok) {
    const isRateLimited = airRes.status === 429;
    const msg = isRateLimited
      ? 'Open-Meteo telemetry rate limit reached. Displaying verified sample data.'
      : 'Live telemetry network unavailable. Displaying verified sample data.';
    return {
      data: getOfflineFallbackCity(locationLabel),
      isLive: false,
      isRateLimited,
      errorMessage: msg
    };
  }

  const liveData = assembleLiveCityData(
    {
      name: locationLabel,
      latitude: lat,
      longitude: lng,
      country: options.country,
      admin1: options.admin1
    },
    airRes.data ?? {},
    weatherRes.data
  );

  setCachedAirQuality(cacheKey, liveData);
  setCachedAirQuality(locationLabel, liveData);
  return { data: liveData, isLive: true };
}
