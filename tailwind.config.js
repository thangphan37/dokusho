module.exports = {
  mode: 'jit',
  purge: ['components/**/*.{ts,tsx}', 'pages/**/*.{ts,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui', 'Helvetica', 'Arial', 'sans-serif'],
      emphasize: ['Sriracha'],
    },
    boxShadow: {
      lg: '0 0px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      '2xl': '0 0px 50px -12px rgba(0, 0, 0, 0.25)',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
