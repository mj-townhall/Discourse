/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#007BFF',
        'custom-gray': {
          100: '#F8F9FA',
          500: '#6C757D',
          900: '#343A40',
        },
        'dark-blue' :'#011e29'
      },
    },
  },
  plugins: [],
}



