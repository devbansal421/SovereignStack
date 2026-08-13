/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#07090E',
          900: '#0D111A',
          850: '#131824',
          800: '#1B2232',
          750: '#222B3F',
          700: '#2A3650',
          600: '#3B4B6E'
        },
        tactical: {
          amber: '#F59E0B',
          amberDim: 'rgba(245, 158, 11, 0.12)',
          emerald: '#10B981',
          emeraldDim: 'rgba(16, 185, 129, 0.12)',
          crimson: '#EF4444',
          crimsonDim: 'rgba(239, 68, 68, 0.12)',
          cyan: '#06B6D4',
          cyanDim: 'rgba(6, 182, 212, 0.12)'
        }
      },
      fontFamily: {
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Geist Mono"', 'monospace'],
        sans: ['"Space Grotesk"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
