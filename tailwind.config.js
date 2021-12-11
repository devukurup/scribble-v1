module.exports = {
  important: true,
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        'link-inactive': '#9CA3AF',
      }
    },
  },
  variants: {
      backgroundColor: ['odd', 'even']
  },
  plugins: [],
}
