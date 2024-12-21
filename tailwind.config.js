/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBackground: "#161718",
        green: "#243325",
        lightGreen: "#93a742",
        light: "#f6f6f6",
        modalBg: "#292b27",
        customGray: "#3f413d",
      },
    },
  },
  plugins: [],
};
