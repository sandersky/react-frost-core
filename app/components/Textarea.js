/**
 * @flow
 */

import {CodeBlock, Textarea, TEXTAREA_ALIGN_RIGHT} from '../../src'
import route from '../factory'
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
          <Textarea disabled={true} value="can't touch this" />
        </CodeBlock>
      ),
      Error: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Textarea error={true} />
        </CodeBlock>
      ),
      'Read only': (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Textarea
            readOnly={true}
            value="The quick brown fox jumps over the lazy dog"
          />
        </CodeBlock>
      ),
    },
  },
  {
    title: 'Options',
    examples: {
      Align: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Textarea align={TEXTAREA_ALIGN_RIGHT} />
        </CodeBlock>
      ),
      Autofocus: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Textarea autoFocus={true} />
        </CodeBlock>
      ),
      Columns: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Textarea cols={2} />
        </CodeBlock>
      ),
      Placeholder: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Textarea placeholder="Username" />
        </CodeBlock>
      ),
      Rows: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Textarea rows={3} />
        </CodeBlock>
      ),
      'Tab index': (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Textarea tabIndex={-1} />
        </CodeBlock>
      ),
      Value: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Textarea value="John Doe" />
        </CodeBlock>
      ),
    },
  },
]

const IMPORTS_CODE = `
import {
  Textarea,
  TEXTAREA_ALIGN_LEFT,
  TEXTAREA_ALIGN_RIGHT,
} from 'react-frost-core'
`.trim()

const renderExamples = (examples: ?{[key: string]: Element<*>}): Node => {
  if (!examples) {
    return null
  }

  return Object.keys(examples).map((key: string, index: number): Node => {
    return (
      <div className="textarea-example" key={index}>
        <h4>{key}</h4>
        {/* $FlowFixMe - Flow thinks examples could be null/undefined */}
        {examples[key]}
      </div>
    )
  })
}

export default route('Textarea', (): Node => {
  return [
    <section key="imports">
      <CodeBlock code={IMPORTS_CODE} demo={false} language="js" />
    </section>,
    <section key="default">
      <h3>Default</h3>
      <div className="textarea-examples">
        <div className="textarea-example">
          <CodeBlock language="jsx" maxLineLength={30}>
            <Textarea />
          </CodeBlock>
        </div>
      </div>
    </section>,
  ].concat(
    DOCS.map(({examples, title}: DOC_TYPE, index: number): Node => {
      return (
        <section key={index}>
          <h3>{title}</h3>
          <div className="textarea-examples">{renderExamples(examples)}</div>
        </section>
      )
    }),
  )
})
