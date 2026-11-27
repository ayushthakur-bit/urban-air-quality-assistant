import { CityAirData } from '../types';

export const CITIES_DATABASE: CityAirData[] = [
  {
    id: 'delhi',
    name: 'Delhi',
    stateOrRegion: 'National Capital Territory',
    country: 'India',
    lat: 28.6139,
    lng: 77.209,
    currentAqi: 384,
    category: 'Hazardous',
    updatedAt: 'Just now',
    image: '/assets/images/city-delhi.webp',
    inversionAdvisory: {
      isActive: true,
      status: 'Active Ground Inversion',
      locationDetails: 'Delhi NCR (Anand Vihar / Gurugram)',
      smogCeilingTrappedUntil: '10:30 AM',
      ventilationBreakupWindow: '13:00 - 15:00 (Breakup Window)',
      alertMessage:
        'Ground-level temperature inversion active in Delhi NCR (Anand Vihar / Gurugram). Smog ceiling trapped until 10:30 AM. Safe ventilation window opens at 13:00 - 15:00 (Breakup Window).',
      lowEmissionRoutines: [
        {
          title: 'Shift Morning Commute & Anti-Idling',
          timing: 'Before 09:00 AM or after 11:00 AM',
          impact:
            'Reduces personal particulate inhalation by up to 48% and cuts idling emissions in stalled traffic.',
          category: 'Transit'
        },
        {
          title: 'Postpone High-Heat Indoor Searing',
          timing: 'Hold until 13:00 PM Breakup Window',
          impact: 'Avoids internal PM2.5 spikes when home ventilation is tightly sealed.',
          category: 'Home'
        },
        {
          title: 'Window Aeration Breakup Window',
          timing: '13:00 – 15:00 PM',
          impact:
            'Solar thermal lift breaks the cold inversion ceiling, allowing safe cross-ventilation.',
          category: 'Ventilation'
        }
      ],
      indoorHacks: [
        {
          title: 'Dual-Layer HEPA + Activated Carbon Airlock',
          description:
            'Position purifier centrally in master bedroom with door threshold silicone sweeps installed.',
          impact: 'Lowers indoor PM2.5 from 325 µg/m³ to under 20 µg/m³ (94% exposure reduction).'
        },
        {
          title: 'DIY Corsi-Rosenthal Box ($35–$45)',
          description:
            'Four MERV-13 furnace filters taped to a standard 20" box fan generates 450+ CFM clean air delivery.',
          impact:
            'Achieves 5 air changes per hour (ACH) at a fraction of commercial purifier costs.'
        }
      ]
    },
    weather: {
      temp: 14,
      humidity: 84,
      windSpeed: 4,
      condition: 'Hazy Smog'
    },
    pollutants: {
      pm25: {
        code: 'PM2.5',
        name: 'Fine Particulate Matter',
        value: 325,
        unit: 'µg/m³',
        status: 'Hazardous',
        standardLimit: 15,
        explanation:
          'Microscopic soot & smoke droplets that penetrate deep into lung tissue and blood vessels.'
      },
      pm10: {
        code: 'PM10',
        name: 'Coarse Particulates',
        value: 460,
        unit: 'µg/m³',
        status: 'Hazardous',
        standardLimit: 45,
        explanation:
          'Inhalable dust, construction sand, and mechanical wear particles irritating nasal airways.'
      },
      no2: {
        code: 'NO2',
        name: 'Nitrogen Dioxide',
        value: 78,
        unit: 'ppb',
        status: 'Unhealthy',
        standardLimit: 25,
        explanation:
          'Pungent combustion gas from vehicles & power plants triggering airway inflammation and asthma.'
      },
      so2: {
        code: 'SO2',
        name: 'Sulfur Dioxide',
        value: 22,
        unit: 'ppb',
        status: 'Moderate',
        standardLimit: 20,
        explanation:
          'Produced by industrial coal and oil burning; causes throat tightness and eye stinging.'
      },
      co: {
        code: 'CO',
        name: 'Carbon Monoxide',
        value: 2.8,
        unit: 'ppm',
        status: 'Moderate',
        standardLimit: 4.0,
        explanation:
          'Colorless, odorless gas from incomplete combustion reducing oxygen delivery to body organs.'
      },
      o3: {
        code: 'O3',
        name: 'Ground Ozone',
        value: 34,
        unit: 'ppb',
        status: 'Good',
        standardLimit: 50,
        explanation:
          'Formed when vehicular exhaust reacts with sunlight; lower in winter mornings, peaks in afternoon.'
      }
    },
    hourlyTrend: [
      { time: '00:00', aqi: 370, pm25: 310, temp: 13 },
      { time: '03:00', aqi: 395, pm25: 340, temp: 11 },
      { time: '06:00', aqi: 420, pm25: 365, temp: 10 },
      { time: '09:00', aqi: 410, pm25: 350, temp: 13 },
      { time: '12:00', aqi: 340, pm25: 280, temp: 18 },
      { time: '15:00', aqi: 290, pm25: 230, temp: 21 },
      { time: '18:00', aqi: 360, pm25: 300, temp: 17 },
      { time: '21:00', aqi: 384, pm25: 325, temp: 15 }
    ],
    dailyForecast: [
      {
        day: 'Sun',
        date: 'Nov 22',
        aqi: 384,
        maxAqi: 420,
        minAqi: 290,
        category: 'Hazardous',
        temp: 21,
        weatherCondition: 'Smog'
      },
      {
        day: 'Mon',
        date: 'Nov 23',
        aqi: 365,
        maxAqi: 395,
        minAqi: 280,
        category: 'Hazardous',
        temp: 20,
        weatherCondition: 'Haze'
      },
      {
        day: 'Tue',
        date: 'Nov 24',
        aqi: 330,
        maxAqi: 360,
        minAqi: 250,
        category: 'Hazardous',
        temp: 22,
        weatherCondition: 'Haze'
      },
      {
        day: 'Wed',
        date: 'Nov 25',
        aqi: 285,
        maxAqi: 310,
        minAqi: 220,
        category: 'Very Unhealthy',
        temp: 23,
        weatherCondition: 'Partly Sunny'
      },
      {
        day: 'Thu',
        date: 'Nov 26',
        aqi: 260,
        maxAqi: 290,
        minAqi: 195,
        category: 'Very Unhealthy',
        temp: 22,
        weatherCondition: 'Breezy'
      },
      {
        day: 'Fri',
        date: 'Nov 27',
        aqi: 240,
        maxAqi: 270,
        minAqi: 180,
        category: 'Very Unhealthy',
        temp: 21,
        weatherCondition: 'Clear'
      },
      {
        day: 'Sat',
        date: 'Nov 28',
        aqi: 220,
        maxAqi: 250,
        minAqi: 165,
        category: 'Very Unhealthy',
        temp: 22,
        weatherCondition: 'Clear'
      }
    ],
    healthAdvice: {
      mask: {
        required: true,
        type: 'Certified N95 / FFP2 / KF94 Respirator',
        advice:
          'Tightly sealed N95 respirator mandatory outdoors. Cloth and surgical masks offer near-zero protection against fine sub-micron soot.'
      },
      exercise: {
        allowed: false,
        advice:
          'Strictly avoid all outdoor exercise, jogging, and sports. High ventilation rate forces particulate matter directly into cardiovascular capillaries.'
      },
      sensitiveGroups: {
        warning: true,
        advice:
          'Children, pregnant women, asthmatics, and seniors should remain strictly indoors in sealed rooms with active HEPA filtration.'
      },
      ventilation: {
        openWindows: false,
        advice:
          'Keep doors and windows tightly latched. Seal threshold drafts. Run indoor HEPA or DIY Corsi-Rosenthal purifiers continuously.'
      }
    }
  },
  {
    id: 'new-york',
    name: 'New York City',
    stateOrRegion: 'New York',
    country: 'United States',
    lat: 40.7128,
    lng: -74.006,
    currentAqi: 36,
    category: 'Good',
    updatedAt: 'Just now',
    image: '/assets/images/city-newyork.webp',
    weather: {
      temp: 9,
      humidity: 52,
      windSpeed: 16,
      condition: 'Clear Sky'
    },
    pollutants: {
      pm25: {
        code: 'PM2.5',
        name: 'Fine Particulate Matter',
        value: 8.5,
        unit: 'µg/m³',
        status: 'Good',
        standardLimit: 15,
        explanation:
          'Within healthy WHO guideline levels. Minimal fine combustion particle presence.'
      },
      pm10: {
        code: 'PM10',
        name: 'Coarse Particulates',
        value: 14,
        unit: 'µg/m³',
        status: 'Good',
        standardLimit: 45,
        explanation: 'Low concentrations of street dust and airborne soil.'
      },
      no2: {
        code: 'NO2',
        name: 'Nitrogen Dioxide',
        value: 16,
        unit: 'ppb',
        status: 'Good',
        standardLimit: 25,
        explanation: 'Vehicle emissions rapidly dispersed by brisk coastal winds.'
      },
      so2: {
        code: 'SO2',
        name: 'Sulfur Dioxide',
        value: 3,
        unit: 'ppb',
        status: 'Good',
        standardLimit: 20,
        explanation: 'Trace levels from regional utilities.'
      },
      co: {
        code: 'CO',
        name: 'Carbon Monoxide',
        value: 0.4,
        unit: 'ppm',
        status: 'Good',
        standardLimit: 4.0,
        explanation: 'Negligible concentration across city ambient sensors.'
      },
      o3: {
        code: 'O3',
        name: 'Ground Ozone',
        value: 28,
        unit: 'ppb',
        status: 'Good',
        standardLimit: 50,
        explanation: 'Safe baseline ambient levels with cool autumnal temperatures.'
      }
    },
    hourlyTrend: [
      { time: '00:00', aqi: 32, pm25: 7, temp: 8 },
      { time: '03:00', aqi: 30, pm25: 6.5, temp: 7 },
      { time: '06:00', aqi: 35, pm25: 8, temp: 7 },
      { time: '09:00', aqi: 42, pm25: 9.8, temp: 9 },
      { time: '12:00', aqi: 38, pm25: 8.9, temp: 11 },
      { time: '15:00', aqi: 34, pm25: 8.0, temp: 12 },
      { time: '18:00', aqi: 37, pm25: 8.6, temp: 10 },
      { time: '21:00', aqi: 36, pm25: 8.5, temp: 9 }
    ],
    dailyForecast: [
      {
        day: 'Sun',
        date: 'Nov 22',
        aqi: 36,
        maxAqi: 44,
        minAqi: 28,
        category: 'Good',
        temp: 11,
        weatherCondition: 'Clear'
      },
      {
        day: 'Mon',
        date: 'Nov 23',
        aqi: 40,
        maxAqi: 48,
        minAqi: 30,
        category: 'Good',
        temp: 12,
        weatherCondition: 'Sunny'
      },
      {
        day: 'Tue',
        date: 'Nov 24',
        aqi: 45,
        maxAqi: 55,
        minAqi: 32,
        category: 'Good',
        temp: 10,
        weatherCondition: 'Partly Cloudy'
      },
      {
        day: 'Wed',
        date: 'Nov 25',
        aqi: 38,
        maxAqi: 46,
        minAqi: 29,
        category: 'Good',
        temp: 8,
        weatherCondition: 'Breezy'
      },
      {
        day: 'Thu',
        date: 'Nov 26',
        aqi: 32,
        maxAqi: 40,
        minAqi: 26,
        category: 'Good',
        temp: 9,
        weatherCondition: 'Clear'
      },
      {
        day: 'Fri',
        date: 'Nov 27',
        aqi: 35,
        maxAqi: 42,
        minAqi: 28,
        category: 'Good',
        temp: 10,
        weatherCondition: 'Sunny'
      },
      {
        day: 'Sat',
        date: 'Nov 28',
        aqi: 38,
        maxAqi: 46,
        minAqi: 30,
        category: 'Good',
        temp: 11,
        weatherCondition: 'Partly Cloudy'
      }
    ],
    healthAdvice: {
      mask: {
        required: false,
        type: 'No mask required',
        advice: 'Air quality is pristine. Normal outdoor activities pose no particulate hazard.'
      },
      exercise: {
        allowed: true,
        advice: 'Great conditions for outdoor cardio, running, cycling, and park walks.'
      },
      sensitiveGroups: {
        warning: false,
        advice: 'No specific restrictions. Safe for children, elderly, and asthmatic individuals.'
      },
      ventilation: {
        openWindows: true,
        advice: 'Feel free to open windows and aerate indoor rooms with fresh outside air.'
      }
    }
  },
  {
    id: 'london',
    name: 'London',
    stateOrRegion: 'Greater London',
    country: 'United Kingdom',
    lat: 51.5074,
    lng: -0.1278,
    currentAqi: 68,
    category: 'Moderate',
    updatedAt: 'Just now',
    image: '/assets/images/city-london.webp',
    weather: {
      temp: 8,
      humidity: 78,
      windSpeed: 10,
      condition: 'Overcast Mist'
    },
    pollutants: {
      pm25: {
        code: 'PM2.5',
        name: 'Fine Particulate Matter',
        value: 19.5,
        unit: 'µg/m³',
        status: 'Moderate',
        standardLimit: 15,
        explanation:
          'Slightly elevated due to domestic wood burning stoves and commuter diesel vehicles.'
      },
      pm10: {
        code: 'PM10',
        name: 'Coarse Particulates',
        value: 29,
        unit: 'µg/m³',
        status: 'Good',
        standardLimit: 45,
        explanation: 'Normal road tire wear and urban dust levels.'
      },
      no2: {
        code: 'NO2',
        name: 'Nitrogen Dioxide',
        value: 32,
        unit: 'ppb',
        status: 'Moderate',
        standardLimit: 25,
        explanation: 'Typical road corridor exhaust levels in urban central zones.'
      },
      so2: {
        code: 'SO2',
        name: 'Sulfur Dioxide',
        value: 6,
        unit: 'ppb',
        status: 'Good',
        standardLimit: 20,
        explanation: 'Well within UK clean air compliance thresholds.'
      },
      co: {
        code: 'CO',
        name: 'Carbon Monoxide',
        value: 0.6,
        unit: 'ppm',
        status: 'Good',
        standardLimit: 4.0,
        explanation: 'Low ambient baseline.'
      },
      o3: {
        code: 'O3',
        name: 'Ground Ozone',
        value: 22,
        unit: 'ppb',
        status: 'Good',
        standardLimit: 50,
        explanation: 'Suppressed by cloud cover and low ultraviolet index.'
      }
    },
    hourlyTrend: [
      { time: '00:00', aqi: 55, pm25: 15, temp: 7 },
      { time: '03:00', aqi: 52, pm25: 14, temp: 6 },
      { time: '06:00', aqi: 58, pm25: 16, temp: 6 },
      { time: '09:00', aqi: 74, pm25: 22, temp: 7 },
      { time: '12:00', aqi: 65, pm25: 18, temp: 9 },
      { time: '15:00', aqi: 60, pm25: 17, temp: 10 },
      { time: '18:00', aqi: 72, pm25: 21, temp: 8 },
      { time: '21:00', aqi: 68, pm25: 19.5, temp: 8 }
    ],
    dailyForecast: [
      {
        day: 'Sun',
        date: 'Nov 22',
        aqi: 68,
        maxAqi: 76,
        minAqi: 52,
        category: 'Moderate',
        temp: 9,
        weatherCondition: 'Cloudy'
      },
      {
        day: 'Mon',
        date: 'Nov 23',
        aqi: 72,
        maxAqi: 82,
        minAqi: 56,
        category: 'Moderate',
        temp: 10,
        weatherCondition: 'Rain'
      },
      {
        day: 'Tue',
        date: 'Nov 24',
        aqi: 54,
        maxAqi: 62,
        minAqi: 45,
        category: 'Moderate',
        temp: 8,
        weatherCondition: 'Showers'
      },
      {
        day: 'Wed',
        date: 'Nov 25',
        aqi: 48,
        maxAqi: 55,
        minAqi: 38,
        category: 'Good',
        temp: 7,
        weatherCondition: 'Clear'
      },
      {
        day: 'Thu',
        date: 'Nov 26',
        aqi: 60,
        maxAqi: 68,
        minAqi: 48,
        category: 'Moderate',
        temp: 8,
        weatherCondition: 'Overcast'
      },
      {
        day: 'Fri',
        date: 'Nov 27',
        aqi: 65,
        maxAqi: 74,
        minAqi: 50,
        category: 'Moderate',
        temp: 9,
        weatherCondition: 'Fog'
      },
      {
        day: 'Sat',
        date: 'Nov 28',
        aqi: 58,
        maxAqi: 66,
        minAqi: 46,
        category: 'Moderate',
        temp: 8,
        weatherCondition: 'Cloudy'
      }
    ],
    healthAdvice: {
      mask: {
        required: false,
        type: 'Optional for sensitive groups',
        advice:
          'General population does not need a mask. Extremely sensitive asthmatics may consider light protection along heavy traffic avenues.'
      },
      exercise: {
        allowed: true,
        advice:
          'Outdoor exercise is safe for most people. Asthmatics should keep rescue inhalers handy.'
      },
      sensitiveGroups: {
        warning: true,
        advice:
          'Individuals with severe lung diseases should monitor for mild cough or airway tightness.'
      },
      ventilation: {
        openWindows: true,
        advice: 'Safe to ventilate homes, especially during midday wind clearing.'
      }
    }
  },
  {
    id: 'los-angeles',
    name: 'Los Angeles',
    stateOrRegion: 'California',
    country: 'United States',
    lat: 34.0522,
    lng: -118.2437,
    currentAqi: 124,
    category: 'Unhealthy for Sensitive Groups',
    updatedAt: 'Just now',
    image: '/assets/images/city-losangeles.webp',
    weather: {
      temp: 22,
      humidity: 48,
      windSpeed: 7,
      condition: 'Sunny Smog Haze'
    },
    pollutants: {
      pm25: {
        code: 'PM2.5',
        name: 'Fine Particulate Matter',
        value: 44.5,
        unit: 'µg/m³',
        status: 'Unhealthy',
        standardLimit: 15,
        explanation:
          'Trapped vehicle exhaust and tire microplastics within the mountain-ringed Los Angeles basin.'
      },
      pm10: {
        code: 'PM10',
        name: 'Coarse Particulates',
        value: 68,
        unit: 'µg/m³',
        status: 'Moderate',
        standardLimit: 45,
        explanation: 'Dust and dry pavement sediment resuspension along freeways.'
      },
      no2: {
        code: 'NO2',
        name: 'Nitrogen Dioxide',
        value: 42,
        unit: 'ppb',
        status: 'Unhealthy',
        standardLimit: 25,
        explanation: 'Elevated along I-405, I-10, and port truck transport corridors.'
      },
      so2: {
        code: 'SO2',
        name: 'Sulfur Dioxide',
        value: 8,
        unit: 'ppb',
        status: 'Good',
        standardLimit: 20,
        explanation: 'Low due to stringent low-sulfur marine fuel regulations.'
      },
      co: {
        code: 'CO',
        name: 'Carbon Monoxide',
        value: 1.2,
        unit: 'ppm',
        status: 'Good',
        standardLimit: 4.0,
        explanation: 'Normal automotive baseline.'
      },
      o3: {
        code: 'O3',
        name: 'Ground Ozone',
        value: 68,
        unit: 'ppb',
        status: 'Unhealthy',
        standardLimit: 50,
        explanation: 'Photochemical smog spike catalyzed by intense California sunlight.'
      }
    },
    hourlyTrend: [
      { time: '00:00', aqi: 85, pm25: 28, temp: 16 },
      { time: '03:00', aqi: 78, pm25: 25, temp: 15 },
      { time: '06:00', aqi: 92, pm25: 31, temp: 15 },
      { time: '09:00', aqi: 110, pm25: 38, temp: 18 },
      { time: '12:00', aqi: 132, pm25: 48, temp: 22 },
      { time: '15:00', aqi: 138, pm25: 50, temp: 23 },
      { time: '18:00', aqi: 128, pm25: 45, temp: 20 },
      { time: '21:00', aqi: 124, pm25: 44.5, temp: 18 }
    ],
    dailyForecast: [
      {
        day: 'Sun',
        date: 'Nov 22',
        aqi: 124,
        maxAqi: 140,
        minAqi: 82,
        category: 'Unhealthy for Sensitive Groups',
        temp: 23,
        weatherCondition: 'Haze'
      },
      {
        day: 'Mon',
        date: 'Nov 23',
        aqi: 118,
        maxAqi: 135,
        minAqi: 78,
        category: 'Unhealthy for Sensitive Groups',
        temp: 24,
        weatherCondition: 'Sunny'
      },
      {
        day: 'Tue',
        date: 'Nov 24',
        aqi: 105,
        maxAqi: 125,
        minAqi: 72,
        category: 'Unhealthy for Sensitive Groups',
        temp: 22,
        weatherCondition: 'Sunny'
      },
      {
        day: 'Wed',
        date: 'Nov 25',
        aqi: 88,
        maxAqi: 98,
        minAqi: 62,
        category: 'Moderate',
        temp: 20,
        weatherCondition: 'Breezy'
      },
      {
        day: 'Thu',
        date: 'Nov 26',
        aqi: 76,
        maxAqi: 85,
        minAqi: 54,
        category: 'Moderate',
        temp: 21,
        weatherCondition: 'Clear'
      },
      {
        day: 'Fri',
        date: 'Nov 27',
        aqi: 92,
        maxAqi: 108,
        minAqi: 65,
        category: 'Moderate',
        temp: 23,
        weatherCondition: 'Sunny'
      },
      {
        day: 'Sat',
        date: 'Nov 28',
        aqi: 112,
        maxAqi: 128,
        minAqi: 75,
        category: 'Unhealthy for Sensitive Groups',
        temp: 24,
        weatherCondition: 'Hazy'
      }
    ],
    healthAdvice: {
      mask: {
        required: false,
        type: 'Recommended for sensitive individuals outdoors',
        advice:
          'Wear an N95 or KN95 mask if you have asthma, allergies, or cardiovascular conditions and plan to spend extended time near traffic.'
      },
      exercise: {
        allowed: false,
        advice:
          'Reduce prolonged outdoor heavy exertion. Shift afternoon runs to early morning or indoor facilities.'
      },
      sensitiveGroups: {
        warning: true,
        advice:
          'Children with asthma and elderly citizens should take frequent breaks and avoid active outdoor sports.'
      },
      ventilation: {
        openWindows: false,
        advice: 'Keep windows closed during midday ozone peaks (12:00 - 16:00). Run air filtration.'
      }
    }
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    stateOrRegion: 'Kanto',
    country: 'Japan',
    lat: 35.6762,
    lng: 139.6503,
    currentAqi: 28,
    category: 'Good',
    updatedAt: 'Just now',
    image: '/assets/images/city-tokyo.webp',
    weather: {
      temp: 13,
      humidity: 58,
      windSpeed: 14,
      condition: 'Clear Sky'
    },
    pollutants: {
      pm25: {
        code: 'PM2.5',
        name: 'Fine Particulate Matter',
        value: 6.8,
        unit: 'µg/m³',
        status: 'Good',
        standardLimit: 15,
        explanation:
          'Excellent air quality maintained through electrified transit and strict industrial controls.'
      },
      pm10: {
        code: 'PM10',
        name: 'Coarse Particulates',
        value: 12,
        unit: 'µg/m³',
        status: 'Good',
        standardLimit: 45,
        explanation: 'Very low road dust levels.'
      },
      no2: {
        code: 'NO2',
        name: 'Nitrogen Dioxide',
        value: 14,
        unit: 'ppb',
        status: 'Good',
        standardLimit: 25,
        explanation: 'Minimal emissions from hybrid & electric vehicle fleets.'
      },
      so2: {
        code: 'SO2',
        name: 'Sulfur Dioxide',
        value: 2,
        unit: 'ppb',
        status: 'Good',
        standardLimit: 20,
        explanation: 'Negligible sulfur footprint.'
      },
      co: {
        code: 'CO',
        name: 'Carbon Monoxide',
        value: 0.3,
        unit: 'ppm',
        status: 'Good',
        standardLimit: 4.0,
        explanation: 'Clean combustion across all sectors.'
      },
      o3: {
        code: 'O3',
        name: 'Ground Ozone',
        value: 24,
        unit: 'ppb',
        status: 'Good',
        standardLimit: 50,
        explanation: 'Healthy ambient background levels.'
      }
    },
    hourlyTrend: [
      { time: '00:00', aqi: 24, pm25: 5.5, temp: 11 },
      { time: '03:00', aqi: 22, pm25: 5.0, temp: 10 },
      { time: '06:00', aqi: 26, pm25: 6.2, temp: 11 },
      { time: '09:00', aqi: 32, pm25: 7.8, temp: 13 },
      { time: '12:00', aqi: 30, pm25: 7.2, temp: 15 },
      { time: '15:00', aqi: 28, pm25: 6.8, temp: 15 },
      { time: '18:00', aqi: 31, pm25: 7.4, temp: 14 },
      { time: '21:00', aqi: 28, pm25: 6.8, temp: 13 }
    ],
    dailyForecast: [
      {
        day: 'Sun',
        date: 'Nov 22',
        aqi: 28,
        maxAqi: 34,
        minAqi: 22,
        category: 'Good',
        temp: 15,
        weatherCondition: 'Clear'
      },
      {
        day: 'Mon',
        date: 'Nov 23',
        aqi: 30,
        maxAqi: 36,
        minAqi: 24,
        category: 'Good',
        temp: 14,
        weatherCondition: 'Sunny'
      },
      {
        day: 'Tue',
        date: 'Nov 24',
        aqi: 35,
        maxAqi: 42,
        minAqi: 26,
        category: 'Good',
        temp: 13,
        weatherCondition: 'Partly Cloudy'
      },
      {
        day: 'Wed',
        date: 'Nov 25',
        aqi: 32,
        maxAqi: 38,
        minAqi: 25,
        category: 'Good',
        temp: 14,
        weatherCondition: 'Sunny'
      },
      {
        day: 'Thu',
        date: 'Nov 26',
        aqi: 26,
        maxAqi: 32,
        minAqi: 20,
        category: 'Good',
        temp: 12,
        weatherCondition: 'Breezy'
      },
      {
        day: 'Fri',
        date: 'Nov 27',
        aqi: 29,
        maxAqi: 35,
        minAqi: 22,
        category: 'Good',
        temp: 13,
        weatherCondition: 'Clear'
      },
      {
        day: 'Sat',
        date: 'Nov 28',
        aqi: 31,
        maxAqi: 37,
        minAqi: 23,
        category: 'Good',
        temp: 14,
        weatherCondition: 'Sunny'
      }
    ],
    healthAdvice: {
      mask: {
        required: false,
        type: 'No mask required',
        advice: 'Air quality is pristine and healthy for everyone.'
      },
      exercise: {
        allowed: true,
        advice: 'Ideal conditions for all outdoor workouts and activities.'
      },
      sensitiveGroups: {
        warning: false,
        advice: 'Zero risk for vulnerable groups.'
      },
      ventilation: {
        openWindows: true,
        advice: 'Open windows to freshen indoor spaces.'
      }
    }
  },
  {
    id: 'paris',
    name: 'Paris',
    stateOrRegion: 'Île-de-France',
    country: 'France',
    lat: 48.8566,
    lng: 2.3522,
    currentAqi: 54,
    category: 'Moderate',
    updatedAt: 'Just now',
    image: '/assets/images/city-paris.webp',
    weather: {
      temp: 9,
      humidity: 82,
      windSpeed: 11,
      condition: 'Partly Cloudy'
    },
    pollutants: {
      pm25: {
        code: 'PM2.5',
        name: 'Fine Particulate Matter',
        value: 15.2,
        unit: 'µg/m³',
        status: 'Moderate',
        standardLimit: 15,
        explanation:
          'At the boundary of WHO guidelines; influenced by regional heating and ring road traffic.'
      },
      pm10: {
        code: 'PM10',
        name: 'Coarse Particulates',
        value: 24,
        unit: 'µg/m³',
        status: 'Good',
        standardLimit: 45,
        explanation: 'Low coarse dust levels.'
      },
      no2: {
        code: 'NO2',
        name: 'Nitrogen Dioxide',
        value: 28,
        unit: 'ppb',
        status: 'Moderate',
        standardLimit: 25,
        explanation: 'Moderate levels concentrated along Boulevard Périphérique.'
      },
      so2: {
        code: 'SO2',
        name: 'Sulfur Dioxide',
        value: 4,
        unit: 'ppb',
        status: 'Good',
        standardLimit: 20,
        explanation: 'Clean energy grid limits sulfur emission.'
      },
      co: {
        code: 'CO',
        name: 'Carbon Monoxide',
        value: 0.5,
        unit: 'ppm',
        status: 'Good',
        standardLimit: 4.0,
        explanation: 'Minimal carbon monoxide levels.'
      },
      o3: {
        code: 'O3',
        name: 'Ground Ozone',
        value: 26,
        unit: 'ppb',
        status: 'Good',
        standardLimit: 50,
        explanation: 'Safe autumn concentrations.'
      }
    },
    hourlyTrend: [
      { time: '00:00', aqi: 48, pm25: 13, temp: 7 },
      { time: '03:00', aqi: 45, pm25: 12, temp: 6 },
      { time: '06:00', aqi: 50, pm25: 14, temp: 7 },
      { time: '09:00', aqi: 62, pm25: 18, temp: 8 },
      { time: '12:00', aqi: 56, pm25: 16, temp: 10 },
      { time: '15:00', aqi: 51, pm25: 14, temp: 11 },
      { time: '18:00', aqi: 58, pm25: 17, temp: 9 },
      { time: '21:00', aqi: 54, pm25: 15.2, temp: 8 }
    ],
    dailyForecast: [
      {
        day: 'Sun',
        date: 'Nov 22',
        aqi: 54,
        maxAqi: 64,
        minAqi: 44,
        category: 'Moderate',
        temp: 11,
        weatherCondition: 'Cloudy'
      },
      {
        day: 'Mon',
        date: 'Nov 23',
        aqi: 58,
        maxAqi: 68,
        minAqi: 48,
        category: 'Moderate',
        temp: 10,
        weatherCondition: 'Rain'
      },
      {
        day: 'Tue',
        date: 'Nov 24',
        aqi: 46,
        maxAqi: 52,
        minAqi: 38,
        category: 'Good',
        temp: 8,
        weatherCondition: 'Clear'
      },
      {
        day: 'Wed',
        date: 'Nov 25',
        aqi: 50,
        maxAqi: 58,
        minAqi: 42,
        category: 'Good',
        temp: 9,
        weatherCondition: 'Sunny'
      },
      {
        day: 'Thu',
        date: 'Nov 26',
        aqi: 55,
        maxAqi: 65,
        minAqi: 45,
        category: 'Moderate',
        temp: 10,
        weatherCondition: 'Partly Cloudy'
      },
      {
        day: 'Fri',
        date: 'Nov 27',
        aqi: 60,
        maxAqi: 70,
        minAqi: 48,
        category: 'Moderate',
        temp: 9,
        weatherCondition: 'Overcast'
      },
      {
        day: 'Sat',
        date: 'Nov 28',
        aqi: 52,
        maxAqi: 60,
        minAqi: 42,
        category: 'Moderate',
        temp: 10,
        weatherCondition: 'Sunny'
      }
    ],
    healthAdvice: {
      mask: {
        required: false,
        type: 'Not required',
        advice: 'Air quality is acceptable for healthy adults.'
      },
      exercise: {
        allowed: true,
        advice:
          'Outdoor exercise is safe. Sensitive individuals can jog in parks away from traffic.'
      },
      sensitiveGroups: {
        warning: false,
        advice: 'Very sensitive people should watch for throat irritation.'
      },
      ventilation: {
        openWindows: true,
        advice: 'Normal home aeration is safe and encouraged.'
      }
    }
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    stateOrRegion: 'Maharashtra',
    country: 'India',
    lat: 19.076,
    lng: 72.8777,
    currentAqi: 172,
    category: 'Unhealthy',
    updatedAt: 'Just now',
    image: '/assets/images/city-mumbai.webp',
    weather: {
      temp: 29,
      humidity: 71,
      windSpeed: 8,
      condition: 'Coastal Smog Haze'
    },
    pollutants: {
      pm25: {
        code: 'PM2.5',
        name: 'Fine Particulates',
        value: 94.5,
        unit: 'µg/m³',
        status: 'Unhealthy',
        standardLimit: 15,
        explanation: 'Elevated fine particles from metro construction and coastal maritime traffic.'
      },
      pm10: {
        code: 'PM10',
        name: 'Coarse Dust',
        value: 158.0,
        unit: 'µg/m³',
        status: 'Unhealthy',
        standardLimit: 45,
        explanation: 'Suspended road dust from continuous urban arterial corridors.'
      },
      no2: {
        code: 'NO2',
        name: 'Nitrogen Dioxide',
        value: 48,
        unit: 'ppb',
        status: 'Unhealthy',
        standardLimit: 25,
        explanation: 'Vehicle idling emissions along Western Express Highway and ports.'
      },
      so2: {
        code: 'SO2',
        name: 'Sulfur Dioxide',
        value: 14,
        unit: 'ppb',
        status: 'Good',
        standardLimit: 20,
        explanation: 'Refinery and port vessel combustion byproduct.'
      },
      co: {
        code: 'CO',
        name: 'Carbon Monoxide',
        value: 1.8,
        unit: 'ppm',
        status: 'Good',
        standardLimit: 4.0,
        explanation: 'Exhaust build-up in traffic gridlock.'
      },
      o3: {
        code: 'O3',
        name: 'Ground Ozone',
        value: 42,
        unit: 'ppb',
        status: 'Good',
        standardLimit: 50,
        explanation: 'Photochemical reaction under tropical coastal sunshine.'
      }
    },
    hourlyTrend: [
      { time: '00:00', aqi: 155, pm25: 82, temp: 26 },
      { time: '03:00', aqi: 148, pm25: 78, temp: 25 },
      { time: '06:00', aqi: 165, pm25: 90, temp: 25 },
      { time: '09:00', aqi: 184, pm25: 102, temp: 28 },
      { time: '12:00', aqi: 176, pm25: 96, temp: 31 },
      { time: '15:00', aqi: 170, pm25: 92, temp: 30 },
      { time: '18:00', aqi: 188, pm25: 105, temp: 29 },
      { time: '21:00', aqi: 172, pm25: 94.5, temp: 27 }
    ],
    dailyForecast: [
      {
        day: 'Sun',
        date: 'Nov 22',
        aqi: 172,
        maxAqi: 190,
        minAqi: 145,
        category: 'Unhealthy',
        temp: 29,
        weatherCondition: 'Haze'
      },
      {
        day: 'Mon',
        date: 'Nov 23',
        aqi: 165,
        maxAqi: 185,
        minAqi: 140,
        category: 'Unhealthy',
        temp: 30,
        weatherCondition: 'Partly Cloudy'
      },
      {
        day: 'Tue',
        date: 'Nov 24',
        aqi: 158,
        maxAqi: 175,
        minAqi: 135,
        category: 'Unhealthy',
        temp: 29,
        weatherCondition: 'Sunny'
      },
      {
        day: 'Wed',
        date: 'Nov 25',
        aqi: 142,
        maxAqi: 160,
        minAqi: 125,
        category: 'Unhealthy for Sensitive Groups',
        temp: 28,
        weatherCondition: 'Clear'
      },
      {
        day: 'Thu',
        date: 'Nov 26',
        aqi: 150,
        maxAqi: 168,
        minAqi: 130,
        category: 'Unhealthy for Sensitive Groups',
        temp: 29,
        weatherCondition: 'Hazy'
      },
      {
        day: 'Fri',
        date: 'Nov 27',
        aqi: 168,
        maxAqi: 188,
        minAqi: 145,
        category: 'Unhealthy',
        temp: 30,
        weatherCondition: 'Overcast'
      },
      {
        day: 'Sat',
        date: 'Nov 28',
        aqi: 160,
        maxAqi: 178,
        minAqi: 138,
        category: 'Unhealthy',
        temp: 29,
        weatherCondition: 'Hazy'
      }
    ],
    healthAdvice: {
      mask: {
        required: true,
        type: 'N95 / FFP2 Mask Recommended',
        advice: 'Wear an N95 respirator during outdoor travel and road commutes.'
      },
      exercise: {
        allowed: false,
        advice: 'Avoid morning outdoor jogging near highways. Work out in filtered indoor areas.'
      },
      sensitiveGroups: {
        warning: true,
        advice: 'Asthma patients and children should stay indoors and carry rescue inhalers.'
      },
      ventilation: {
        openWindows: false,
        advice: 'Keep sea-facing windows shut during heavy morning smog; use indoor HEPA purifiers.'
      }
    }
  },
  {
    id: 'surat',
    name: 'Surat',
    stateOrRegion: 'Gujarat',
    country: 'India',
    lat: 21.1702,
    lng: 72.8311,
    currentAqi: 145,
    category: 'Unhealthy for Sensitive Groups',
    updatedAt: 'Just now',
    image: '/assets/images/city-surat.webp',
    weather: {
      temp: 28,
      humidity: 62,
      windSpeed: 9,
      condition: 'Moderate Smog Haze'
    },
    pollutants: {
      pm25: {
        code: 'PM2.5',
        name: 'Fine Particulates',
        value: 58.0,
        unit: 'µg/m³',
        status: 'Unhealthy',
        standardLimit: 15,
        explanation: 'Industrial textile boiler emissions and heavy goods transport.'
      },
      pm10: {
        code: 'PM10',
        name: 'Coarse Dust',
        value: 124.0,
        unit: 'µg/m³',
        status: 'Unhealthy',
        standardLimit: 45,
        explanation: 'Diamond cutting and textile processing airborne particles.'
      },
      no2: {
        code: 'NO2',
        name: 'Nitrogen Dioxide',
        value: 36,
        unit: 'ppb',
        status: 'Moderate',
        standardLimit: 25,
        explanation: 'Truck traffic from Hazira industrial belt.'
      },
      so2: {
        code: 'SO2',
        name: 'Sulfur Dioxide',
        value: 16,
        unit: 'ppb',
        status: 'Good',
        standardLimit: 20,
        explanation: 'Coal and gas boilers in nearby industrial parks.'
      },
      co: {
        code: 'CO',
        name: 'Carbon Monoxide',
        value: 1.4,
        unit: 'ppm',
        status: 'Good',
        standardLimit: 4.0,
        explanation: 'Moderate traffic combustion byproduct.'
      },
      o3: {
        code: 'O3',
        name: 'Ground Ozone',
        value: 34,
        unit: 'ppb',
        status: 'Good',
        standardLimit: 50,
        explanation: 'Stable baseline photochemical levels.'
      }
    },
    hourlyTrend: [
      { time: '00:00', aqi: 130, pm25: 52, temp: 24 },
      { time: '03:00', aqi: 125, pm25: 48, temp: 23 },
      { time: '06:00', aqi: 142, pm25: 56, temp: 23 },
      { time: '09:00', aqi: 156, pm25: 64, temp: 27 },
      { time: '12:00', aqi: 148, pm25: 60, temp: 30 },
      { time: '15:00', aqi: 138, pm25: 54, temp: 29 },
      { time: '18:00', aqi: 152, pm25: 62, temp: 27 },
      { time: '21:00', aqi: 145, pm25: 58, temp: 25 }
    ],
    dailyForecast: [
      {
        day: 'Sun',
        date: 'Nov 22',
        aqi: 145,
        maxAqi: 160,
        minAqi: 120,
        category: 'Unhealthy for Sensitive Groups',
        temp: 28,
        weatherCondition: 'Haze'
      },
      {
        day: 'Mon',
        date: 'Nov 23',
        aqi: 138,
        maxAqi: 155,
        minAqi: 115,
        category: 'Unhealthy for Sensitive Groups',
        temp: 29,
        weatherCondition: 'Partly Cloudy'
      },
      {
        day: 'Tue',
        date: 'Nov 24',
        aqi: 130,
        maxAqi: 148,
        minAqi: 110,
        category: 'Unhealthy for Sensitive Groups',
        temp: 28,
        weatherCondition: 'Sunny'
      },
      {
        day: 'Wed',
        date: 'Nov 25',
        aqi: 124,
        maxAqi: 140,
        minAqi: 105,
        category: 'Unhealthy for Sensitive Groups',
        temp: 28,
        weatherCondition: 'Clear'
      },
      {
        day: 'Thu',
        date: 'Nov 26',
        aqi: 135,
        maxAqi: 150,
        minAqi: 115,
        category: 'Unhealthy for Sensitive Groups',
        temp: 29,
        weatherCondition: 'Sunny'
      },
      {
        day: 'Fri',
        date: 'Nov 27',
        aqi: 142,
        maxAqi: 158,
        minAqi: 122,
        category: 'Unhealthy for Sensitive Groups',
        temp: 29,
        weatherCondition: 'Haze'
      },
      {
        day: 'Sat',
        date: 'Nov 28',
        aqi: 140,
        maxAqi: 155,
        minAqi: 120,
        category: 'Unhealthy for Sensitive Groups',
        temp: 28,
        weatherCondition: 'Sunny'
      }
    ],
    healthAdvice: {
      mask: {
        required: true,
        type: 'Mask for Sensitive Groups',
        advice: 'Individuals with asthma or heart conditions should wear a mask outdoors.'
      },
      exercise: {
        allowed: true,
        advice: 'Light outdoor jogging permitted; avoid rush hours near industrial arterial roads.'
      },
      sensitiveGroups: {
        warning: true,
        advice: 'Children and seniors should reduce strenuous outdoor playground time.'
      },
      ventilation: {
        openWindows: true,
        advice: 'Open windows during afternoon sunny hours (13:00-16:00) when inversion clears.'
      }
    }
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    stateOrRegion: 'Gujarat',
    country: 'India',
    lat: 23.0225,
    lng: 72.5714,
    currentAqi: 228,
    category: 'Very Unhealthy',
    updatedAt: 'Just now',
    image: '/assets/images/city-ahmedabad.webp',
    weather: {
      temp: 26,
      humidity: 58,
      windSpeed: 6,
      condition: 'Dense Winter Smog'
    },
    pollutants: {
      pm25: {
        code: 'PM2.5',
        name: 'Fine Particulates',
        value: 178.0,
        unit: 'µg/m³',
        status: 'Hazardous',
        standardLimit: 15,
        explanation:
          'High concentration of winter combustion particulates and chemical zone emissions.'
      },
      pm10: {
        code: 'PM10',
        name: 'Coarse Dust',
        value: 265.0,
        unit: 'µg/m³',
        status: 'Hazardous',
        standardLimit: 45,
        explanation: 'Heavy soil dust and Ring Road vehicular turbulence.'
      },
      no2: {
        code: 'NO2',
        name: 'Nitrogen Dioxide',
        value: 52,
        unit: 'ppb',
        status: 'Unhealthy',
        standardLimit: 25,
        explanation: 'Diesel auto-rickshaws and interstate transit trucks.'
      },
      so2: {
        code: 'SO2',
        name: 'Sulfur Dioxide',
        value: 19,
        unit: 'ppb',
        status: 'Moderate',
        standardLimit: 20,
        explanation: 'Combustion exhaust from Vatva and Naroda chemical estates.'
      },
      co: {
        code: 'CO',
        name: 'Carbon Monoxide',
        value: 2.2,
        unit: 'ppm',
        status: 'Good',
        standardLimit: 4.0,
        explanation: 'Trapped urban street canyon exhaust under winter inversion.'
      },
      o3: {
        code: 'O3',
        name: 'Ground Ozone',
        value: 38,
        unit: 'ppb',
        status: 'Good',
        standardLimit: 50,
        explanation: 'Secondary ozone formation suppressed by dense particulate haze.'
      }
    },
    hourlyTrend: [
      { time: '00:00', aqi: 210, pm25: 162, temp: 20 },
      { time: '03:00', aqi: 198, pm25: 154, temp: 19 },
      { time: '06:00', aqi: 235, pm25: 185, temp: 19 },
      { time: '09:00', aqi: 252, pm25: 200, temp: 23 },
      { time: '12:00', aqi: 220, pm25: 170, temp: 28 },
      { time: '15:00', aqi: 205, pm25: 158, temp: 29 },
      { time: '18:00', aqi: 242, pm25: 192, temp: 25 },
      { time: '21:00', aqi: 228, pm25: 178, temp: 22 }
    ],
    dailyForecast: [
      {
        day: 'Sun',
        date: 'Nov 22',
        aqi: 228,
        maxAqi: 260,
        minAqi: 195,
        category: 'Very Unhealthy',
        temp: 26,
        weatherCondition: 'Dense Smog'
      },
      {
        day: 'Mon',
        date: 'Nov 23',
        aqi: 235,
        maxAqi: 270,
        minAqi: 200,
        category: 'Very Unhealthy',
        temp: 27,
        weatherCondition: 'Haze'
      },
      {
        day: 'Tue',
        date: 'Nov 24',
        aqi: 215,
        maxAqi: 245,
        minAqi: 185,
        category: 'Very Unhealthy',
        temp: 26,
        weatherCondition: 'Smog'
      },
      {
        day: 'Wed',
        date: 'Nov 25',
        aqi: 195,
        maxAqi: 225,
        minAqi: 165,
        category: 'Unhealthy',
        temp: 27,
        weatherCondition: 'Haze'
      },
      {
        day: 'Thu',
        date: 'Nov 26',
        aqi: 208,
        maxAqi: 240,
        minAqi: 175,
        category: 'Very Unhealthy',
        temp: 26,
        weatherCondition: 'Haze'
      },
      {
        day: 'Fri',
        date: 'Nov 27',
        aqi: 222,
        maxAqi: 255,
        minAqi: 190,
        category: 'Very Unhealthy',
        temp: 27,
        weatherCondition: 'Dense Smog'
      },
      {
        day: 'Sat',
        date: 'Nov 28',
        aqi: 218,
        maxAqi: 250,
        minAqi: 180,
        category: 'Very Unhealthy',
        temp: 26,
        weatherCondition: 'Smog'
      }
    ],
    healthAdvice: {
      mask: {
        required: true,
        type: 'Certified N95 Mask Mandatory',
        advice: 'High-filtration N95 respirator strongly required for any outdoor stay.'
      },
      exercise: {
        allowed: false,
        advice: 'Suspension of all outdoor workouts, cycling, and runs recommended.'
      },
      sensitiveGroups: {
        warning: true,
        advice: 'Seniors, heart patients, and young children should remain indoors with clean air.'
      },
      ventilation: {
        openWindows: false,
        advice: 'Keep doors and windows firmly sealed; run high-CADR air purifiers continuously.'
      }
    }
  }
];

/**
 * Standard fallback city (Delhi) used when network or geocoding fails.
 */
export const DEFAULT_FALLBACK_CITY: CityAirData = CITIES_DATABASE[0]!;
