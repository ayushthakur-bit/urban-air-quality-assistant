import React, { useState } from 'react';
import { Wind, Sun, Moon, Menu, X, Info, Sparkles } from 'lucide-react';
import { MobileNavMenu } from './navbar/MobileNavMenu';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAbout: () => void;
  onOpenAI: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  onToggleDarkMode,
  onOpenAbout,
  onOpenAI
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'How It Helps', href: '#how-it-helps' },
    { label: 'Live AQI', href: '#live-aqi' },
    { label: 'Cities', href: '#cities' },
    { label: 'Pollutants', href: '#pollutants' },
    { label: 'Causes', href: '#causes' },
    { label: 'Forecast', href: '#forecast' },
    { label: 'Health Tips', href: '#health-tips' }
  ];

  return (
    <nav
      className="sticky top-0 z-50 bg-[var(--color-bg-base)]/90 backdrop-blur-md border-b border-[var(--color-border)] transition-colors duration-300"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#3b82f6] rounded-xl p-1"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#3b82f6] to-[#60a5fa] p-0.5 shadow-md flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#111827] dark:bg-[#121821] rounded-[14px] flex items-center justify-center">
                <Wind className="w-6 h-6 text-[#60a5fa]" aria-hidden="true" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
                UrbanAir
              </span>
              <span className="block text-xs font-semibold text-[var(--color-text-secondary)] tracking-wide uppercase">
                Air Quality Assistant
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 rounded-xl text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)] transition-all min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={onOpenAbout}
              className="px-3.5 py-2 rounded-xl text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)] transition-all min-h-[44px] flex items-center gap-1.5"
            >
              <Info className="w-4 h-4 text-[#3b82f6]" />
              <span>About</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenAI}
              className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
              aria-label="Open AI Smog & Air Quality Advisor"
            >
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">AI Advisor</span>
            </button>

            <button
              onClick={onToggleDarkMode}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-11 h-11 rounded-xl flex items-center justify-center border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:border-[#3b82f6] transition-all focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-[#f59e0b] animate-spin-slow" /> : <Moon className="w-5 h-5 text-[#3b82f6]" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden w-11 h-11 rounded-xl flex items-center justify-center border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:border-[#3b82f6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[var(--color-text-primary)]" /> : <Menu className="w-6 h-6 text-[var(--color-text-primary)]" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <MobileNavMenu
          navLinks={navLinks}
          onLinkClick={() => setMobileMenuOpen(false)}
          onOpenAI={() => { setMobileMenuOpen(false); onOpenAI(); }}
          onOpenAbout={() => { setMobileMenuOpen(false); onOpenAbout(); }}
        />
      )}
    </nav>
  );
};
