const {readdirSync, readFileSync} = require('fs')
const {join} = require('path')

/**
 * Get default import specifier from import declaration
 * @param {Object} t - babel types
 * @param {Object} path - import declaration path
 * @returns {Object} default specifier
 */
function getDefaultSpecifierFromImportDeclaration(t, path) {
  return path
    .node
    .specifiers
    .find(specifier => t.isImportDefaultSpecifier(specifier))
}

/**
 * Determine if import declaration is import of grammatic package
 * @param {Object} t - babel types
 * @param {Object} path - import declaration path
 * @returns {Boolean} whether or not import declaration is for grammatic
 */
function isGrammaticImportDeclaration(t, path) {
  const {node} = path
  const {source} = node
  return t.isStringLiteral(source) && source.value === 'grammatic'
}

/**
 * Load existing translations from files.
 * @param {Object} options - plugin options
 * @returns {Object} translations
 */
function loadExistingTranslations(options) {
  const {translationsDirectory} = options

  if (translationsDirectory) {
    return readdirSync(translationsDirectory).reduce(
      (translations, fileName) => {
        const filePath = join(translationsDirectory, fileName)
        const data = readFileSync(filePath, 'utf8')

        return Object.assign(translations, {
          [fileName]: JSON.parse(data),
        })
      },
      {}
    )
  }

  return {}
}

/**
 * Get error for when translate function is called without description argument
 * @param {Object} loc - location of translate function call expression
 * @param {Object} state - call expression state
 * @returns {Error} missing description argument error
 */
function missingDescriptionArgument(loc, state) {
  const {start} = loc
  const {column, line} = start
  const {filename} = state

  return new Error(
    `Grammatic translate function requires a 2nd argument containing a description of what the translation is for. (${filename}:${line}:${column})`
  )
}

function processTranslation(path, text, description, translations) {
  // TODO: determine if a translation exists before dumping raw string
  // TODO: if translation doesn't exist add it
  path.replaceWith(text)
}

/**
 * Get error for when translate function is called with too many arguments
 * @param {Object} loc - location of translate function call expression
 * @param {Object} state - call expression state
 * @returns {Error} too many arguments error
 */
function tooManyArguments(loc, state) {
  const {start} = loc
  const {column, line} = start
  const {filename} = state

  return new Error(
    `Grammatic translate function expects exactly two arguments. (${filename}:${line}:${column})`
  )
}

module.exports = ({types: t, template}, options) => {
  const translations = loadExistingTranslations(options)

  let translateFunctionName = null

  // TODO: write translations to disk when build is complete

  return {
    visitor: {
      CallExpression(path, state) {
        const {node} = path
        const {arguments, callee, loc} = node

        // If this is a call to the translation function then we can replace the
        // function call with a string literal of the appropriate translation.
        if (callee.name === translateFunctionName) {
          switch (arguments.length) {
            case 1:
              throw missingDescriptionArgument(loc, state)

            case 2:
              processTranslation(path, arguments[0], arguments[1], translations)
              break

            default:
              throw tooManyArguments(loc, state)
          }
        }
      },

      ImportDeclaration(path) {
        const {node} = path

        if (isGrammaticImportDeclaration(t, path)) {
          const defaultSpecifier =
            getDefaultSpecifierFromImportDeclaration(t, path)

          // make note of what the default import variable name is so we can
          // properly compile translations throughout each module.
          if (defaultSpecifier) {
            translateFunctionName = defaultSpecifier.local.name
          }

          path.remove()
        }
      }
    },
  }
}
