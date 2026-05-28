/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ocean-blue': '#4CC9F0',
        'deep-sea': '#0B3C5D',
        'sandy-gold': '#F4C95D',
        'coral-orange': '#FF8C42',
        'palm-green': '#2E8B57',
        'sunset-red': '#E63946',
        'treasure-brown': '#8B5E3C',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'wave-slow': 'wave 12s ease-in-out infinite',
        'compass-spin': 'compass-spin 40s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0px) scaleY(1)' },
          '50%': { transform: 'translateX(-15px) scaleY(1.03)' },
        },
        'compass-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 15px rgba(244, 201, 93, 0.4)',
            filter: 'brightness(1)'
          },
          '50%': { 
            boxShadow: '0 0 25px rgba(244, 201, 93, 0.8)',
            filter: 'brightness(1.1)'
          },
        }
      }
    },
  },
  plugins: [],
}
