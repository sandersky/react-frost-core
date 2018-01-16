const {join} = require('path')
const postcss = require('postcss')

const COLORS_CSS_FILE = join(__dirname, '..', 'src', 'styles', 'colors.css')

module.exports = postcss.plugin('auto-bg-color-classes', () => {
  return css => {
    css.walkDecls(/^--frost-color-/, decl => {
      const {prop, source} = decl
      const {input} = source
      const {file} = input

      if (file === COLORS_CSS_FILE) {
        decl.parent.after(`
          .frost-bg-${prop.replace('--frost-color-', '')} {
            background-color: var(${prop});
          }
        `)
      }
    })
  }
})
