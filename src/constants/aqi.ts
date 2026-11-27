import { AQICategory } from '../types';

/**
 * Standard EPA & WHO AQI numerical boundary thresholds.
 */
export const AQI_THRESHOLDS = {
  GOOD_MAX: 50,
  MODERATE_MAX: 100,
  SENSITIVE_MAX: 150,
  UNHEALTHY_MAX: 200,
  VERY_UNHEALTHY_MAX: 300,
  HAZARDOUS_FLOOR: 301,
  GAUGE_MAX: 500
} as const;

/**
 * Hexadecimal color tokens matching standard international AQI scales.
 * Meets WCAG AA contrast standards when paired with appropriate text colors.
 */
export const AQI_COLORS = {
  GOOD: '#10b981', // Emerald Green
  MODERATE: '#f59e0b', // Amber Yellow
  SENSITIVE: '#f97316', // Bright Orange
  UNHEALTHY: '#ef4444', // Vivid Red
  VERY_UNHEALTHY: '#8b5cf6', // Deep Purple
  HAZARDOUS: '#7f1d1d' // Maroon Dark Red
} as const;

/**
 * World Health Organization (WHO 2021) reference guideline exposure limits.
 */
export const WHO_STANDARD_LIMITS = {
  PM25: 15, // µg/m³ (24-hour mean)
  PM10: 45, // µg/m³ (24-hour mean)
  NO2: 25, // ppb (24-hour mean)
  SO2: 20, // ppb (24-hour mean)
  CO: 4.0, // ppm (24-hour mean)
  O3: 50, // ppb (8-hour daily maximum)
  pm25: 15,
  pm10: 45,
  no2: 25,
  so2: 20,
  co: 4.0,
  o3: 50
} as const;

/**
 * Gauge SVG Geometry parameters for the semicircular arc in LiveAQICard.
 */
export const GAUGE_CONFIG = {
  RADIUS: 90,
  STROKE_WIDTH: 14,
  CIRCUMFERENCE: Math.PI * 90, // ~282.74
  MAX_AQI: 500
} as const;

/**
 * Comprehensive descriptive information for all 6 discrete AQI levels.
 */
export const AQI_SCALE_INFO: {
  category: AQICategory;
  range: string;
  colorVar: string;
  hex: string;
  bgClass: string;
  textClass: string;
  description: string;
  healthAction: string;
}[] = [
  {
    category: 'Good',
    range: '0 – 50',
    colorVar: 'var(--aqi-good)',
    hex: AQI_COLORS.GOOD,
    bgClass: 'badge-aqi-good font-bold',
    textClass: 'text-emerald-800 dark:text-emerald-300',
    description: 'Air quality is satisfactory and poses little or no health risk.',
    healthAction: 'Ideal for all outdoor activities, open ventilation, and workouts.'
  },
  {
    category: 'Moderate',
    range: '51 – 100',
    colorVar: 'var(--aqi-moderate)',
    hex: AQI_COLORS.MODERATE,
    bgClass: 'badge-aqi-moderate font-bold',
    textClass: 'text-amber-900 dark:text-amber-200',
    description:
      'Air quality is acceptable. Very sensitive individuals may experience minor symptoms.',
    healthAction: 'Unusually sensitive individuals should monitor for cough or throat fatigue.'
  },
  {
    category: 'Unhealthy for Sensitive Groups',
    range: '101 – 150',
    colorVar: 'var(--aqi-sensitive)',
    hex: AQI_COLORS.SENSITIVE,
    bgClass: 'badge-aqi-sensitive font-bold',
    textClass: 'text-orange-700 dark:text-orange-300',
    description:
      'Children, older adults, and individuals with respiratory issues should limit prolonged exertion.',
    healthAction: 'Vulnerable individuals should reduce strenuous outdoor workouts.'
  },
  {
    category: 'Unhealthy',
    range: '151 – 200',
    colorVar: 'var(--aqi-unhealthy)',
    hex: AQI_COLORS.UNHEALTHY,
    bgClass: 'badge-aqi-unhealthy font-bold',
    textClass: 'text-red-700 dark:text-red-300',
    description:
      'Everyone may begin to experience adverse health effects; sensitive groups experience more serious effects.',
    healthAction: 'Wear certified N95 respirators outdoors; move cardio exercises indoors.'
  },
  {
    category: 'Very Unhealthy',
    range: '201 – 300',
    colorVar: 'var(--aqi-very-unhealthy)',
    hex: AQI_COLORS.VERY_UNHEALTHY,
    bgClass: 'badge-aqi-very-unhealthy font-bold',
    textClass: 'text-purple-700 dark:text-purple-300',
    description:
      'Health alert: the risk of health effects is significantly increased for the entire urban population.',
    healthAction: 'Avoid non-essential outdoor travel; run indoor HEPA purifiers continuously.'
  },
  {
    category: 'Hazardous',
    range: '301+',
    colorVar: 'var(--aqi-hazardous)',
    hex: AQI_COLORS.HAZARDOUS,
    bgClass: 'badge-aqi-hazardous font-bold',
    textClass: 'text-rose-700 dark:text-rose-300',
    description:
      'Emergency warnings. The entire population is likely to be affected by severe respiratory and cardiovascular strain.',
    healthAction: 'Strict quarantine indoors in sealed rooms; keep all windows latched shut.'
  }
];

