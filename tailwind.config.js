/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          base: 'var(--color-bg-base)',
          surface: 'var(--color-bg-surface)',
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          border: 'var(--color-border)',
          placeholder: 'var(--color-placeholder)',
        },
        // User's Palette
        midnight: {
          deep: '#120b13',
          dark: '#211324',
          DEFAULT: '#331e36',
          light: '#4d2d52',
        },
        'midnight-violet': '#331e36',
        'indigo-velvet': {
          DEFAULT: '#41337a',
          light: '#534299',
          dark: '#2f245a',
        },
        'steel-blue': {
          DEFAULT: '#6ea4bf',
          light: '#8ebfd6',
          dark: '#4f849e',
        },
        'frozen-water': {
          DEFAULT: '#c2efeb',
          light: '#e1faf7',
          dark: '#9adcd6',
        },
        honeydew: {
          DEFAULT: '#ecfee8',
          light: '#f5fff3',
          dark: '#c8f5bf',
        },
        aqi: {
          good: '#52b788',
          moderate: '#f4a261',
          unhealthySensitive: '#e76f51',
          unhealthy: '#e63946',
          veryUnhealthy: '#9b5de5',
          hazardous: '#6a040f',
          apocalyptic: '#370617',
        }
      },
      backgroundImage: {
        'gradient-palette-0': 'linear-gradient(0deg, #331e36, #41337a, #6ea4bf, #c2efeb, #ecfee8)',
        'gradient-palette-90': 'linear-gradient(90deg, #331e36, #41337a, #6ea4bf, #c2efeb, #ecfee8)',
        'gradient-palette-135': 'linear-gradient(135deg, #331e36, #41337a, #6ea4bf, #c2efeb, #ecfee8)',
        'gradient-palette-180': 'linear-gradient(180deg, #331e36, #41337a, #6ea4bf, #c2efeb, #ecfee8)',
        'gradient-palette-225': 'linear-gradient(225deg, #331e36, #41337a, #6ea4bf, #c2efeb, #ecfee8)',
        'gradient-palette-radial': 'radial-gradient(circle at 50% 20%, #41337a 0%, #331e36 60%, #120b13 100%)',
        'cta-glow': 'linear-gradient(135deg, #6ea4bf 0%, #c2efeb 50%, #ecfee8 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(65, 51, 122, 0.4) 0%, rgba(51, 30, 54, 0.7) 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(110, 164, 191, 0.12) 0%, rgba(65, 51, 122, 0.25) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
