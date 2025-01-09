import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF69B4', // Ana pembe
          light: '#FFB6C1', // Açık pembe
        },
        secondary: {
          DEFAULT: '#98FB98', // Açık yeşil
          dark: '#90EE90', // Koyu açık yeşil
        },
        accent: {
          DEFAULT: '#DDA0DD', // Mor
          light: '#E6E6FA', // Lavanta
        },
        background: '#FFF5F7', // Çok açık pembe arka plan
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'],
      },
      keyframes: {
        wave: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' }
        }
      },
      animation: {
        'wave': 'wave 2s infinite linear'
      }
    },
  },
  plugins: [],
}

export default config
