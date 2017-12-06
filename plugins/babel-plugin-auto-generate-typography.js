const {readFileSync} = require('fs')
const {parse} = require('gonzales-pe')
const {join} = require('path')

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
const TYPOGRAPHY_SCSS_PATH = join(
  __dirname,
  '..',
  'src',
  'styles',
  '_typography.scss'
)

function getFontSizesFromSassAST(ast) {
  return ast
    .content
    .filter(node => node.type === 'declaration')
    .map(declaration => {
      const name = getVariableNameFromDeclaration(declaration)

      if (name.indexOf('frost-font') === -1) {
        return null
      }

      const value = getVariableValueFromDeclaration(declaration)

      return isNaN(value) || value === null ? null : {name, value}
    })
    .filter(item => item !== null)
    .sort((a, b) => b.value - a.value)
    .map(item => item.name.replace('frost-font-', ''))
}

function getVariableNameFromDeclaration(declaration) {
  return declaration
    .content
    .find(node => node.type === 'property')
    .content
    .find(node => node.type === 'variable')
    .content
    .find(node => node.type === 'ident')
    .content
}

function getVariableValueFromDeclaration(declaration) {
  const value = declaration.content.find(node => node.type === 'value').content
  const dimension = value.find(node => node.type === 'dimension')

  return dimension
    ? dimension.content.find(node => node.type === 'number').content
    : null
}

module.exports = ({types: t, template}) => {
  const sassCode = readFileSync(TYPOGRAPHY_SCSS_PATH, 'utf8')
  const sassAST = parse(sassCode, {syntax: 'scss'})
  const fontSizes = getFontSizesFromSassAST(sassAST)

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

          fontSizes.forEach(fontSize => {
            elements.push(
              t.stringLiteral(fontSize)
            )
          })
        }
      }
    },
  }
}
