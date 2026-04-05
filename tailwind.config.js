/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        curtain: {
          dark: '#6B0F0F',
          DEFAULT: '#8B1A1A',
          light: '#A52A2A',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E8D48B',
        },
        cream: '#FAF6F0',
        'text-primary': '#4A1A1A',
        'text-secondary': '#8B7355',
        ivory: '#FFFDF9',
      },
      fontFamily: {
        weddingNames : ['Cormorant Garamond', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        'script-ar': ['"Aref Ruqaa"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        arabic: ['"Noto Naskh Arabic"', 'serif'],
      },
      screens: {
        sm: '375px',
        md: '768px',
        lg: '1024px',
      },
    },
  },
  plugins: [],
}
