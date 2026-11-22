import { describe, it, expect } from 'vitest';
import { 
  getCategoryFromAQI, 
  getAQIColorHex, 
  getAQIBadgeClasses,
  AQI_SCALE_INFO 
} from '../data/mockData';

describe('AQI Scale & Categorization Logic', () => {
  it('correctly maps AQI values to their exact standard EPA/WHO categories at boundaries', () => {
    // Good: 0 to 50
    expect(getCategoryFromAQI(0)).toBe('Good');
    expect(getCategoryFromAQI(25)).toBe('Good');
    expect(getCategoryFromAQI(50)).toBe('Good');

    // Moderate: 51 to 100
    expect(getCategoryFromAQI(51)).toBe('Moderate');
    expect(getCategoryFromAQI(75)).toBe('Moderate');
    expect(getCategoryFromAQI(100)).toBe('Moderate');

    // Unhealthy for Sensitive Groups: 101 to 150
    expect(getCategoryFromAQI(101)).toBe('Unhealthy for Sensitive Groups');
    expect(getCategoryFromAQI(125)).toBe('Unhealthy for Sensitive Groups');
    expect(getCategoryFromAQI(150)).toBe('Unhealthy for Sensitive Groups');

    // Unhealthy: 151 to 200
    expect(getCategoryFromAQI(151)).toBe('Unhealthy');
    expect(getCategoryFromAQI(175)).toBe('Unhealthy');
    expect(getCategoryFromAQI(200)).toBe('Unhealthy');

    // Very Unhealthy: 201 to 300
    expect(getCategoryFromAQI(201)).toBe('Very Unhealthy');
    expect(getCategoryFromAQI(250)).toBe('Very Unhealthy');
    expect(getCategoryFromAQI(300)).toBe('Very Unhealthy');

    // Hazardous: 301+
    expect(getCategoryFromAQI(301)).toBe('Hazardous');
    expect(getCategoryFromAQI(450)).toBe('Hazardous');
    expect(getCategoryFromAQI(500)).toBe('Hazardous');
  });

  it('provides matching high-contrast hexadecimal color codes for each AQI bracket', () => {
    expect(getAQIColorHex(30)).toBe('#10b981');  // Green (Good)
    expect(getAQIColorHex(75)).toBe('#f59e0b');  // Amber (Moderate)
    expect(getAQIColorHex(130)).toBe('#f97316'); // Orange (Sensitive)
    expect(getAQIColorHex(180)).toBe('#ef4444'); // Red (Unhealthy)
    expect(getAQIColorHex(250)).toBe('#8b5cf6'); // Purple (Very Unhealthy)
    expect(getAQIColorHex(400)).toBe('#7f1d1d'); // Maroon (Hazardous)
  });

  it('assigns high-contrast WCAG-compliant badge classes for all 6 AQI categories', () => {
    expect(getAQIBadgeClasses('Good')).toContain('badge-aqi-good');
    expect(getAQIBadgeClasses('Moderate')).toContain('badge-aqi-moderate');
    expect(getAQIBadgeClasses('Unhealthy for Sensitive Groups')).toContain('badge-aqi-sensitive');
    expect(getAQIBadgeClasses('Unhealthy')).toContain('badge-aqi-unhealthy');
    expect(getAQIBadgeClasses('Very Unhealthy')).toContain('badge-aqi-very-unhealthy');
    expect(getAQIBadgeClasses('Hazardous')).toContain('badge-aqi-hazardous');
  });

  it('verifies AQI_SCALE_INFO array contains all 6 discrete levels with descriptions', () => {
    expect(AQI_SCALE_INFO.length).toBe(6);
    const categories = AQI_SCALE_INFO.map(item => item.category);
    expect(categories).toEqual([
      'Good',
      'Moderate',
      'Unhealthy for Sensitive Groups',
      'Unhealthy',
      'Very Unhealthy',
      'Hazardous'
    ]);
  });
});
