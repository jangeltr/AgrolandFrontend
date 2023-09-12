/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{html,js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home': "url('/Fondo1.png')",
      }
    },
  },
  plugins: [],
}

