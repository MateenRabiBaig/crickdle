/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#1D9E75',
        brandDark: '#0F6E56',
        brandLight: '#9FE1CB',
        warn: '#854F0B',
        warnLight: '#FAC775',
        danger: '#E24B4A',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Teko', 'sans-serif'],
      }
    },
  },
  plugins: [],
}