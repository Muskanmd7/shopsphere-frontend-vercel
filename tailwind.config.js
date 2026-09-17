/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary lavender/lilac palette
        primary: {
          50: '#faf7ff',
          100: '#f3eeff',
          200: '#e9deff',
          300: '#d4bfff',
          400: '#b896ff',
          500: '#9b6dff',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        // Blush pink
        blush: {
          50: '#fff5f7',
          100: '#ffe4eb',
          200: '#ffc2d1',
          300: '#ff8fab',
          400: '#ff6b91',
          500: '#e05c7c',
          600: '#c2436a',
        },
        // Sage green
        sage: {
          50: '#f4f7f4',
          100: '#e8f0e8',
          200: '#d1e2d1',
          300: '#a8c9a8',
          400: '#7aad7a',
          500: '#5a9060',
          600: '#3d7344',
        },
        // Warm cream / beige
        cream: {
          50: '#fffef9',
          100: '#fef9ed',
          200: '#fdf0d0',
          300: '#fae2a8',
          400: '#f5cc72',
          500: '#ebb84a',
        },
        surface: {
          50: '#fdfbf9',
          100: '#f9f5f0',
          200: '#f0e9e0',
          300: '#e5d8cc',
          800: '#3d2b1f',
          900: '#1a1209',
        },
        accent: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(155,109,255,0.08), 0 8px 24px rgba(0,0,0,0.06)',
        'card': '0 1px 4px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 30px rgba(155,109,255,0.15), 0 20px 60px rgba(0,0,0,0.10)',
        'glow': '0 0 40px rgba(155,109,255,0.3)',
        'glow-blush': '0 0 30px rgba(224,92,124,0.2)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      }
    },
  },
  plugins: [],
}
