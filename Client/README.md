# React + Vite

Install Tailwind CSS
Install tailwindcss and its peer dependencies, then generate your tailwind.config.js and postcss.config.js files.
1...npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


Configure your template paths
Add the paths to all of your template files in your tailwind.config.js file.
2.....
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

Add the Tailwind directives to your CSS
Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file.
3....
@tailwind base;
@tailwind components;
@tailwind utilities;

Run your build process with npm run dev.
4....
npm run dev

### Adding plugins and dependencies
....
npm i @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp
....
### Adding auto simple import  eslint
npm i eslint-plugin-simple-import-sorts