/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    screens: {
      phone: { max: "639px" },
      tablet: { min: "640px", max: "1023px" },
      laptop: { min: "1024px", max: "1279px" },
      desktop: { min: "1280px", max: "1535px" },
      wide: { min: "1536px" },
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: "#444cef",
        error: "#ee4658",
        success: "#21cc6d",
        warning: "#ffb744",
      },
      boxShadow: {
        bottom: "0 4px 2px -2px gray",
      },
    },
  },
  plugins: [],
};
// screens: {
// xs: { min: "0", max: "639px" },
// sm: { min: "640px", max: "767px" },
// // => @media (min-width: 640px and max-width: 767px) { ... }

// md: { min: "768px", max: "1023px" },
// // => @media (min-width: 768px and max-width: 1023px) { ... }

// lg: { min: "1024px", max: "1279px" },
// // => @media (min-width: 1024px and max-width: 1279px) { ... }

// xl: { min: "1280px", max: "1535px" },
// // => @media (min-width: 1280px and max-width: 1535px) { ... }

// "2xl": { min: "1536px" },
// },
// phone: { max: "639px" },
//         tablet: { min: "640px", max: "1023px" },
//         laptop: { min: "1024px", max: "1279px" },
//         desktop: { min: "1280px", max: "1535px" },
//         wide: { min: "1536px" },
