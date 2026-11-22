# 🌍 UrbanAir | Urban Air Quality & Winter Smog Defense Assistant

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-5.1-729b1b.svg)](https://vitest.dev/)
[![WCAG AA](https://img.shields.io/badge/WCAG-2.1_AA_Compliant-emerald.svg)](https://www.w3.org/WAI/standards-guidelines/wcag/)

> **UrbanAir** is a modern, responsive web application and GenAI-powered assistant designed to help families, residents, and communities navigate severe winter smog and urban air pollution crises with real-time telemetry, atmospheric science explanations, and preventive health guidance.

---

## ✨ Features & Architecture

### 1. 📊 Live Urban Air Quality Telemetry
- **Dynamic AQI Gauge:** Real-time color-coded radial gauge with animated count-up and instant EPA/WHO category labels (`Good`, `Moderate`, `Unhealthy for Sensitive Groups`, `Unhealthy`, `Very Unhealthy`, `Hazardous`).
- **City Search & GPS Geolocation:** Instant Euclidean distance matching to nearest monitoring station with input sanitization.
- **Monitored City Skylines:** Quick switching between major metropolitan air basins (Delhi, Mumbai, Surat, Ahmedabad, New York, London, Tokyo, Paris, Los Angeles).

### 2. 🧪 6 Core Pollutants Breakdown
Individual telemetry cards featuring real urban photography, live concentration readings, standard units, WHO guideline limits, and impact explanations:
- **PM2.5:** Microscopic soot and smoke droplets (< 2.5 µm).
- **PM10:** Inhalable coarse dust, suspended road sediment, and silica.
- **NO2:** Combustion gas byproduct triggering airway inflammation.
- **SO2:** Industrial fuel byproduct causing throat tightness.
- **CO:** Carbon monoxide reducing oxygen delivery to body tissue.
- **O3:** Photochemical ground-level ozone.

### 3. 🌡️ Severe Winter Smog & Thermal Inversion Advisory
- **Ground-Level Temperature Inversion Radar:** Real-time alert for cities experiencing thermal stagnation (e.g. Delhi NCR / Anand Vihar / Gurugram).
- **Morning Smog Ceiling Tracking:** Flags the cool ground-level air lid trapping vehicle soot until 10:30 AM.
- **Safe Ventilation Breakup Window:** Highlights the midday solar thermal window (13:00 – 15:00) when air can safely be refreshed indoors without drawing in morning smog.
- **Low-Emission Daily Routines:** Quantified guidance on anti-idling, transit shifts, and cooking schedules (e.g. 48% exposure reduction, 2.4 kg CO2 saved).
- **Indoor Air Quality Hacks:** DIY $35 Corsi-Rosenthal MERV-13 purifier sizing (450 CFM CADR) and dual-layer HEPA airlock sealing.

### 4. 📈 Predictive Charts (24h Trend & 7-Day Forecast)
- High-performance responsive charts built with Recharts.
- Toggle between 24-hour diurnal trend and 7-day extended forecast with min/max AQI ranges.

### 5. 🤖 AeroBot GenAI Smog Defense Assistant
- Synchronized with active city telemetry and winter inversion models.
- Built-in zero-dependency atmospheric reasoning engine for instant offline advice.
- Optional Google Gemini API integration for live generative reasoning.

### 6. 🎨 Accessible, Responsive Design
- **Theme Support:** Smooth transitions between Light and Dark modes with persistent `localStorage` sync.
- **WCAG 2.1 AA Compliance:** Minimum 4.5:1 text contrast on all elements (17.74:1 light, 17.46:1 dark) and high-contrast AQI badges.
- **Offline Assets:** 28 royalty-free WebP images stored locally with explicit aspect ratios preventing Cumulative Layout Shift (CLS).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- pnpm (recommended) or npm

### Installation
```bash
# Clone the repository
git clone https://github.com/ayushthakur-bit/urban-air-quality-assistant.git
cd urban-air-quality-assistant

# Install dependencies
pnpm install

# Start local development server
pnpm dev
```
The server will start at `http://localhost:3000`.

### Production Build & Preview
```bash
# Type check and build optimized bundle
pnpm build

# Preview production build locally
pnpm preview
```

### Running Automated Tests
```bash
pnpm test
```

---

## 📁 Project Structure

```
urban-air-quality-assistant/
├── public/
│   └── assets/
│       ├── images/          # 28 optimized local WebP assets
│       │   └── credits.txt  # Photographer licensing attributions
│       └── screenshots/     # Viewport validation captures
├── src/
│   ├── __tests__/           # 5 Vitest suites (23 automated unit tests)
│   │   ├── aqiCalculations.test.ts
│   │   ├── pollutants.test.ts
│   │   ├── securitySanitization.test.ts
│   │   ├── winterSmogTelemetry.test.ts
│   │   └── aiServiceReasoning.test.ts
│   ├── components/          # Clean modular React components
│   │   ├── AIAssistantChat.tsx
│   │   ├── AirQualityCharts.tsx
│   │   ├── AQILevelsGuide.tsx
│   │   ├── CausesOfPollution.tsx
│   │   ├── CityCards.tsx
│   │   ├── CreditsModal.tsx
│   │   ├── Footer.tsx
│   │   ├── HealthAdvice.tsx
│   │   ├── Hero.tsx
│   │   ├── LiveAQICard.tsx
│   │   ├── Navbar.tsx
│   │   ├── PollutantGrid.tsx
│   │   ├── SkeletonLoader.tsx
│   │   └── WinterSmogAdvisory.tsx
│   ├── data/
│   │   └── mockData.ts      # Multi-city database and AQI definitions
│   ├── services/
│   │   └── aiService.ts     # AeroBot AI reasoning engine
│   ├── types/
│   │   └── index.ts         # Strict TypeScript definitions
│   ├── utils/
│   │   ├── security.ts      # Input sanitization and XSS protection
│   │   └── storage.ts       # Safe localStorage wrapper with fallback
│   ├── App.tsx              # Root application
│   ├── index.css            # Standardized theme token system
│   └── main.tsx
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts           # Vendor manualChunks code splitting
```

---

## 📜 Image Licensing
All photography assets are converted to WebP and licensed under royalty-free terms (Unsplash, Pixabay, Pexels). See [public/assets/images/credits.txt](file:///d:/promptwars%20website/public/assets/images/credits.txt) and the in-app Image Credits modal for detailed photographer attributions.

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
