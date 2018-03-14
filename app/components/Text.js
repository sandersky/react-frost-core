/**
 * @flow
 */

import {CodeBlock, Text, TEXT_ALIGN_RIGHT} from '../../src'
import route from '../factory'
import {css, names} from 'linaria'
import React, {type Element, type Node} from 'react'

type DOC_TYPE = {|
  examples: {[key: string]: Element<*>},
  title: string,
|}

const DOCS: Array<DOC_TYPE> = [
  {
    title: 'State',
    examples: {
      Disabled: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Text disabled={true} value="can't touch this" />
        </CodeBlock>
      ),
      Error: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Text error={true} />
        </CodeBlock>
      ),
      'Read only': (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Text readOnly={true} value="Jane Doe" />
        </CodeBlock>
      ),
    },
  },
  {
    title: 'Options',
    examples: {
      Align: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Text align={TEXT_ALIGN_RIGHT} />
        </CodeBlock>
      ),
      'Max length': (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Text maxLength={4} />
        </CodeBlock>
      ),
      'Min length': (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Text minLength={4} />
        </CodeBlock>
      ),
      Placeholder: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Text placeholder="Username" />
        </CodeBlock>
      ),
      Size: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Text size={5} />
        </CodeBlock>
      ),
      'Tab index': (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Text tabIndex={-1} />
        </CodeBlock>
      ),
      Value: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Text value="John Doe" />
        </CodeBlock>
      ),
    },
  },
]

const EXAMPLE_STYLE = css`
  margin: 0 10px;
  width: 300px;
`

const EXAMPLES_STYLE = css`
  display: flex;
  flex-wrap: wrap;
`

const IMPORTS_CODE = `
import {
  Text,
  TEXT_ALIGN_LEFT,
  TEXT_ALIGN_RIGHT,
} from 'react-frost-core'
`.trim()

const renderExamples = (examples: ?{[key: string]: Element<*>}): Node => {
  if (!examples) {
    return null
  }

  return Object.keys(examples).map((key: string, index: number): Node => {
    return (
      <div className={names(EXAMPLE_STYLE)} key={index}>
        <h4
          className={names(
            css`
              margin-top: 0;
            `,
          )}
        >
          {key}
        </h4>
        {/* $FlowFixMe - Flow thinks examples could be null/undefined */}
        {examples[key]}
      </div>
    )
  })
}

export default route('Text', (): Node => {
  return (
    <div>
      <section>
        <CodeBlock code={IMPORTS_CODE} demo={false} language="js" />
      </section>
      <section>
        <h3>Default</h3>
        <div className={names(EXAMPLES_STYLE)}>
          <div className={names(EXAMPLE_STYLE)}>
            <CodeBlock language="jsx" maxLineLength={30}>
              <Text />
            </CodeBlock>
          </div>
        </div>
      </section>
      {DOCS.map(({examples, title}: DOC_TYPE, index: number): Node => {
        return (
          <section key={index}>
            <h3>{title}</h3>
            <div className={names(EXAMPLES_STYLE)}>
              {renderExamples(examples)}
            </div>
          </section>
        )
      })}
    </div>
  )
})
