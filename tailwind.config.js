/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xxs': '425px',
      'md': '768px',
      'lg': '1024px',
    },
    extend: {},
  },
  darkMode: 'class',
  plugins: [],
}

