import { describe, it, expect } from 'vitest';
import { CITIES_DATABASE } from '../data/mockData';

describe('Winter Smog & Thermal Inversion Advisory Telemetry', () => {
  const delhi = CITIES_DATABASE.find(c => c.id === 'delhi')!;

  it('contains the active winter smog temperature inversion advisory for Delhi NCR', () => {
    expect(delhi.inversionAdvisory).toBeDefined();
    const advisory = delhi.inversionAdvisory!;

    expect(advisory.isActive).toBe(true);
    expect(advisory.locationDetails).toContain('Delhi NCR (Anand Vihar / Gurugram)');
    expect(advisory.smogCeilingTrappedUntil).toBe('10:30 AM');
    expect(advisory.ventilationBreakupWindow).toContain('13:00 - 15:00 (Breakup Window)');
  });

  it('provides actionable low-emission daily routines with quantified direct impacts', () => {
    const routines = delhi.inversionAdvisory!.lowEmissionRoutines;
    expect(routines.length).toBeGreaterThanOrEqual(3);

    // Transit routine
    const transitRoutine = routines.find(r => r.category === 'Transit');
    expect(transitRoutine).toBeDefined();
    expect(transitRoutine?.impact).toContain('Reduces personal particulate inhalation');

    // Ventilation routine
    const ventilationRoutine = routines.find(r => r.category === 'Ventilation');
    expect(ventilationRoutine).toBeDefined();
    expect(ventilationRoutine?.timing).toContain('13:00 – 15:00 PM');
  });

  it('details indoor air hacks with Corsi-Rosenthal DIY filter metrics and HEPA airlock', () => {
    const hacks = delhi.inversionAdvisory!.indoorHacks;
    expect(hacks.length).toBeGreaterThanOrEqual(2);

    const crBox = hacks.find(h => h.title.includes('Corsi-Rosenthal'));
    expect(crBox).toBeDefined();
    expect(crBox?.description).toContain('MERV-13');
    expect(crBox?.impact).toContain('ACH');

    const hepaHack = hacks.find(h => h.title.includes('HEPA'));
    expect(hepaHack).toBeDefined();
    expect(hepaHack?.impact).toContain('94% exposure reduction');
  });
});
