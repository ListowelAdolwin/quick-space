/** @type {import('tailwindcss').Config} */

//const preline = require('preline/plugin')
import preline from "preline/plugin"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
      },
    },
  },
  plugins: [
    preline
  ],
}