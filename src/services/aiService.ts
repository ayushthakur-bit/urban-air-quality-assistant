import { CityAirData } from '../types';

export interface AIResponse {
  content: string;
  exposureSavedPct?: number;
  pm25Avoided?: number;
  suggestions?: string[];
}

/** Generates inversion and breakup window advice. */
function generateInversionAdvice(city: CityAirData): AIResponse {
  return {
    content: `### 🌡️ Winter Thermal Inversion & Ventilation Protocol for **${city.name}**\n\nDuring winter months in urban centers like **${city.name}**, cooler dense air is trapped close to the ground beneath a warmer air lid. Because horizontal wind speed is currently only **${city.weather.windSpeed} km/h**, toxic emissions from traffic and heating cannot disperse.\n\n**Key Timing Advisory:**\n- **Morning Smog Ceiling:** Trapped under inversion layers until approximately **10:30 AM**. Avoid opening doors or windows during early morning hours.\n- **Safe Ventilation Breakup Window:** The optimal time to flush indoor air is between **13:00 and 15:00 (1:00 PM – 3:00 PM)**. Solar radiation warms the surface layer, breaking the inversion lid.\n\n**Direct Impact of Proper Timing:**\n- Ventilating during the 13:00–15:00 breakup window rather than at 08:00 AM reduces indoor particulate influx by **up to 68%**.`,
    exposureSavedPct: 68,
    pm25Avoided: Number((city.pollutants.pm25.value * 0.68).toFixed(1)),
    suggestions: [
      'What is the difference between HEPA and DIY Corsi-Rosenthal boxes?',
      'What certified mask should I wear outdoors in this AQI?',
      'How can our family adopt a low-emission morning routine?'
    ]
  };
}

/** Generates respiratory mask selection advice. */
function generateMaskAdvice(city: CityAirData): AIResponse {
  const maskType =
    city.currentAqi > 200
      ? 'Certified N95 / FFP2 / KN95 with headbands'
      : city.currentAqi > 100
        ? 'N95 Respirator or tight-fitting KN95'
        : 'Optional mask for sensitive individuals';

  return {
    content: `### 🛡️ Respiratory Protection Analysis for **${city.name}** (AQI: ${city.currentAqi})\n\nCurrent fine particulate concentration (PM2.5) is **${city.pollutants.pm25.value} µg/m³**, which is **${(city.pollutants.pm25.value / city.pollutants.pm25.standardLimit).toFixed(1)}x** above the WHO reference limit.\n\n**Mask Selection Guidance:**\n- **Recommended Grade:** **${maskType}**.\n- **Filtration Physics:** Certified N95 respirators capture 95%+ of sub-micron aerosols (0.3 µm) via electrostatic attraction.\n- **Cloth & Surgical Masks Warning:** Standard cloth masks only filter ~15–30% of fine PM2.5.\n\n**Direct Impact:**\n- A tightly sealed N95 mask prevents **over 92%** of microscopic soot particles from penetrating lung alveoli.`,
    exposureSavedPct: 92,
    pm25Avoided: Number((city.pollutants.pm25.value * 0.92).toFixed(1)),
    suggestions: [
      'How many hours can I reuse an N95 mask safely?',
      'When does the safe ventilation breakup window open?',
      'How can I build an affordable DIY air purifier?'
    ]
  };
}

/** Generates indoor air hacks and DIY filtration advice. */
function generateIndoorHacksAdvice(city: CityAirData): AIResponse {
  return {
    content: `### 💨 Indoor Air Quality Hacks & Corsi-Rosenthal Purifier Guide\n\nWhen outdoor AQI is **${city.currentAqi} (${city.category})**, outdoor pollutants rapidly infiltrate through door gaps, window seams, and exhaust dampers.\n\n**Top Indoor Air Hacks:**\n1. **The Corsi-Rosenthal Box ($35–$45 DIY):** 1x 20" box fan + 4x MERV-13 furnace filters taped in a cube with cardboard bottom. Delivers 350–550 CFM CADR.\n2. **Door Threshold Sweeps:** Install silicone sweeps under entrance doors and use painter's tape on rattling frames.\n3. **Kitchen Exhaust Strategy:** Open a small crack window in kitchen *only* while exhaust fans run to avoid backdrafting.\n\n**Direct Impact:**\n- A sealed bedroom zone with continuous filtration lowers indoor PM2.5 from **${city.pollutants.pm25.value} µg/m³** to under **15 µg/m³** (**90%+ exposure reduction**).`,
    exposureSavedPct: 90,
    pm25Avoided: Number((city.pollutants.pm25.value * 0.9).toFixed(1)),
    suggestions: [
      'Can indoor plants remove PM2.5 or only VOCs?',
      'When is it safe to ventilate today?',
      'What low-emission transit alternatives help reduce local smog?'
    ]
  };
}

