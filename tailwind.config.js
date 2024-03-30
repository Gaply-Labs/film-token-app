import { nextui } from '@nextui-org/react';
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        loginPattern: "url('/images/auth/image 1.png')",
      },
      colors: {
        main: '#0F172A',
        secondary: '#F57C1F',
        gray: '#8391A6',
        border: '#475569',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'nextui',
      addCommonColors: false,
      defaultTheme: 'dark',
      defaultExtendTheme: 'dark',
    }),
  ],
};
