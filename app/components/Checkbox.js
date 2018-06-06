/**
 * @flow
 */

import {Checkbox, CodeBlock} from '../../src'
import route from '../factory'
import React, {type Node} from 'react'

const IMPORTS_CODE = "import {Checkbox} from 'react-frost-core'"

export default route(
  'Checkbox',
  (): Node => (
    <div>
      <section>
        <CodeBlock code={IMPORTS_CODE} demo={false} language="js" />
      </section>
      <section>
        <h3>Sizes</h3>
        <CodeBlock language="jsx" maxLineLength={30}>
          <Checkbox label="large" size={Checkbox.SIZES.LARGE} />
          <br />
          <br />
          <Checkbox label="medium" size={Checkbox.SIZES.MEDIUM} />
          <br />
          <br />
          <Checkbox label="small" size={Checkbox.SIZES.SMALL} />
        </CodeBlock>
      </section>
      <section>
        <h3>State</h3>
        <CodeBlock language="jsx" maxLineLength={30}>
          <Checkbox checked={true} label="checked" />
          <br />
          <br />
          <Checkbox disabled={true} label="disabled" />
          <br />
          <br />
          <Checkbox
            checked={true}
            disabled={true}
            label="checked and disabled"
          />
          <br />
          <br />
          <Checkbox error={true} label="erred" />
        </CodeBlock>
      </section>
    </div>
  ),
)
