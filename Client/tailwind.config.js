/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        'slide':{
          '0%':{ transform:'translate(0px)'},
          '33.33%':{transform:'translate(-20px)'},
          '66.66%':{transform:'translate(-40px)'},
          '100':{transform:'translate(0px)'}


        },
      },
    },
  },
  plugins: [],
}

