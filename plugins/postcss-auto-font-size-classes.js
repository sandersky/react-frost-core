const {join} = require('path')
const postcss = require('postcss')

const TYPOGRPAHY_CSS_FILE = join(
  __dirname,
  '..',
  'src',
  'styles',
  'typography.css'
)

module.exports = postcss.plugin('auto-font-size-classes', () => {
  return (css) => {
    css.walkDecls(/^--frost-font-size-/, decl => {
      const {prop, source} = decl
      const {input} = source
      const {file} = input

      if (file === TYPOGRPAHY_CSS_FILE) {
        decl.parent.after(`
          .${prop.replace('--', '')} {
            font-size: var(${prop});
          }
        `)
      }
    })
  }
})
