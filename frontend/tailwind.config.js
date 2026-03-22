/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#007bff',
        'brand-cyan': '#17c0eb',
        'brand-green': '#0be881',
      }
    },
  },
  plugins: [],
}

