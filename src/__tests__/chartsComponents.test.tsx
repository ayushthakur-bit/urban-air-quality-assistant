import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { HourlyTrendChart, HourlyTrendTooltip } from '../components/charts/HourlyTrendChart';
import { DailyForecastChart, DailyForecastTooltip } from '../components/charts/DailyForecastChart';
import { CITIES_DATABASE } from '../data/cities';

describe('Charts Components Suite', () => {
  const mockCity = CITIES_DATABASE[0]!;

  it('renders HourlyTrendChart with 24-hour diurnal trend data', () => {
    const { container } = render(
      <HourlyTrendChart data={mockCity.hourlyTrend} currentColor="#ef4444" axisColor="#64748b" />
    );

    expect(screen.getByLabelText(/24-hour hourly AQI trend chart/i)).toBeDefined();
    expect(container.querySelector('.recharts-responsive-container')).toBeDefined();
  });

  it('renders HourlyTrendTooltip when active and inactive', () => {
    const { container, rerender } = render(
      <HourlyTrendTooltip active={true} payload={[{ payload: mockCity.hourlyTrend[0]! }]} />
    );

    expect(screen.getByText(/Time:/i)).toBeDefined();
    expect(screen.getByText(/PM2.5:/i)).toBeDefined();

    rerender(<HourlyTrendTooltip active={false} />);
    expect(container.firstChild).toBeNull();

    rerender(<HourlyTrendTooltip active={true} payload={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders DailyForecastChart with 7-day extended forecast data', () => {
    const { container } = render(
      <DailyForecastChart
        data={mockCity.dailyForecast}
        currentColor="#ef4444"
        axisColor="#64748b"
      />
    );

    expect(screen.getByLabelText(/7-day daily forecast AQI chart/i)).toBeDefined();
    expect(container.querySelector('.recharts-responsive-container')).toBeDefined();

    // Verify daily forecast breakdown cards are rendered
    mockCity.dailyForecast.forEach((day) => {
      expect(screen.getAllByText(day.day).length).toBeGreaterThan(0);
    });
  });

  it('renders DailyForecastTooltip when active and inactive', () => {
    const { container, rerender } = render(
      <DailyForecastTooltip active={true} payload={[{ payload: mockCity.dailyForecast[0]! }]} />
    );

    expect(screen.getByText(/Forecast AQI:/i)).toBeDefined();
    expect(screen.getByText(/Range:/i)).toBeDefined();

    rerender(<DailyForecastTooltip active={false} />);
    expect(container.firstChild).toBeNull();

    rerender(<DailyForecastTooltip active={true} payload={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
