/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          pink: '#FF00FF',
          orange: '#FF6B00',
        },
        background: '#F5F5F5',
        text: '#1A1A1A',
        accent: '#8B5CF6',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF00FF 0%, #FF6B00 100%)',
      },
    },
  },
  plugins: [],
}