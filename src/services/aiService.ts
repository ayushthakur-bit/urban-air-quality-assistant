import { CityAirData } from '../types';

export interface AIResponse {
  content: string;
  exposureSavedPct?: number;
  pm25Avoided?: number;
  suggestions?: string[];
}

export class SmogAIService {
  private static STORAGE_KEY = 'AEROSHIELD_GEMINI_API_KEY';

  public static getApiKey(): string {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(this.STORAGE_KEY) || '';
      }
    } catch {
      // Graceful fallback for restricted storage environments
    }
    return '';
  }

  public static setApiKey(key: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(this.STORAGE_KEY, key.trim());
      }
    } catch {
      // Graceful fallback
    }
  }

  /**
   * Main query method: queries Gemini API if key is available,
   * otherwise uses the local Air Defense & Winter Smog Reasoning Engine.
   */
  public static async askAeroBot(
    userPrompt: string,
    city: CityAirData,
    history: { role: string; content: string }[] = []
  ): Promise<AIResponse> {
    const apiKey = this.getApiKey();

    if (apiKey) {
      try {
        const geminiResult = await this.callGeminiAPI(userPrompt, city, apiKey, history);
        if (geminiResult) return geminiResult;
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local intelligence engine:', err);
      }
    }

    // Local deep aerosol and winter smog reasoning engine
    return this.generateLocalReasoningResponse(userPrompt, city);
  }

  private static async callGeminiAPI(
    prompt: string,
    city: CityAirData,
    apiKey: string,
    history: { role: string; content: string }[]
  ): Promise<AIResponse | null> {
    const inversionText = city.inversionAdvisory?.isActive
      ? `Active Inversion: ${city.inversionAdvisory.status}. Smog ceiling trapped until ${city.inversionAdvisory.smogCeilingTrappedUntil}. Safe breakup window: ${city.inversionAdvisory.ventilationBreakupWindow}.`
      : 'No severe inversion reported.';

    const systemPrompt = `You are AeroBot, an elite environmental health scientist, building physicist, and urban air quality advisor.
Current City Context:
- City: ${city.name}, ${city.country}
- Current AQI: ${city.currentAqi} (${city.category})
- PM2.5: ${city.pollutants.pm25.value} ${city.pollutants.pm25.unit} (Limit: ${city.pollutants.pm25.standardLimit})
- Weather: ${city.weather.temp}°C, Humidity ${city.weather.humidity}%, Wind ${city.weather.windSpeed} km/h
- Inversion Status: ${inversionText}

Guidelines:
1. Provide scientifically rigorous, empathetic, actionable advice.
2. Explain the physical mechanics of winter thermal inversion, particulate deposition, or ventilation.
3. Suggest practical low-emission daily routines and indoor air quality hacks (e.g. Corsi-Rosenthal boxes, window sealing).
4. Clearly state the direct impact of choices (e.g., % PM2.5 avoided, exposure reduction).`;

    const contents = [
      ...history.slice(-4).map((h) => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }]
      })),
      {
        role: 'user',
        parts: [{ text: `${systemPrompt}\n\nUser Question: ${prompt}` }]
      }
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1000
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidate) return null;

    return {
      content: candidate,
      exposureSavedPct: Math.min(95, Math.max(40, Math.floor(city.currentAqi * 0.2))),
      pm25Avoided: Number((city.pollutants.pm25.value * 0.85).toFixed(1)),
      suggestions: [
        'How do I seal bedroom windows without damaging paint?',
        'What is the optimal fan speed for indoor HEPA purifiers?',
        'How does morning ground inversion trap soot near street level?',
        'What low-emission commute alternatives work best today?'
      ]
    };
  }

  private static generateLocalReasoningResponse(prompt: string, city: CityAirData): AIResponse {
    const q = prompt.toLowerCase();
    const aqi = city.currentAqi;
    const isHighSmog = aqi > 150;

    // Topic 1: Winter Smog & Temperature Inversion / Ventilation
    if (
      q.includes('inversion') ||
      q.includes('window') ||
      q.includes('ventilat') ||
      q.includes('breakup') ||
      q.includes('morning')
    ) {
      return {
        content: `### 🌡️ Winter Thermal Inversion & Ventilation Protocol for **${city.name}**

During winter months in urban centers like **${city.name}**, cooler dense air is trapped close to the ground beneath a warmer air lid. Because horizontal wind speed is currently only **${city.weather.windSpeed} km/h**, toxic emissions from traffic and heating cannot disperse.

**Key Timing Advisory:**
- **Morning Smog Ceiling:** Trapped under inversion layers until approximately **10:30 AM**. Avoid opening doors or windows during early morning hours.
- **Safe Ventilation Breakup Window:** The optimal time to flush indoor air is between **13:00 and 15:00 (1:00 PM – 3:00 PM)**. Solar radiation warms the surface layer, breaking the inversion lid and temporarily cutting ambient particulate density.

**Direct Impact of Proper Timing:**
- Ventilating during the 13:00–15:00 breakup window rather than at 08:00 AM reduces indoor particulate influx by **up to 68%**, protecting vulnerable family members from acute respiratory distress.`,
        exposureSavedPct: 68,
        pm25Avoided: Number((city.pollutants.pm25.value * 0.68).toFixed(1)),
        suggestions: [
          'What is the difference between HEPA and DIY Corsi-Rosenthal boxes?',
          'What certified mask should I wear outdoors in this AQI?',
          'How can our family adopt a low-emission morning routine?'
        ]
      };
    }

    // Topic 2: Masks & Personal Protective Equipment
    if (
      q.includes('mask') ||
      q.includes('respirator') ||
      q.includes('n95') ||
      q.includes('cloth') ||
      q.includes('face')
    ) {
      const maskType =
        aqi > 200
          ? 'Certified N95 / FFP2 / KN95 with headbands'
          : aqi > 100
            ? 'N95 Respirator or tight-fitting KN95'
            : 'Optional mask for sensitive individuals';
      return {
        content: `### 🛡️ Respiratory Protection Analysis for **${city.name}** (AQI: ${aqi})

Current fine particulate concentration (PM2.5) is **${city.pollutants.pm25.value} µg/m³**, which is **${(city.pollutants.pm25.value / city.pollutants.pm25.standardLimit).toFixed(1)}x** above the WHO reference limit.

**Mask Selection Guidance:**
- **Recommended Grade:** **${maskType}**.
- **Filtration Physics:** Certified N95 respirators capture 95%+ of sub-micron aerosols (0.3 µm) via electrostatic attraction and diffusion. 
- **Cloth & Surgical Masks Warning:** Standard cloth masks only filter ~15–30% of fine PM2.5, leaking significantly around the nose bridge and cheeks.

**Direct Impact:**
- A tightly sealed N95 mask prevents **over 92%** of microscopic soot particles from penetrating deep into lung alveoli and systemic circulation.`,
        exposureSavedPct: 92,
        pm25Avoided: Number((city.pollutants.pm25.value * 0.92).toFixed(1)),
        suggestions: [
          'How many hours can I reuse an N95 mask safely?',
          'When does the safe ventilation breakup window open?',
          'How can I build an affordable DIY air purifier?'
        ]
      };
    }

    // Topic 3: Indoor Air Hacks & DIY Purifiers (Corsi-Rosenthal)
    if (
      q.includes('purifier') ||
      q.includes('diy') ||
      q.includes('filter') ||
      q.includes('corsi') ||
      q.includes('indoor') ||
      q.includes('hack') ||
      q.includes('hepa')
    ) {
      return {
        content: `### 💨 Indoor Air Quality Hacks & Corsi-Rosenthal Purifier Guide

When outdoor AQI is **${aqi} (${city.category})**, outdoor pollutants rapidly infiltrate through door gaps, window seams, and exhaust dampers.

**Top Indoor Air Hacks:**
1. **The Corsi-Rosenthal Box ($35–$45 DIY):**
   - 1x 20" box fan + 4x MERV-13 furnace filters taped in a cube with a cardboard bottom.
   - Generates clean air delivery rate (CADR) of **350–550 CFM**, matching commercial purifiers costing $400+.
2. **Door Threshold & Window Weather-stripping:**
   - Install silicone weather-strip sweeps under entrance doors and use removable painter's tape on rattling window frames.
3. **Kitchen Exhaust Strategy:**
   - Always open a small crack window in the kitchen *only* while exhaust fans run; otherwise, kitchen fans pull outdoor smog down chimneys into living rooms.

**Direct Impact:**
- Implementing a sealed bedroom zone with continuous filtration lowers indoor PM2.5 from **${city.pollutants.pm25.value} µg/m³** to under **15 µg/m³** (**90%+ exposure reduction**).`,
        exposureSavedPct: 90,
        pm25Avoided: Number((city.pollutants.pm25.value * 0.9).toFixed(1)),
        suggestions: [
          'Can indoor plants remove PM2.5 or only VOCs?',
          'When is it safe to ventilate today?',
          'What low-emission transit alternatives help reduce local smog?'
        ]
      };
    }

    // Topic 4: Low-Emission Daily Routines & Sustainable Alternatives
    if (
      q.includes('routine') ||
      q.includes('emission') ||
      q.includes('transit') ||
      q.includes('commute') ||
      q.includes('lifestyle') ||
      q.includes('car') ||
      q.includes('sustainable')
    ) {
      return {
        content: `### 🌱 Low-Emission Daily Routine & Sustainable Choices for **${city.name}**

Individual and community habits directly affect the thickness of urban smog ceilings during stagnant atmospheric conditions.

**Tailored Daily Routine Recommendations:**
1. **Shift Commute Modes & Anti-Idling:**
   - Choose electric metro or carpools. If driving, strictly avoid engine idling during school dropoffs and signal waits; cold idling concentrates carcinogenic exhaust plumes.
2. **Postpone High-Emission Household Activities:**
   - Shift indoor deep frying, incense burning, or wood/biomass heating to hours with active air movement.
3. **Consolidate Deliveries:**
   - Combine household online orders into weekly deliveries to reduce neighborhood diesel delivery trips.

**Direct Impact:**
- Adopting public transit and eliminating idling prevents approximately **2.4 kg of CO2** and **14g of toxic fine particulates** per commuter daily, improving street-level air quality for everyone.`,
        exposureSavedPct: 55,
        pm25Avoided: Number((city.pollutants.pm25.value * 0.55).toFixed(1)),
        suggestions: [
          'What indoor air hacks can I implement today?',
          'What is the current temperature inversion status in my city?',
          'What health precautions should asthma patients take?'
        ]
      };
    }

    // Generic Comprehensive Response
    return {
      content: `### 🤖 AeroBot Urban Air & Winter Smog Guidance for **${city.name}**

Current status: **AQI ${aqi} (${city.category})**. The dominant risk pollutant is **PM2.5 at ${city.pollutants.pm25.value} µg/m³** (${(city.pollutants.pm25.value / city.pollutants.pm25.standardLimit).toFixed(1)}x WHO guidelines).

**Immediate Action Checklist:**
- ${isHighSmog ? '⚠️ Wear a certified N95 respirator if stepping outside.' : '✅ Normal outdoor activities are currently safe.'}
- ${isHighSmog ? '🪟 Keep windows shut during morning smog ceiling (until ~10:30 AM). Safe breakup window: 13:00–15:00.' : '🪟 Ventilate your home freely to refresh indoor air.'}
- 💨 Run indoor HEPA or DIY Corsi-Rosenthal purifiers in central rooms.
- 🚴 Switch to low-emission transit alternatives to minimize neighborhood tailpipe emissions.

Feel free to ask me for custom room sealing tips, DIY filter guides, commute optimizations, or health advice!`,
      exposureSavedPct: isHighSmog ? 75 : 30,
      pm25Avoided: Number((city.pollutants.pm25.value * (isHighSmog ? 0.75 : 0.3)).toFixed(1)),
      suggestions: [
        'How do I build a $35 Corsi-Rosenthal DIY purifier?',
        'When is the safe ventilation window today?',
        'What mask provides true N95 protection against smog?'
      ]
    };
  }
}
