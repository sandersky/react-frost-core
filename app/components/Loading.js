/**
 * @flow
 */

import {CodeBlock, Loading} from '../../src'
import route from '../factory'
import React, {type Node} from 'react'

const IMPORTS_CODE = "import {Loading} from 'react-frost-core'"

export default route('Loading', (): Node => {
  return [
    <section key="imports">
      <CodeBlock code={IMPORTS_CODE} demo={false} language="js" />
    </section>,
    <section className="LoadingTypes" key="types">
      <h3>Types</h3>
      <CodeBlock language="jsx">
        <Loading type={Loading.TYPES.RING} />
        <Loading type={Loading.TYPES.RIPPLE} />
      </CodeBlock>
    </section>,
  ]
})
