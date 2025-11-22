/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-sidebar': '#0f172a', // Azul oscuro menú
        'dark-btn': '#1e1b4b',     // Botones oscuros
        'primary-blue': '#242055', // Azul seleccionado
      }
    },
  },
  plugins: [],
}