/**
 * @flow
 */

import {CodeBlock, Text, TEXT_ALIGN_RIGHT} from '../../src'
import route from './factory'
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
      Autofocus: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Text autoFocus={true} />
        </CodeBlock>
      ),
      Placeholder: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Text placeholder="Username" />
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
      <div className="text-field-example" key={index}>
        <h4>{key}</h4>
        {/* $FlowFixMe - Flow thinks examples could be null/undefined */}
        {examples[key]}
      </div>
    )
  })
}

export default route('Text field', (): Node => {
  return [
    <section key="imports">
      <CodeBlock code={IMPORTS_CODE} demo={false} language="js" />
    </section>,
    <section key="default">
      <h3>Default</h3>
      <div className="text-field-examples">
        <div className="text-field-example">
          <CodeBlock language="jsx" maxLineLength={30}>
            <Text />
          </CodeBlock>
        </div>
      </div>
    </section>,
  ].concat(
    DOCS.map(({examples, title}: DOC_TYPE, index: number): Node => {
      return (
        <section key={index}>
          <h3>{title}</h3>
          <div className="text-field-examples">{renderExamples(examples)}</div>
        </section>
      )
    }),
  )
})
