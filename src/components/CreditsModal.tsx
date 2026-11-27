import React from 'react';
import { X, Image as ImageIcon, ShieldCheck } from 'lucide-react';
import { CREDITS_DATA } from '../data/creditsData';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Image Credits & Attribution modal displaying photographer licenses.
 */
export const CreditsModal: React.FC<CreditsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="credits-title"
    >
      <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-3xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden text-[var(--color-text-primary)]">
        {/* Header */}
        <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 id="credits-title" className="text-xl font-bold text-[var(--color-text-primary)]">
                Image Credits & Attribution
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)]">
                All assets are converted to WebP and licensed under royalty-free Unsplash and Pixabay terms.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-base)] transition-colors"
            aria-label="Close image credits dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Table Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-200">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>
              Self-contained offline assets saved locally in <code>/public/assets/images</code> with fixed aspect ratios and zero third-party hotlinking.
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--color-bg-base)] text-[var(--color-text-secondary)] font-bold border-b border-[var(--color-border)]">
                <tr>
                  <th className="py-3 px-4">Section</th>
                  <th className="py-3 px-4">Image Filename</th>
                  <th className="py-3 px-4">Photographer / Source</th>
                  <th className="py-3 px-4">License</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)] text-[var(--color-text-primary)]">
                {CREDITS_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[var(--color-bg-base)]/60 transition-colors">
                    <td className="py-2.5 px-4 font-semibold text-[var(--color-text-primary)]">{row.section}</td>
                    <td className="py-2.5 px-4 font-mono text-xs text-[#2563eb] dark:text-[#60a5fa]">{row.filename}</td>
                    <td className="py-2.5 px-4 text-[var(--color-text-secondary)]">{row.photographer}</td>
                    <td className="py-2.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--color-border)] flex justify-end bg-[var(--color-bg-surface)]">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#2563eb] text-white font-bold text-xs hover:bg-[#1d4ed8] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
