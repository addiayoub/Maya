/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
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
