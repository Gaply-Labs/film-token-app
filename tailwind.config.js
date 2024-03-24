
import {nextui} from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors : {
        main : "#0F172A",
        secondary : "#F57C1F",
        gray : "#8391A6"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    prefix : "nextui",
    addCommonColors: false,
    defaultTheme : "dark",
    defaultExtendTheme : "dark",
    
  })],
};
