/** @type {import('tailwindcss').Config} */
// TailwindCSS configuration for Muraasala landing page.
// Exported as an ES module because the project uses ESM.

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#046C70',
          light: '#0699a1',
          dark: '#03474a'
        },
        accent: {
          DEFAULT: '#F7B02F',
          light: '#FFD580',
          dark: '#A3781E'
        }
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards'
      }
    }
  },
  plugins: []
};