/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discord: {
          50: "#F2F3F5",
          100: "#E5E7EB",
          200: "#C7CBD4",
          300: "#A8ADB9",
          400: "#878E9F",
          500: "#676E86",
          600: "#565C77",
          700: "#454A67",
          800: "#343755",
          900: "#21222C",
        },
      },
      fontFamily: {
        marker: ["Permanent Marker", "cursive"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
