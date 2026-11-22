import React, { useState } from 'react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { CityAirData } from '../types';
import { Calendar, Clock, TrendingUp } from 'lucide-react';
import { getAQIColorHex } from '../data/mockData';

interface AirQualityChartsProps {
  city: CityAirData;
  isDarkMode?: boolean;
}

export const AirQualityCharts: React.FC<AirQualityChartsProps> = ({ city, isDarkMode }) => {
  const [activeChartTab, setActiveChartTab] = useState<'24h' | '7day'>('24h');

  const currentColor = getAQIColorHex(city.currentAqi);
  // High-contrast secondary text token for chart axis ticks: #4B5563 (light), #A1A9B5 (dark)
  const axisColor = isDarkMode ? '#A1A9B5' : '#4B5563';

  return (
    <section 
      id="forecast" 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 scroll-mt-24"
      aria-label="Air Quality Forecast and Historical Trends"
    >
      <div className="clean-card p-6 sm:p-8">
        {/* Header & View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] tracking-tight flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#3b82f6]" />
              <span>Air Quality Trends & Forecast</span>
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
              Hourly 24-hour trajectory and extended 7-day atmospheric projections for {city.name}.
            </p>
          </div>

          {/* Tab Switcher */}
          <div 
            className="flex items-center bg-[var(--color-bg-base)] p-1 rounded-2xl border border-[var(--color-border)] shrink-0 self-start sm:self-auto"
            role="tablist"
          >
            <button
              role="tab"
              aria-selected={activeChartTab === '24h'}
              onClick={() => setActiveChartTab('24h')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all min-h-[44px] ${
                activeChartTab === '24h'
                  ? 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] shadow-sm border border-[var(--color-border)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <Clock className="w-4 h-4 text-[#3b82f6]" />
              <span>24-Hour Trend</span>
            </button>

            <button
              role="tab"
              aria-selected={activeChartTab === '7day'}
              onClick={() => setActiveChartTab('7day')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all min-h-[44px] ${
                activeChartTab === '7day'
                  ? 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] shadow-sm border border-[var(--color-border)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#3b82f6]" />
              <span>7-Day Forecast</span>
            </button>
          </div>
        </div>

        {/* Chart View Content */}
        <div className="pt-6">
          {activeChartTab === '24h' ? (
            <div>
              {/* 24-Hour Area Chart */}
              <div className="h-72 sm:h-80 w-full" aria-label="24-hour hourly AQI trend chart">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={city.hourlyTrend} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={currentColor} stopOpacity={0.5}/>
                        <stop offset="95%" stopColor={currentColor} stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="time" 
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
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="p-3 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-xl text-xs space-y-1">
                              <span className="font-bold text-[var(--color-text-primary)] block border-b border-[var(--color-border)] pb-1">
                                Time: {data.time}
                              </span>
                              <div className="flex justify-between gap-4 pt-1">
                                <span className="text-[var(--color-text-secondary)]">AQI:</span>
                                <span className="font-bold text-[var(--color-text-primary)]">{data.aqi}</span>
                              </div>
                              <div className="flex justify-between gap-4">
                                <span className="text-[var(--color-text-secondary)]">PM2.5:</span>
                                <span className="font-semibold text-[var(--color-text-primary)]">{data.pm25} µg/m³</span>
                              </div>
                              <div className="flex justify-between gap-4">
                                <span className="text-[var(--color-text-secondary)]">Temperature:</span>
                                <span className="font-semibold text-[var(--color-text-primary)]">{data.temp}°C</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <ReferenceLine y={50} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Good (50)', fill: '#10b981', fontSize: 11, fontWeight: 600 }} />
                    <ReferenceLine y={100} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Moderate (100)', fill: '#f59e0b', fontSize: 11, fontWeight: 600 }} />
                    <ReferenceLine y={150} stroke="#ea580c" strokeDasharray="3 3" label={{ value: 'Unhealthy (150)', fill: '#ea580c', fontSize: 11, fontWeight: 600 }} />
                    <Area 
                      type="monotone" 
                      dataKey="aqi" 
                      stroke={currentColor} 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#chartGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Threshold legend */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[var(--color-text-secondary)]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#10b981]"></span>
                  <span>0–50 Good</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#f59e0b]"></span>
                  <span>51–100 Moderate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ea580c]"></span>
                  <span>101–150 Sensitive</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#dc2626]"></span>
                  <span>151+ Unhealthy</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* 7-Day Forecast Bar Chart */}
              <div className="h-72 sm:h-80 w-full" aria-label="7-day daily forecast AQI chart">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={city.dailyForecast} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
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
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="p-3 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-xl text-xs space-y-1">
                              <span className="font-bold text-[var(--color-text-primary)] block border-b border-[var(--color-border)] pb-1">
                                {data.day}, {data.date}
                              </span>
                              <div className="flex justify-between gap-4 pt-1">
                                <span className="text-[var(--color-text-secondary)]">Forecast AQI:</span>
                                <span className="font-bold text-[var(--color-text-primary)]">{data.aqi}</span>
                              </div>
                              <div className="flex justify-between gap-4">
                                <span className="text-[var(--color-text-secondary)]">Category:</span>
                                <span className="font-bold text-[var(--color-text-primary)]">{data.category}</span>
                              </div>
                              <div className="flex justify-between gap-4">
                                <span className="text-[var(--color-text-secondary)]">Range:</span>
                                <span className="font-semibold text-[var(--color-text-primary)]">{data.minAqi} – {data.maxAqi} AQI</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar 
                      dataKey="aqi" 
                      radius={[8, 8, 0, 0]}
                      fill={currentColor}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* 7-Day Day Pills Grid */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {city.dailyForecast.map((day) => {
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
          )}
        </div>
      </div>
    </section>
  );
};
