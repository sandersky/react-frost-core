module.exports = {
  plugins: [
    require('postcss-import')(),
    require('./plugins/postcss-auto-bg-color-classes')(),
    require('./plugins/postcss-auto-font-size-classes')(),
    require('postcss-for')(),
    require('postcss-cssnext')({
      browsers: [
        'last 2 versions',
        '> 5%',
      ],
    }),
  ],
}
