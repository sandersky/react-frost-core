/**
 * @flow
 */

import {CodeBlock, Expand} from '../../src'
import route from '../factory'
import React, {type Node} from 'react'

export default route('Expand', (): Node => {
  return [
    <section key="basic">
      <h3>Basic usage</h3>
      <CodeBlock language="jsx">
        <Expand>Content goes here</Expand>
      </CodeBlock>
    </section>,
    <section key="labels">
      <h3>Custom labels</h3>
      <CodeBlock language="jsx">
        <Expand collapsedLabel="Show" expandedLabel="Hide">
          Content goes here
        </Expand>
      </CodeBlock>
    </section>,
    <section key="expanded">
      <h3>Initially expanded</h3>
      <CodeBlock language="jsx">
        <Expand expanded={true}>Content goes here</Expand>
      </CodeBlock>
    </section>,
    <section key="events">
      <h3>Events</h3>
      <CodeBlock language="jsx">
        <Expand onChange={console.log}>Content goes here</Expand>
      </CodeBlock>
    </section>,
  ]
})
