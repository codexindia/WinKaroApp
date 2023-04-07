/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors : {
      lightBg: "#f0f0f0",
      inputBorder: "#E0E0E0",
      red : "#FF0000",
      white : "#FFFFFF",
    },
    extend: {},
  },
  plugins: [],
}

