/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '96': '24rem',
      },
      colors: {
        primary: '#1E1E1E',
        secondary: '#5D84F9',
      },
    },
  },
  plugins: [],
}
