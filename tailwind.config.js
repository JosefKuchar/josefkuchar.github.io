module.exports = {
  purge: {
    enabled: true,
    content: ['./src/index.html'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'heading': ['"Roboto Slab"']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
