import React from 'react';
import { X, Info, ShieldCheck } from 'lucide-react';
import { AQI_SCALE_INFO, getAQIBadgeClasses } from '../constants/aqi';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden text-[var(--color-text-primary)]">
        {/* Header */}
        <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="about-modal-title"
                className="text-xl font-bold text-[var(--color-text-primary)]"
              >
                About the Air Quality Index (AQI)
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Standards, Color Coding, and Health Guidance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-11 h-11 rounded-xl flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-base)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Explanation */}
          <div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-2">
              What is the Air Quality Index?
            </h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              The Air Quality Index (AQI) is an international standard scale developed by
              environmental protection agencies to report daily air quality. It communicates how
              clean or polluted ambient air is, and what associated health effects might be of
              concern for you and your family.
            </p>
          </div>

          {/* Scale Table */}
          <div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-3">
              Standard EPA AQI Categories & Color Scale
            </h3>
            <div className="space-y-2.5">
              {AQI_SCALE_INFO.map((item) => (
                <div
                  key={item.category}
                  className="p-3.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-base)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-4 h-4 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: item.hex }}
                    />
                    <div>
                      <span className="font-bold block text-sm text-[var(--color-text-primary)]">
                        {item.category}
                      </span>
                      <span className="text-xs text-[var(--color-text-secondary)]">
                        {item.description}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold font-mono shrink-0 px-3 py-1 rounded-xl shadow-sm self-start sm:self-center ${getAQIBadgeClasses(item.category)}`}
                  >
                    AQI {item.range}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Calculation Info */}
          <div className="p-4 rounded-2xl bg-[var(--color-bg-base)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] space-y-1.5">
            <h4 className="font-bold text-[var(--color-text-primary)] text-sm">
              How is Overall AQI Calculated?
            </h4>
            <p className="leading-relaxed">
              Air quality stations calculate individual sub-indices for PM2.5, PM10, NO2, SO2, CO,
              and O3 over standard averaging intervals. The overall city AQI is typically dictated
              by the single highest sub-index at that hour ("the driving pollutant").
            </p>
          </div>

          {/* Sensitive Groups Note */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Medical Disclaimer:</strong> This application calculates indices adhering to
              EPA and WHO 2021 air quality guidelines for personal awareness and preventive
              planning. Always consult healthcare professionals for personalized medical management.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--color-border)] flex justify-end bg-[var(--color-bg-surface)]">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#2563eb] text-white font-bold text-xs hover:bg-[#1d4ed8] transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
