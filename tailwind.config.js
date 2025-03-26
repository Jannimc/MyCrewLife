/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      scale: {
        '102': '1.02',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'blob': 'blob 7s infinite',
      },
      transitionDelay: {
        '2000': '2000ms',
        '4000': '4000ms',
      },
    },
  },
  plugins: [],
}