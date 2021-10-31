module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundSize: {
      16: "4rem",
    },
    extend: {
      backgroundImage: {
        close: "url('/close.png')",
      },
    },
    scale: {
      "-100": "-1",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
