import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DailyForecast } from '../../types';
import { getAQIColorHex } from '../../constants/aqi';

interface DailyForecastChartProps {
  data: DailyForecast[];
  currentColor: string;
  axisColor: string;
}

export interface DailyTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: DailyForecast }>;
}

/** Custom tooltip rendering daily forecast breakdown. */
export const DailyForecastTooltip: React.FC<DailyTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;

  return (
    <div className="p-3 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-xl text-xs space-y-1">
      <span className="font-bold text-[var(--color-text-primary)] block border-b border-[var(--color-border)] pb-1">
        {d.day}, {d.date}
      </span>
      <div className="flex justify-between gap-4 pt-1">
        <span className="text-[var(--color-text-secondary)]">Forecast AQI:</span>
        <span className="font-bold text-[var(--color-text-primary)]">{d.aqi}</span>
      </div>
      <div className="flex justify-between gap-4">
        <span className="text-[var(--color-text-secondary)]">Category:</span>
        <span className="font-bold text-[var(--color-text-primary)]">{d.category}</span>
      </div>
      <div className="flex justify-between gap-4">
        <span className="text-[var(--color-text-secondary)]">Range:</span>
        <span className="font-semibold text-[var(--color-text-primary)]">
          {d.minAqi} – {d.maxAqi} AQI
        </span>
      </div>
    </div>
  );
};

/**
 * 7-Day extended air quality forecast bar chart with daily condition badges.
 */
export const DailyForecastChart: React.FC<DailyForecastChartProps> = ({
  data,
  currentColor,
  axisColor
}) => {
  return (
    <div>
      <div className="h-72 sm:h-80 w-full" aria-label="7-day daily forecast AQI chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="day"
              stroke={axisColor}
              fontSize={12}
              fontWeight={500}
              tickLine={false}
            />
            <YAxis
              stroke={axisColor}
              fontSize={12}
              fontWeight={500}
              tickLine={false}
              domain={[0, 'dataMax + 40']}
            />
            <Tooltip content={<DailyForecastTooltip />} />
            <Bar dataKey="aqi" radius={[8, 8, 0, 0]} fill={currentColor} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {data.map((day) => {
          const dayColor = getAQIColorHex(day.aqi);
          return (
            <div
              key={day.day}
              className="p-2.5 rounded-xl bg-[var(--color-bg-base)] border border-[var(--color-border)] text-center"
            >
              <span className="text-xs font-bold text-[var(--color-text-primary)] block">
                {day.day}
              </span>
              <span className="text-sm font-bold block my-0.5" style={{ color: dayColor }}>
                {day.aqi}
              </span>
              <span className="text-xs text-[var(--color-text-secondary)] block truncate">
                {day.weatherCondition}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
