import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { LiveAQICard } from '../components/LiveAQICard';
import { PollutantGrid } from '../components/PollutantGrid';
import { HealthAdvice } from '../components/HealthAdvice';
import { HowItHelpsResidents } from '../components/HowItHelpsResidents';
import { Footer } from '../components/Footer';
import { DEFAULT_FALLBACK_CITY } from '../data/cities';

describe('Accessibility & WCAG Compliance Suite (jest-axe)', () => {
  const city = DEFAULT_FALLBACK_CITY;

  it('renders LiveAQICard without accessibility violations', async () => {
    const { container } = render(<LiveAQICard city={city} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('renders PollutantGrid without accessibility violations', async () => {
    const { container } = render(<PollutantGrid city={city} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('renders HealthAdvice without accessibility violations', async () => {
    const { container } = render(<HealthAdvice city={city} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('renders HowItHelpsResidents without accessibility violations', async () => {
    const { container } = render(<HowItHelpsResidents onOpenAI={() => {}} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('renders Footer without accessibility violations', async () => {
    const { container } = render(<Footer onOpenAbout={() => {}} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
