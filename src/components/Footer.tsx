import React from 'react';
import { Wind, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAbout: () => void;
  onOpenCredits?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAbout, onOpenCredits }) => {
  return (
    <footer 
      className="border-t border-[var(--color-border)] bg-[var(--color-bg-surface)] py-12 text-sm text-[var(--color-text-secondary)] transition-colors duration-300"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#3b82f6] to-[#60a5fa] p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#111827] dark:bg-[#121821] rounded-[10px] flex items-center justify-center">
                  <Wind className="w-4 h-4 text-[#60a5fa]" />
                </div>
              </div>
              <span className="text-lg font-bold text-[var(--color-text-primary)]">
                UrbanAir Assistant
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] max-w-sm leading-relaxed">
              Empowering urban residents, families, and communities with clear, actionable air quality telemetry, atmospheric science explanations, and preventive health guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] mb-3">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-[var(--color-text-primary)] transition-colors">
                  Home & Search
                </a>
              </li>
              <li>
                <a href="#live-aqi" className="hover:text-[var(--color-text-primary)] transition-colors">
                  Live AQI Monitor
                </a>
              </li>
              <li>
                <a href="#cities" className="hover:text-[var(--color-text-primary)] transition-colors">
                  Monitored Skylines
                </a>
              </li>
              <li>
                <a href="#pollutants" className="hover:text-[var(--color-text-primary)] transition-colors">
                  Pollutants Breakdown
                </a>
              </li>
              <li>
                <a href="#causes" className="hover:text-[var(--color-text-primary)] transition-colors">
                  Pollution Causes
                </a>
              </li>
              <li>
                <a href="#forecast" className="hover:text-[var(--color-text-primary)] transition-colors">
                  Forecast & Trends
                </a>
              </li>
              <li>
                <a href="#health-tips" className="hover:text-[var(--color-text-primary)] transition-colors">
                  Health Recommendations
                </a>
              </li>
            </ul>
          </div>

          {/* Data Sources & Transparency */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] mb-3">
              Data Sources
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>US EPA AirNow Framework</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>WHO 2021 Air Quality Guidelines</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>OpenAQ Global Sensor Network</span>
              </li>
              <li className="pt-2 flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={onOpenAbout}
                  className="text-left text-[#2563eb] dark:text-[#60a5fa] hover:underline font-bold text-xs"
                >
                  View AQI Scale Guide →
                </button>
                {onOpenCredits && (
                  <button
                    type="button"
                    onClick={onOpenCredits}
                    className="text-left text-[#2563eb] dark:text-[#60a5fa] hover:underline font-bold text-xs"
                  >
                    Image Credits & Attribution →
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Disclaimer */}
        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-text-secondary)]">
          <p>© {new Date().getFullYear()} UrbanAir Assistant. Designed for public health awareness.</p>
          <p>Not intended as a replacement for emergency medical advice.</p>
        </div>
      </div>
    </footer>
  );
};
