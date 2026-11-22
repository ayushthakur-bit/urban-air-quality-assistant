import { describe, it, expect } from 'vitest';
import { SmogAIService } from '../services/aiService';
import { CITIES_DATABASE } from '../data/mockData';

describe('AeroBot Smog AI Intelligence Reasoning Engine', () => {
  const delhi = CITIES_DATABASE.find(c => c.id === 'delhi')!;

  it('generates thermal inversion & ventilation breakup window guidance when queried', async () => {
    const response = await SmogAIService.askAeroBot('When is the safe window to open windows?', delhi);
    expect(response.content).toContain('13:00 and 15:00');
    expect(response.content).toContain('Breakup Window');
    expect(response.exposureSavedPct).toBe(68);
    expect(response.pm25Avoided).toBeGreaterThan(0);
  });

  it('advises certified N95 respirators over cloth masks during severe smog', async () => {
    const response = await SmogAIService.askAeroBot('What mask should I wear?', delhi);
    expect(response.content).toContain('Certified N95');
    expect(response.content).toContain('Cloth & Surgical Masks Warning');
    expect(response.exposureSavedPct).toBe(92);
  });

  it('explains Corsi-Rosenthal DIY box construction and indoor CADR filtration', async () => {
    const response = await SmogAIService.askAeroBot('How do I build a DIY purifier filter?', delhi);
    expect(response.content).toContain('Corsi-Rosenthal');
    expect(response.content).toContain('MERV-13');
    expect(response.content).toContain('350–550 CFM');
    expect(response.exposureSavedPct).toBe(90);
  });

  it('suggests low-emission daily routines and anti-idling alternatives', async () => {
    const response = await SmogAIService.askAeroBot('Suggest low-emission routines for commute', delhi);
    expect(response.content).toContain('Low-Emission Daily Routine');
    expect(response.content).toContain('Anti-Idling');
    expect(response.content).toContain('CO2');
  });
});
