/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#4D90FE',
        'primary-hover': '#0850C7',
        'second-color': '#E9E9E9',
      },
      borderColor: {
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
      },
      height: {
        '200px': '200px',
      },
    },
  },
  safelist: [{ pattern: /(bg|text|border)-(primary|second)/ }],
}
