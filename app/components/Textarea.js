/**
 * @flow
 */

import {CodeBlock, Textarea, TEXTAREA_ALIGN_RIGHT} from '../../src'
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
      Columns: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Textarea cols={2} />
        </CodeBlock>
      ),
      'Max length': (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Textarea maxLength={4} />
        </CodeBlock>
      ),
      'Min length': (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Textarea minLength={4} />
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

export default route('Textarea', (): Node => {
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
              <Textarea />
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
