/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          900: '#0f0c29', // Deepest background
          800: '#302b63', // Secondary deep
          700: '#24243e', // Card background base
          500: '#6b2cf5', // Primary Purple
          300: '#b983ff', // Lighter Purple
          100: '#e0c3fc', // Pale highlight
        },
        neon: {
          blue: '#00f2ff', // Cyan Glow
          purple: '#bd00ff', // Purple Glow
        },
        glass: {
          dark: 'rgba(15, 12, 41, 0.7)',
          light: 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(255, 255, 255, 0.15)',
        }
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
        'btn-gradient': 'linear-gradient(90deg, #6b2cf5 0%, #bd00ff 100%)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px', // Standard for cards
        '3xl': '32px', // Standard for containers/modals
        'full': '9999px',
      },
      boxShadow: {
        'neon-blue': '0 0 10px rgba(0, 242, 255, 0.5), 0 0 20px rgba(0, 242, 255, 0.3)',
        'neon-purple': '0 0 10px rgba(189, 0, 255, 0.5), 0 0 20px rgba(189, 0, 255, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'], // For headings
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
