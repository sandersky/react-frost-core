const {readFileSync} = require('fs')
const {join} = require('path')
const {parse} = require('postcss')

/**
 * This is the name of the variable in the demo typography component that should
 * contain a list of all of the font sizes.
 * @type {String}
 */
const FONT_SIZES_VAR_NAME = 'SIZES'

/**
 * This is the path to the typography component in the demo app
 * @type {String}
 */
const TYPOGRAPHY_APP_COMPONENT_PATH = join(
  __dirname,
  '..',
  'app',
  'routes',
  'Typography.js'
)

/**
 * This is the path to the typography styles in the source
 * @type {String}
 */
const TYPOGRAPHY_CSS_PATH = join(
  __dirname,
  '..',
  'src',
  'styles',
  'typography.css'
)

module.exports = ({types: t, template}) => {
  const css = readFileSync(TYPOGRAPHY_CSS_PATH, 'utf8')
  const fontSizes = []

  parse(css).walkDecls(/^--frost-font-size-/, ({prop, value}) => {
    fontSizes.push({
      key: prop.replace('--frost-font-size-', ''),
      value: parseInt(value),
    })
  })

  fontSizes.sort((a, b) => b.value - a.value)

  return {
    visitor: {
      VariableDeclarator(path, state) {
        const {node} = path
        const {id, init} = node
        const {name} = id
        const {filename} = state.file.opts

        // If this is the "SIZES" variable in the typography app component then
        // auto-populate this array with all of the font sizes. This ensures
        // that our demo app always documents ALL of the font sizes available.
        if (
          filename === TYPOGRAPHY_APP_COMPONENT_PATH &&
          name === FONT_SIZES_VAR_NAME
        ) {
          const {elements} = init

          fontSizes.forEach(({key}) => {
            elements.push(
              t.stringLiteral(key)
            )
          })
        }
      }
    },
  }
}
