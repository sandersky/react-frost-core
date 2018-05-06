/**
 * @flow
 */

import {CodeBlock, Password, PASSWORD_ALIGN_RIGHT} from '../../src'
import route from '../factory'
import styles from './Password.css'
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
      'Max length': (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Password maxLength={4} />
        </CodeBlock>
      ),
      'Min length': (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Password minLength={4} />
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
      Size: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Password size={5} />
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
      <div className={styles.example} key={index}>
        <h4>{key}</h4>
        {/* $FlowFixMe - Flow thinks examples could be null/undefined */}
        {examples[key]}
      </div>
    )
  })
}

export default route('Password', (): Node => {
  return (
    <div>
      <section>
        <CodeBlock code={IMPORTS_CODE} demo={false} language="js" />
      </section>
      <section>
        <h3>Default</h3>
        <div className={styles.examples}>
          <div className={styles.example}>
            <CodeBlock language="jsx" maxLineLength={30}>
              <Password />
            </CodeBlock>
          </div>
        </div>
      </section>
      {DOCS.map(({examples, title}: DOC_TYPE, index: number): Node => {
        return (
          <section key={index}>
            <h3>{title}</h3>
            <div className={styles.examples}>{renderExamples(examples)}</div>
          </section>
        )
      })}
    </div>
  )
})
