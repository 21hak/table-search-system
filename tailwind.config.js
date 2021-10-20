module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    scale: {
      '-100': '-1',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
