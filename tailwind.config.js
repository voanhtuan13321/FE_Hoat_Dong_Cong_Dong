/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/tailwind-datepicker-react/dist/**/*.js',
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#4D90FE',
        footer: '#0850C7',
        'second-color': '#E9E9E9',
      },
      borderColor: {
        primary: '#4D90FE',
        normal: '#333333',
      },
      colors: {
        primary: '#003EFF',
        normal: '#333333',
        'red-text': '#FF0000',
      },
      fontSize: {
        main: '12px',
        big: '22px',
      },
      width: {
        '150px': '150px',
        '600px': '600px',
        '5%': '5%',
        '10%': '10%',
        '15%': '15%',
        '20%': '20%',
        '25%': '25%',
        '30%': '30%',
        '35%': '35%',
        '40%': '40%',
        '45%': '45%',
        '50%': '50%',
        '55%': '55%',
        '60%': '60%',
        '65%': '65%',
        '70%': '70%',
        '75%': '75%',
        '80%': '80%',
        '85%': '85%',
        '90%': '90%',
        '95%': '95%',
        '100%': '100%',
      },
      height: {
        '200px': '200px',
        '250px': '250px'
      },
    },
  },
  safelist: [{ pattern: /(bg|text|border)-(primary|second)/ }],
}
