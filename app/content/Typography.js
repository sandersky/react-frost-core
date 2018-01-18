/**
 * @flow
 */

import {CodeBlock} from '../../src'
import route from '../factory'
import React, {type Node} from 'react'

const EXAMPLE_TEXT = 'The quick brown fox jumps over the lazy dog'
const IMPORTS_CODE = "@import 'react-frost-core.css';"

// Note: this array is auto-populated by the plugin:
// babel-plugin-auto-generate-typography
const SIZES = []

type SizeProps = {
  size: string,
}

const Size = ({size}: SizeProps): Node => {
  return (
    <tr>
      <td>
        <code>{`--frost-font-size-${size}`}</code>
      </td>
      <td>
        <code>{`frost-font-size-${size}`}</code>
      </td>
      <td className={`frost-font-size-${size}`}>{EXAMPLE_TEXT}</td>
    </tr>
  )
}

export default route('Typography', (): Node => {
  return (
    <div>
      <p>
        For typography Frost has SASS variables for a predefined font and font
        sizes which can be used by simply importing:
      </p>
      <CodeBlock code={IMPORTS_CODE} demo={false} language="css" />,
      <p>
        Below are examples of the available sizes which can be consumed via SASS
        variables as well as by simply using their respective CSS classes.
      </p>
      <table>
        <thead>
          <tr>
            <th>CSS Variable</th>
            <th>CSS Class</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          {SIZES.map((size: string): Node => <Size key={size} size={size} />)}
        </tbody>
      </table>
    </div>
  )
})
