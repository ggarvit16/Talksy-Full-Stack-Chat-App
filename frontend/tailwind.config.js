// tailwind.config.js (ESM version)
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light","dark", "cupcake", "sunset", "retro"]
  }
};

export default config;
