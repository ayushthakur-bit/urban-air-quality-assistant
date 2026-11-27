import React from 'react';
import { Sparkles, Info } from 'lucide-react';

interface NavLinkItem {
  label: string;
  href: string;
}

interface MobileNavMenuProps {
  navLinks: NavLinkItem[];
  onLinkClick: () => void;
  onOpenAI: () => void;
  onOpenAbout: () => void;
}

/** Mobile dropdown navigation drawer for smaller viewport widths. */
export const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  navLinks,
  onLinkClick,
  onOpenAI,
  onOpenAbout
}) => {
  return (
    <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg-base)] px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-fadeIn">
      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          onClick={onLinkClick}
          className="flex items-center px-4 py-3 rounded-xl text-base font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)] min-h-[44px]"
        >
          {link.label}
        </a>
      ))}
      <button
        onClick={onOpenAI}
        className="w-full flex items-center px-4 py-3 rounded-xl text-base font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 min-h-[44px] gap-2 text-left"
      >
        <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        <span>AeroBot AI Smog Advisor</span>
      </button>
      <button
        onClick={onOpenAbout}
        className="w-full flex items-center px-4 py-3 rounded-xl text-base font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)] min-h-[44px] gap-2 text-left"
      >
        <Info className="w-5 h-5 text-[#3b82f6]" />
        <span>About AQI & Science</span>
      </button>
    </div>
  );
};