/**
 * Determines the official EPA/WHO AQI category from a numeric AQI score.
 * Safely clamps negative numbers to zero.
 *
 * @param aqi - The numeric Air Quality Index score (e.g. 0 to 500+).
 * @returns The corresponding AQICategory string.
 */
export function getCategoryFromAQI(aqi: number): AQICategory {
  const safeAqi = Math.max(0, aqi);
  if (safeAqi <= AQI_THRESHOLDS.GOOD_MAX) return 'Good';
  if (safeAqi <= AQI_THRESHOLDS.MODERATE_MAX) return 'Moderate';
  if (safeAqi <= AQI_THRESHOLDS.SENSITIVE_MAX) return 'Unhealthy for Sensitive Groups';
  if (safeAqi <= AQI_THRESHOLDS.UNHEALTHY_MAX) return 'Unhealthy';
  if (safeAqi <= AQI_THRESHOLDS.VERY_UNHEALTHY_MAX) return 'Very Unhealthy';
  return 'Hazardous';
}

/**
 * Retrieves the hexadecimal color associated with an AQI numeric score.
 *
 * @param aqi - Numeric AQI value.
 * @returns Hexadecimal color string.
 */
export function getAQIColorHex(aqi: number): string {
  const safeAqi = Math.max(0, aqi);
  if (safeAqi <= AQI_THRESHOLDS.GOOD_MAX) return AQI_COLORS.GOOD;
  if (safeAqi <= AQI_THRESHOLDS.MODERATE_MAX) return AQI_COLORS.MODERATE;
  if (safeAqi <= AQI_THRESHOLDS.SENSITIVE_MAX) return AQI_COLORS.SENSITIVE;
  if (safeAqi <= AQI_THRESHOLDS.UNHEALTHY_MAX) return AQI_COLORS.UNHEALTHY;
  if (safeAqi <= AQI_THRESHOLDS.VERY_UNHEALTHY_MAX) return AQI_COLORS.VERY_UNHEALTHY;
  return AQI_COLORS.HAZARDOUS;
}

/**
 * Maps an AQI category to high-contrast WCAG-compliant badge CSS classes.
 *
 * @param category - The AQICategory name.
 * @returns Tailwind CSS classes with high contrast text.
 */
export function getAQIBadgeClasses(category: AQICategory): string {
  switch (category) {
    case 'Good':
      return 'badge-aqi-good font-bold';
    case 'Moderate':
      return 'badge-aqi-moderate font-bold';
    case 'Unhealthy for Sensitive Groups':
      return 'badge-aqi-sensitive font-bold';
    case 'Unhealthy':
      return 'badge-aqi-unhealthy font-bold';
    case 'Very Unhealthy':
      return 'badge-aqi-very-unhealthy font-bold';
    case 'Hazardous':
    default:
      return 'badge-aqi-hazardous font-bold';
  }
}

/**
 * Maps a single pollutant's health status to high-contrast badge CSS classes.
 *
 * @param status - 'Good' | 'Moderate' | 'Unhealthy' | 'Hazardous'
 * @returns Tailwind CSS classes with high contrast text.
 */
export function getPollutantBadgeClasses(
  status: 'Good' | 'Moderate' | 'Unhealthy' | 'Hazardous'
): string {
  switch (status) {
    case 'Good':
      return 'badge-aqi-good font-bold';
    case 'Moderate':
      return 'badge-aqi-moderate font-bold';
    case 'Unhealthy':
      return 'badge-aqi-unhealthy font-bold';
    case 'Hazardous':
    default:
      return 'badge-aqi-hazardous font-bold';
  }
}
