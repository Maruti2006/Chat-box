/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6d28d9',
          light: '#a78bfa',
          dark: '#4c1d95',
        },
        gradientStart: '#f0f5ff',
        gradientEnd: '#c1b2ff',
      },
      animation: {
        'gradient-mesh': 'gradientMesh 30s ease infinite',
        'pulse-orb': 'pulseOrb 2.5s ease-in-out infinite',
        'rotate-3d': 'rotate3d 30s linear infinite',
      },
      keyframes: {
        gradientMesh: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        pulseOrb: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.1)' }
        },
        rotate3d: {
          '0%': { transform: 'rotateX(0) rotateY(0) rotateZ(0)' },
          '100%': { transform: 'rotateX(360deg) rotateY(360deg) rotateZ(360deg)' }
        }
      }
    }
  },
  plugins: []
};
