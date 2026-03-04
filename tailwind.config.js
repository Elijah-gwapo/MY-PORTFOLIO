/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#2563EB',
        secondary: '#818CF8',
        accent: '#F472B6',
        'bg-color': '#030308',
        'card-bg': '#0A0F1C',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["dark"],
  },
}