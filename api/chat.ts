/**
 * Vercel Serverless Function: /api/chat
 * Securely proxies AI advice requests to Google Gemini without exposing credentials in client browsers.
 */

interface ChatRequestBody {
  message?: string;
  cityContext?: {
    name?: string;
    currentAqi?: number;
    category?: string;
    temperature?: number;
    humidity?: number;
    windSpeed?: number;
    inversionAdvisory?: {
      isActive?: boolean;
      smogCeilingTrappedUntil?: string;
      ventilationBreakupWindow?: string;
    };
  };
}

/** Formats system prompt context for Gemini. */
function buildSystemPrompt(context?: ChatRequestBody['cityContext']): string {
  const cityName = context?.name ?? 'your city';
  const aqi = context?.currentAqi ?? 150;
  const cat = context?.category ?? 'Unhealthy';
  const inversion = context?.inversionAdvisory?.isActive
    ? `Ground-level temperature inversion active. Trapped until ${context.inversionAdvisory.smogCeilingTrappedUntil}. Safe window: ${context.inversionAdvisory.ventilationBreakupWindow}.`
    : 'No active inversion layer detected.';

  return `You are AeroBot, an expert urban air quality and smog defense assistant for ${cityName}.
Current AQI: ${aqi} (${cat}).
Atmospheric Status: ${inversion}
Provide concise, actionable advice for city residents (timing of ventilation, N95 masks, air purifiers, outdoor exercise, sensitive groups). Be empathetic and scientifically precise.`;
}

/** Offline fallback intelligence generator for server responses. */
function generateModeledResponse(prompt: string, context?: ChatRequestBody['cityContext']): string {
  const p = prompt.toLowerCase();
  const city = context?.name ?? 'your city';
  const aqi = context?.currentAqi ?? 180;

  if (p.includes('window') || p.includes('ventilat') || p.includes('fresh air')) {
    return `🌬️ **Ventilation Advisory for ${city} (AQI ${aqi}):**
During winter temperature stagnation, ground-level vehicle exhaust is trapped under cold morning air. Open windows strictly between **13:00 and 15:00** when solar heating lifts the inversion lid. Run HEPA air purifiers before and after opening.`;
  }
  if (p.includes('mask') || p.includes('n95') || p.includes('cloth')) {
    return `😷 **Respiratory Mask Protocol:**
At AQI ${aqi}, cloth and surgical masks offer <15% filtration of PM2.5 soot. Use a certified **N95, KN95, or FFP2 respirator** with a tight facial seal. Avoid exhaust valves if protecting immunocompromised household members.`;
  }
  if (
    p.includes('child') ||
    p.includes('baby') ||
    p.includes('kid') ||
    p.includes('elderly') ||
    p.includes('asthma')
  ) {
    return `👶 **Vulnerable Group Protocol for ${city}:**
Children breathe up to 50% more air per pound than adults. Keep children and older adults indoors today. Keep rescue inhalers primed for asthma sufferers. Create a clean bedroom sanctuary with a high-CADR HEPA cleaner.`;
  }
  return `🛡️ **AeroBot Smog Defense Guidance for ${city} (AQI ${aqi}):**
1. **Air Filtration:** Run high-CADR purifiers in bedrooms continuously.
2. **Outdoor Activity:** Restrict strenuous outdoor exercise until ambient AQI drops below 100.
3. **Hydration & Protection:** Wear an N95 mask outdoors, rinse sinuses with saline, and seal drafty window gaps.`;
}

/** Vercel Serverless Function entry point. */
export default async function handler(req: any, res: any): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  const { message, cityContext } = (req.body ?? {}) as ChatRequestBody;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Prompt message is required.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      content: generateModeledResponse(message, cityContext),
      source: 'offline-reasoning-engine'
    });
  }

  try {
    const systemPrompt = buildSystemPrompt(cityContext);
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{ parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }] }]
    };

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return res.status(200).json({ content: text, source: 'gemini-1.5-flash' });
      }
    }
  } catch (error) {
    console.warn('[Serverless AI] Gemini API fetch error:', error);
  }

  return res.status(200).json({
    content: generateModeledResponse(message, cityContext),
    source: 'offline-reasoning-engine'
  });
}
