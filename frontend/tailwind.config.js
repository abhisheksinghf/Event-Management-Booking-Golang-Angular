/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#8b5cf6', // Purple gradient
        background: '#181818', // Dark theme background
      },
    },
  },
  plugins: [],
};
