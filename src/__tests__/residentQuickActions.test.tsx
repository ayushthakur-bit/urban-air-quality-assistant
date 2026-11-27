import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ResidentQuickActions } from '../components/aqi/ResidentQuickActions';
import { CITIES_DATABASE } from '../data/cities';

describe('ResidentQuickActions Component Suite', () => {
  const baseCity = CITIES_DATABASE[0]!;

  it('renders safe guidance badges when AQI is Good (<= 50)', () => {
    const goodCity = { ...baseCity, currentAqi: 35 };
    render(<ResidentQuickActions city={goodCity} />);

    expect(screen.getByText('Safe')).toBeDefined();
    expect(screen.getByText('Not Needed')).toBeDefined();
    expect(screen.getByText('Open Windows')).toBeDefined();
  });

  it('renders moderate guidance badges when AQI is Moderate (51-100)', () => {
    const moderateCity = { ...baseCity, currentAqi: 75 };
    render(<ResidentQuickActions city={moderateCity} />);

    expect(screen.getByText('Moderate')).toBeDefined();
    expect(screen.getByText('Optional')).toBeDefined();
    expect(screen.getByText('Safe Window')).toBeDefined();
  });

  it('renders advisory guidance badges when AQI is Sensitive (101-150)', () => {
    const sensitiveCity = { ...baseCity, currentAqi: 130 };
    render(<ResidentQuickActions city={sensitiveCity} />);

    expect(screen.getByText('Limit')).toBeDefined();
    expect(screen.getByText('Advisory')).toBeDefined();
    expect(screen.getByText('Timed Window')).toBeDefined();
  });

  it('renders strict protective badges when AQI is Unhealthy or Hazardous (> 150)', () => {
    const hazardousCity = { ...baseCity, currentAqi: 384 };
    render(<ResidentQuickActions city={hazardousCity} />);

    expect(screen.getByText('Avoid')).toBeDefined();
    expect(screen.getByText('N95 Required')).toBeDefined();
    expect(screen.getByText('Keep Sealed')).toBeDefined();
  });
});
