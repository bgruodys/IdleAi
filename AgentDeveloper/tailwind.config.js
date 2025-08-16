/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warhammer 40k Theme Colors
        'imperial-gold': '#DAA520',
        'deep-red': '#8B0000',
        'steel-gray': '#2F4F4F',
        'void-black': '#0A0A0A',
        'charcoal': '#1C1C1C',
        'iron-gray': '#3C3C3C',
        'warning-amber': '#FF8C00',
        'success-green': '#228B22',
        'danger-crimson': '#DC143C',
        'info-blue': '#4682B4',
      },
      fontFamily: {
        'heading': ['Orbitron', 'monospace'],
        'body': ['Exo 2', 'sans-serif'],
      },
      animation: {
        'pulse-warning': 'pulse-warning 2s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
      },
      keyframes: {
        'pulse-warning': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'slide-in-right': {
          'from': { transform: 'translateX(100%)' },
          'to': { transform: 'translateX(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
