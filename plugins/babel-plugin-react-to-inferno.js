/**
 * Determine if import specifier is import of react Component
 * @param {Object} t - babel types
 * @param {Object} specifier - import specifier
 * @returns {Boolean} whether or not import specifier is for react Component
 */
function isReactComponentSepcifier(t, specifier) {
  return (
    specifier && specifier.imported && specifier.imported.name === 'Component'
  )
}

/**
 * Determine if import declaration is import of react-dom package
 * @param {Object} t - babel types
 * @param {Object} path - import declaration path
 * @returns {Boolean} whether or not import declaration is for react-dom
 */
function isReactDOMImportDeclaration(t, path) {
  const {node} = path
  const {source} = node
  return t.isStringLiteral(source) && source.value === 'react-dom'
}

/**
 * Determine if import specifier is import of react-dom render
 * @param {Object} t - babel types
 * @param {Object} specifier - import specifier
 * @returns {Boolean} whether or not import specifier is for react-dom render
 */
function isReactDOMRenderSepcifier(t, specifier) {
  return specifier && specifier.imported && specifier.imported.name === 'render'
}

/**
 * Determine if import declaration is import of react package
 * @param {Object} t - babel types
 * @param {Object} path - import declaration path
 * @returns {Boolean} whether or not import declaration is for react
 */
function isReactImportDeclaration(t, path) {
  const {node} = path
  const {source} = node
  return t.isStringLiteral(source) && source.value === 'react'
}

// TODO: handle using ReactDOM.render and React.Component when using both
// default import as well as asterisk import.
// TODO: handle case where inferno/inferno-component are already imported, both
// re-using same name as well as a different name.
module.exports = ({types: t, template}) => {
  let needsInfernoComponentImport = false
  let needsInfernoImport = false

  return {
    visitor: {
      ImportDeclaration(path) {
        const {node} = path
        const removeIndices = []

        let needsRemoved = false

        if (isReactDOMImportDeclaration(t, path)) {
          needsInfernoImport = true
          needsRemoved = true
        } else if (isReactImportDeclaration(t, path)) {
          needsInfernoImport = true

          node.specifiers.forEach((specifier, index) => {
            if (isReactComponentSepcifier(t, specifier)) {
              needsInfernoComponentImport = true
            }
          })

          needsRemoved = true
        }

        if (needsRemoved) {
          const index = path.parent.body.indexOf(node)
          path.parent.body.splice(index, 1)
        }
      },
      Program: {
        exit(path) {
          const {node} = path

          if (needsInfernoComponentImport) {
            node.body.unshift(
              t.ImportDeclaration(
                [t.importDefaultSpecifier(t.identifier('Component'))],
                t.stringLiteral('inferno-component'),
              ),
            )
          }

          if (needsInfernoImport) {
            const renderIdentifier = t.identifier('render')
            const vNodeIdentifier = t.identifier('createVNode')

            node.body.unshift(
              t.ImportDeclaration([
                t.importDefaultSpecifier(t.identifier('Inferno')),
                t.importSpecifier(vNodeIdentifier, vNodeIdentifier),
                t.importSpecifier(renderIdentifier, renderIdentifier),
              ], t.stringLiteral('inferno')),
            )
          }
        },
      },
    },
  }
}
