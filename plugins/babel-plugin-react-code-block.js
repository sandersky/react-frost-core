const prettier = require('prettier')

module.exports = ({types: t, template}) => {
  return {
    visitor: {
      JSXElement(path, stats) {
        const {children, closingElement, openingElement} = path.node
        const {name} = openingElement.name

        if (name === 'CodeBlock') {
          if (children.length) {
            const {start} = children[0]
            const {end} = children[children.length - 1]
            const code = stats.file.code.slice(start, end)
            const lines = prettier.format(`<div>${code}</div>`).split('\n')

            // Remove wrapping div that we added to keep prettier from breaking
            lines.pop() // Remove empty newline
            lines.pop() // Remove </div>
            lines.shift() // Remove <div>

            // Trim two spaces from each line so everything is at the correct
            // indentation. The join is an escaped newline character so newlines
            // end up in the final DOM.
            const finalCode = lines.map(line => line.substr(2)).join('\\n')

            openingElement.attributes.push(
              t.jSXAttribute(
                t.jSXIdentifier('code'),
                t.stringLiteral(finalCode)
              )
            )
          }
        }
      }
    },
  }
}
