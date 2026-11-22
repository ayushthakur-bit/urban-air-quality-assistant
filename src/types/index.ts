export type AQICategory = 
  | 'Good' 
  | 'Moderate' 
  | 'Unhealthy for Sensitive Groups' 
  | 'Unhealthy' 
  | 'Very Unhealthy' 
  | 'Hazardous';

export interface PollutantDetail {
  code: 'PM2.5' | 'PM10' | 'NO2' | 'SO2' | 'CO' | 'O3';
  name: string;
  value: number;
  unit: string;
  status: 'Good' | 'Moderate' | 'Unhealthy' | 'Hazardous';
  standardLimit: number; // reference WHO/EPA limit
  explanation: string;
}

export interface HourlyForecast {
  time: string; // e.g. "06:00"
  aqi: number;
  pm25: number;
  temp: number;
}

export interface DailyForecast {
  day: string; // e.g. "Mon"
  date: string; // e.g. "Nov 23"
  aqi: number;
  maxAqi: number;
  minAqi: number;
  category: AQICategory;
  temp: number;
  weatherCondition: string;
}

export interface LowEmissionRoutine {
  title: string;
  timing: string;
  impact: string;
  category: 'Transit' | 'Home' | 'Ventilation' | 'Community';
}

export interface IndoorAirHack {
  title: string;
  description: string;
  impact: string;
}

export interface InversionAdvisory {
  isActive: boolean;
  status: string;
  locationDetails: string;
  smogCeilingTrappedUntil: string;
  ventilationBreakupWindow: string;
  alertMessage: string;
  lowEmissionRoutines: LowEmissionRoutine[];
  indoorHacks: IndoorAirHack[];
}

export interface CityAirData {
  id: string;
  name: string;
  stateOrRegion: string;
  country: string;
  lat: number;
  lng: number;
  currentAqi: number;
  category: AQICategory;
  updatedAt: string;
  image?: string;
  inversionAdvisory?: InversionAdvisory;
  weather: {
    temp: number; // Celsius
    humidity: number; // %
    windSpeed: number; // km/h
    condition: string;
  };
  pollutants: {
    pm25: PollutantDetail;
    pm10: PollutantDetail;
    no2: PollutantDetail;
    so2: PollutantDetail;
    co: PollutantDetail;
    o3: PollutantDetail;
  };
  hourlyTrend: HourlyForecast[];
  dailyForecast: DailyForecast[];
  healthAdvice: {
    mask: {
      required: boolean;
      type: string;
      advice: string;
    };
    exercise: {
      allowed: boolean;
      advice: string;
    };
    sensitiveGroups: {
      warning: boolean;
      advice: string;
    };
    ventilation: {
      openWindows: boolean;
      advice: string;
    };
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
  impactData?: {
    exposureSavedPct?: number;
    pm25Avoided?: number;
  };
}
