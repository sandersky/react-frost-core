/**
 * @flow
 */

import {CodeBlock, Select} from '../../src'
import route from '../factory'
import React, {type Element, type Node} from 'react'

type DOC_TYPE = {|
  examples: {[key: string]: Element<*>},
  title: string,
|}

const DATA = [
  {label: 'Aquaman', value: 1},
  {label: 'Atom', value: 2},
  {label: 'Batman', value: 3},
  {label: 'Blue Beetle', value: 4},
  {label: 'Captain Cold', value: 5},
  {label: 'Flash, The', value: 6},
  {label: 'Green Lantern', value: 7},
  {label: 'Ironman', value: 8},
  {label: 'Some ridiculously long named superhero', value: 9},
  {label: 'Spiderman', value: 10},
  {label: 'Superman', value: 11},
  {label: 'Wonder Woman', value: 12},
]

const DOCS: Array<DOC_TYPE> = [
  {
    title: 'State',
    examples: {
      Disabled: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Select data={DATA} disabled={true} label="superhero" />
        </CodeBlock>
      ),
      Error: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Select data={DATA} error={true} label="superhero" />
        </CodeBlock>
      ),
    },
  },
  {
    title: 'Options',
    examples: {
      Autofocus: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Select autofocus={true} data={DATA} label="superhero" />
        </CodeBlock>
      ),
      'Multiple selection': (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Select data={DATA} label="superhero" multiselect={true} />
        </CodeBlock>
      ),
      Placeholder: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Select data={DATA} label="superhero" placeholder="Superhero" />
        </CodeBlock>
      ),
      Width: (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Select data={DATA} label="superhero" width={300} />
        </CodeBlock>
      ),
      'Wrap labels': (
        <CodeBlock language="jsx" maxLineLength={30}>
          <Select data={DATA} label="superhero" wrapLabels={true} />
        </CodeBlock>
      ),
    },
  },
]

const IMPORTS_CODE = "import {Select} from 'react-frost-core'"

const renderExamples = (examples: ?{[key: string]: Element<*>}): Node => {
  if (!examples) {
    return null
  }

  return Object.keys(examples).map((key: string, index: number): Node => {
    return (
      <div className="select-example" key={index}>
        <h4>{key}</h4>
        {/* $FlowFixMe - Flow thinks examples could be null/undefined */}
        {examples[key]}
      </div>
    )
  })
}

export default route('Select', (): Node => {
  return (
    <div>
      <section>
        <CodeBlock code={IMPORTS_CODE} demo={false} language="js" />
      </section>
      <h3>Sample data set used in below examples</h3>
      <CodeBlock
        code={JSON.stringify(DATA, null, 2)}
        demo={false}
        language="js"
        maxLineLength={30}
      />
      <section>
        <h3>Basic</h3>
        <div className="text-examples">
          <div className="text-example">
            <CodeBlock language="jsx" maxLineLength={30}>
              <Select data={DATA} label="superhero" />
            </CodeBlock>
          </div>
        </div>
      </section>
      {DOCS.map(({examples, title}: DOC_TYPE, index: number): Node => {
        return (
          <section key={index}>
            <h3>{title}</h3>
            <div className="text-examples">{renderExamples(examples)}</div>
          </section>
        )
      })}
    </div>
  )
})
