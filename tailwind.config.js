module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    boxShadow: {
      lg: '0 0px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      '2xl': '0 0px 50px -12px rgba(0, 0, 0, 0.25)',
    },
    extend: {},
  },
  variants: {
    extend: {
      borderWidth: ['dark'],
    },
  },
  plugins: [],
}
