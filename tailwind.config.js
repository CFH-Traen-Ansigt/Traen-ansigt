/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#901a36",
      secondary: "#749e2e",
      "main-color": "#f9f7f4",
      "alt-color": "#eaeaea",
      "font-color": "#141414",
    },
    extend: {
      fontFamily: {
        manjari: ["Manjari", "serif"],
        marmelad: ["Marmelad", "serif"],
      },
    },
  },
  plugins: [],
};
