import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: '#FF69B4',
  				light: '#FFB6C1'
  			},
  			secondary: {
  				DEFAULT: '#98FB98',
  				dark: '#90EE90'
  			},
  			accent: {
  				DEFAULT: '#DDA0DD',
  				light: '#E6E6FA'
  			},
  			background: '#FFF5F7'
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-inter)'
  			],
  			serif: [
  				'var(--font-playfair)'
  			]
  		},
  		keyframes: {
  			wave: {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'100%': {
  					transform: 'translateX(200%)'
  				}
  			}
  		},
  		animation: {
  			wave: 'wave 2s infinite linear'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
