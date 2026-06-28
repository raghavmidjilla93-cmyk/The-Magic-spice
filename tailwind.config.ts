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
        gold: {
          50:  '#fefdf4',
          100: '#fdf9e3',
          200: '#faf0b8',
          300: '#f5e07d',
          400: '#eeca3f',
          500: '#D4AF37',
          600: '#c49a1e',
          700: '#a07918',
          800: '#845f1a',
          900: '#704f1a',
          950: '#3f2a09',
        },
        champagne: '#F7E7CE',
        ivory: '#FFFFF0',
        charcoal: '#1C1C1E',
        obsidian: '#0A0A0A',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F7E7CE 50%, #D4AF37 100%)',
        'dark-gradient': 'linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.8) 60%, #0A0A0A 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'hero-gradient': 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.95) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'slide-right': 'slideRight 0.8s ease forwards',
        'particle': 'particle 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212,175,55,0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(212,175,55,0.7)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        particle: {
          '0%': { transform: 'translateY(100vh) translateX(0)' },
          '100%': { transform: 'translateY(-100px) translateX(200px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'gold': '0 0 30px rgba(212,175,55,0.4)',
        'gold-lg': '0 0 60px rgba(212,175,55,0.3)',
        'luxury': '0 25px 50px rgba(0,0,0,0.7)',
        'glass': '0 8px 32px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
}

export default config
