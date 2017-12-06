const {readdirSync} = require('fs')
const {join} = require('path')

/**
 * This is the path to the icons component in the demo app
 * @type {String}
 */
const ICON_APP_COMPONENT_PATH = join(__dirname, '..', 'app', 'routes', 'Icons.js')

/**
 * This is the path to the source directory that contains all of the icon SVG's
 * @type {String}
 */
const ICONS_DIR = join(__dirname, '..', 'src', 'svgs')

/**
 * This is the name of the variable in the demo icons component that should
 * contain a list of all of the icon names.
 * @type {String}
 */
const ICONS_VAR_NAME = 'ICONS'

module.exports = ({types: t, template}) => {
  const iconNames = readdirSync(ICONS_DIR)
    .map(file => file.replace(/\.svg$/, ''))

  return {
    visitor: {
      VariableDeclarator(path, state) {
        const {node} = path
        const {id, init} = node
        const {name} = id
        const {filename} = state.file.opts

        // If this is the "ICONS" variable in the demo app component then
        // auto-populate this array with all of the icons. This ensures that
        // our demo app always documents ALL of the icons available.
        if (filename === ICON_APP_COMPONENT_PATH && name === ICONS_VAR_NAME) {
          const {elements} = init

          iconNames.forEach(iconName => {
            elements.push(
              t.stringLiteral(iconName)
            )
          })
        }
      }
    },
  }
}