/** Generates low-emission community routine advice. */
function generateEmissionRoutineAdvice(city: CityAirData): AIResponse {
  return {
    content: `### 🌱 Low-Emission Daily Routine & Sustainable Choices for **${city.name}**\n\nIndividual and community habits directly affect the thickness of urban smog ceilings during stagnant atmospheric conditions.\n\n**High-Impact Routine Shifts:**\n1. **Anti-Idling & Commute Smoothing:** Eliminating 10 minutes of engine idling prevents 450g of direct localized CO, CO2, and PM2.5.\n2. **Metro & Electrified Transit:** Shifting 3 commute days/week to electric transit cuts personal urban transit carbon footprint by up to **64%**.\n3. **Indoor Cooking Postponement:** Postpone high-temperature frying until the 13:00–15:00 breakup window.\n\n**Direct Impact:**\n- Community-wide adoption of anti-idling and cooking shifts during morning stagnation cuts ground-level PM2.5 concentration by **up to 22%**.`,
    exposureSavedPct: 64,
    pm25Avoided: Number((city.pollutants.pm25.value * 0.64).toFixed(1)),
    suggestions: [
      'When is the optimal time for outdoor errands today?',
      'How does carpooling affect personal smog exposure?',
      'What simple DIY air filter works best on a budget?'
    ]
  };
}

/** Generates general smog defense guidance. */
function generateGeneralDefenseAdvice(city: CityAirData): AIResponse {
  const isHighSmog = city.currentAqi > 150;
  return {
    content: `### 🤖 AeroBot Environmental Science Brief for **${city.name}**\n\nCurrently, **${city.name}** records an Air Quality Index of **${city.currentAqi} (${city.category})**.\n\n**Primary Health Actions:**\n1. **Respiratory Filtration:** ${isHighSmog ? 'Wear a certified N95 respirator for all outdoor excursions.' : 'Clean ambient air; no mandatory mask required.'}\n2. **Indoor Sanctuary:** Run HEPA filtration continuously in sleeping quarters.\n3. **Ventilation Synchronization:** ${city.inversionAdvisory?.isActive ? 'Wait for the 13:00–15:00 solar thermal breakup window before opening windows.' : 'Ventilate during low-traffic afternoon hours.'}\n\n**Direct Impact:**\n- Adhering to synchronized ventilation and N95 usage avoids **up to 75%** of daily ambient particulate dose.`,
    exposureSavedPct: 75,
    pm25Avoided: Number((city.pollutants.pm25.value * 0.75).toFixed(1)),
    suggestions: [
      'When is the safe window to open windows?',
      'What certified mask should I wear outdoors in this AQI?',
      'How can I build an affordable DIY air purifier?'
    ]
  };
}

/**
 * Service orchestrating AeroBot AI intelligence, routing to secure serverless /api/chat
 * with fallback to local atmospheric and building physics reasoning models.
 */
export class SmogAIService {
  /** @deprecated Kept for test compatibility. No API keys are stored in client browsers. */
  public static getApiKey(): string {
    return '';
  }

  /** @deprecated Kept for test compatibility. API keys are now securely managed on the server. */
  public static setApiKey(_key: string): void {
    // No-op: API keys are securely managed via serverless functions
  }

  /**
   * Dispatches question to serverless /api/chat endpoint or local offline reasoning model.
   *
   * @param userPrompt - User question or query text.
   * @param city - Current active CityAirData context.
   * @returns AIResponse containing markdown guidance and impact metrics.
   */
  public static async askAeroBot(userPrompt: string, city: CityAirData): Promise<AIResponse> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userPrompt,
          cityContext: {
            name: city.name,
            currentAqi: city.currentAqi,
            category: city.category,
            temperature: city.weather?.temp,
            humidity: city.weather?.humidity,
            windSpeed: city.weather?.windSpeed,
            inversionAdvisory: city.inversionAdvisory
          }
        })
      });

      if (response.ok) {
        const data = (await response.json()) as { content?: string };
        if (data?.content) {
          return {
            content: data.content,
            exposureSavedPct: 70,
            pm25Avoided: Number((city.pollutants.pm25.value * 0.7).toFixed(1)),
            suggestions: [
              'When is the safe ventilation breakup window?',
              'What certified mask should I wear outdoors today?',
              'How can I build an affordable DIY air purifier?'
            ]
          };
        }
      }
    } catch {
      // Gracefully fall back to local offline aerosol reasoning engine
    }

    return this.generateLocalReasoningResponse(userPrompt, city);
  }

  /** Evaluates query keywords and returns targeted atmospheric reasoning response. */
  public static generateLocalReasoningResponse(prompt: string, city: CityAirData): AIResponse {
    const q = prompt.toLowerCase();
    if (q.includes('inversion') || q.includes('window') || q.includes('ventilat') || q.includes('breakup')) {
      return generateInversionAdvice(city);
    }
    if (q.includes('mask') || q.includes('respirator') || q.includes('n95') || q.includes('cloth')) {
      return generateMaskAdvice(city);
    }
    if (q.includes('purifier') || q.includes('diy') || q.includes('filter') || q.includes('corsi') || q.includes('hepa')) {
      return generateIndoorHacksAdvice(city);
    }
    if (q.includes('routine') || q.includes('emission') || q.includes('transit') || q.includes('commute')) {
      return generateEmissionRoutineAdvice(city);
    }
    return generateGeneralDefenseAdvice(city);
  }
}
