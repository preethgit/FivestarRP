/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#003366',
        'vibrant-red': '#D32F2F',
        'gold': '#FFC107',
      },
    },
  },
  plugins: [],
}