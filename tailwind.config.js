/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["public/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        'bounce': 'bounce 1s infinite',
        'bounce-slow': 'bounce 1.5s infinite',
        'bounce-medium': 'bounce 1s infinite',
        'bounce-fast': 'bounce 0.5s infinite',
      },
    },
  },
  plugins: [
    // ...
    require('tailwindcss'),
    require('autoprefixer'),
    // ...
  ],
}

