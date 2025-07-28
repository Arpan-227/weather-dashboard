/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Optional: Custom colors
        sky: {
          light: '#e0f7fa',
          DEFAULT: '#00bcd4',
          dark: '#006064',
        },
      },
    },
  },
  plugins: [],
};
