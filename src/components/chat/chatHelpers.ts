import { CityAirData, ChatMessage } from '../../types';

/** Generates initial assistant briefing based on city context. */
export function createWelcomeMessage(city: CityAirData): ChatMessage {
  const hasInversion = city.inversionAdvisory?.isActive;
  return {
    id: 'welcome',
    role: 'assistant',
    content: `👋 **Greetings! I am AeroBot, your GenAI Air Quality & Winter Smog Defense Advisor.**\n\nI am analyzing real-time atmospheric telemetry for **${city.name}** (Current AQI: **${city.currentAqi} – ${city.category}**, PM2.5: **${city.pollutants.pm25.value} µg/m³**).\n\n${hasInversion ? `⚠️ **Severe Winter Smog Alert:** Thermal inversion is trapping emissions near the ground until **${city.inversionAdvisory?.smogCeilingTrappedUntil}**. Safe ventilation window: **${city.inversionAdvisory?.ventilationBreakupWindow}**.\n\n` : ''}**How can I protect you today?**\n- Safe ventilation timing and temperature inversion dynamics\n- DIY $35 Corsi-Rosenthal box vs commercial HEPA purifiers\n- Low-emission commuting and cooking routines\n- Certified N95 mask filtration efficiency`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestions: [
      'When is the safe breakup window to open windows today?',
      'How do I build an affordable Corsi-Rosenthal air purifier?',
      'What certified mask should I wear in this AQI?',
      'Suggest a low-emission morning routine for my family'
    ]
  };
}
