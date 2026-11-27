import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { HourlyForecast } from '../../types';

interface HourlyTrendChartProps {
  data: HourlyForecast[];
  currentColor: string;
  axisColor: string;
}

/**
 * 24-Hour diurnal hourly AQI trend chart with gradient shading and reference lines.
 */
export const HourlyTrendChart: React.FC<HourlyTrendChartProps> = ({
  data,
  currentColor,
  axisColor
}) => {
  return (
    <div>
      <div className="h-72 sm:h-80 w-full" aria-label="24-hour hourly AQI trend chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentColor} stopOpacity={0.5} />
                <stop offset="95%" stopColor={currentColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke={axisColor} fontSize={12} fontWeight={500} tickLine={false} />
            <YAxis stroke={axisColor} fontSize={12} fontWeight={500} tickLine={false} domain={[0, 'dataMax + 40']} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0]?.payload as HourlyForecast | undefined;
                  if (!d) return null;
                  return (
                    <div className="p-3 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-xl text-xs space-y-1">
                      <span className="font-bold text-[var(--color-text-primary)] block border-b border-[var(--color-border)] pb-1">
                        Time: {d.time}
                      </span>
                      <div className="flex justify-between gap-4 pt-1">
                        <span className="text-[var(--color-text-secondary)]">AQI:</span>
                        <span className="font-bold text-[var(--color-text-primary)]">{d.aqi}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-[var(--color-text-secondary)]">PM2.5:</span>
                        <span className="font-semibold text-[var(--color-text-primary)]">{d.pm25} µg/m³</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-[var(--color-text-secondary)]">Temperature:</span>
                        <span className="font-semibold text-[var(--color-text-primary)]">{d.temp}°C</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine y={50} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Good (50)', fill: '#10b981', fontSize: 11, fontWeight: 600 }} />
            <ReferenceLine y={100} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Moderate (100)', fill: '#f59e0b', fontSize: 11, fontWeight: 600 }} />
            <ReferenceLine y={200} stroke="#dc2626" strokeDasharray="3 3" label={{ value: 'Unhealthy (200)', fill: '#dc2626', fontSize: 11, fontWeight: 600 }} />
            <Area type="monotone" dataKey="aqi" stroke={currentColor} strokeWidth={3} fillOpacity={1} fill="url(#chartGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--color-text-secondary)] pt-2 border-t border-[var(--color-border)]">
        <span className="font-medium">Scale References:</span>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#10b981]" /><span>0–50 Good</span></div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#f59e0b]" /><span>51–100 Moderate</span></div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#ea580c]" /><span>101–150 Sensitive</span></div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#dc2626]" /><span>151+ Unhealthy</span></div>
        </div>
      </div>
    </div>
  );
};
