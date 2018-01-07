/**
 * @flow
 */

import {CodeBlock, Password, PASSWORD_ALIGN_RIGHT} from '../../src'
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
          <Password disabled={true} value="can't touch this" />
        </CodeBlock>
      ),
      Error: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Password error={true} />
        </CodeBlock>
      ),
      'Read only': (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Password readOnly={true} value="Jane Doe" />
        </CodeBlock>
      ),
    },
  },
  {
    title: 'Options',
    examples: {
      Align: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Password align={PASSWORD_ALIGN_RIGHT} />
        </CodeBlock>
      ),
      Autofocus: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Password autoFocus={true} />
        </CodeBlock>
      ),
      Placeholder: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Password placeholder="Password" />
        </CodeBlock>
      ),
      Revealable: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Password revealable={true} />
        </CodeBlock>
      ),
      'Tab index': (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Password tabIndex={-1} />
        </CodeBlock>
      ),
      Value: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Password value="Password123" />
        </CodeBlock>
      ),
    },
  },
]

const IMPORTS_CODE = `
import {
  Password,
  PASSWORD_ALIGN_LEFT,
  PASSWORD_ALIGN_RIGHT,
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

export default route('Password', (): Node => {
  return [
    <section key="imports">
      <CodeBlock code={IMPORTS_CODE} demo={false} language="js" />
    </section>,
    <section key="default">
      <h3>Default</h3>
      <div className="text-field-examples">
        <div className="text-field-example">
          <CodeBlock language="jsx" maxLineLength={30}>
            <Password />
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
