import React, { useState, useEffect } from 'react';
import { GAUGE_CONFIG } from '../../constants/aqi';
import { AQICategory } from '../../types';

interface AQIRadialGaugeProps {
  currentAqi: number;
  category: AQICategory;
  currentColor: string;
}

/** Semicircular animated SVG radial gauge displaying numerical AQI score. */
export const AQIRadialGauge: React.FC<AQIRadialGaugeProps> = ({ currentAqi, category, currentColor }) => {
  const [displayedAqi, setDisplayedAqi] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1000;
    const startValue = 0;
    const endValue = currentAqi;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayedAqi(Math.round(startValue + (endValue - startValue) * easedProgress));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [currentAqi]);

  const clampedAqi = Math.min(Math.max(currentAqi, 0), GAUGE_CONFIG.MAX_AQI);
  const strokeDashoffset =
    GAUGE_CONFIG.CIRCUMFERENCE - (clampedAqi / GAUGE_CONFIG.MAX_AQI) * GAUGE_CONFIG.CIRCUMFERENCE;

  return (
    <div className="flex flex-col items-center justify-center relative w-72 sm:w-80">
      <svg
        className="w-64 h-36 sm:w-72 sm:h-40 overflow-visible"
        viewBox="0 0 200 110"
        role="img"
        aria-label={`Air Quality Index gauge showing ${currentAqi}, rated ${category}`}
      >
        <path
          d="M 10 100 A 90 90 0 0 1 190 100"
          fill="none"
          stroke="currentColor"
          strokeWidth={GAUGE_CONFIG.STROKE_WIDTH}
          strokeLinecap="round"
          className="text-[var(--color-border)] opacity-60"
        />
        <path
          d="M 10 100 A 90 90 0 0 1 190 100"
          fill="none"
          stroke={currentColor}
          strokeWidth={GAUGE_CONFIG.STROKE_WIDTH}
          strokeDasharray={GAUGE_CONFIG.CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="gauge-arc"
        />
      </svg>

      <div className="mt-[-48px] text-center">
        <span className="text-xs uppercase font-bold tracking-widest text-[var(--color-text-secondary)] block">
          US AQI
        </span>
        <span
          className="text-5xl sm:text-6xl font-black tracking-tight block transition-colors duration-500 font-mono"
          style={{ color: currentColor }}
        >
          {displayedAqi}
        </span>
        <span className="text-xs text-[var(--color-text-secondary)]">Scale: 0 – 500</span>
      </div>
    </div>
  );
};
