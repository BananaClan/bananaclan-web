/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'custom-40': ['40px', {
          lineHeight: '46px',
          fontWeight: '400',
        }],
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        futura: ['Futura', 'sans-serif'],
        futurac: ['FuturaC', 'sans-serif'],
        bebasNeue:['BebasNeue','sans-serif'],
        helvetica:['Helvetica','sans-serif']
      },
      colors: {
        'TopBar-blue': '#322FEE',
      },
      borderRadius: {
        '4xl': '32px',
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out 3s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}

