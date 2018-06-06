/**
 * @flow
 */

import {Button, CodeBlock} from '../../src'
import route from '../factory'
import React, {type Node} from 'react'

const IMPORTS_CODE = "import {Button} from 'react-frost-core'"

export default route(
  'Button',
  (): Node => (
    <div>
      <section>
        <CodeBlock code={IMPORTS_CODE} demo={false} language="js" />
      </section>
      <section>
        <h3>Priorities</h3>
        <CodeBlock language="jsx">
          <Button
            priority={Button.PRIORITIES.PRIMARY}
            size={Button.SIZES.SMALL}
            text={Button.PRIORITIES.PRIMARY}
          />{' '}
          <Button
            priority={Button.PRIORITIES.SECONDARY}
            size={Button.SIZES.SMALL}
            text={Button.PRIORITIES.SECONDARY}
          />{' '}
          <Button
            priority={Button.PRIORITIES.TERTIARY}
            size={Button.SIZES.SMALL}
            text={Button.PRIORITIES.TERTIARY}
          />
        </CodeBlock>
      </section>
      <section>
        <h3>Sizes</h3>
        <CodeBlock language="jsx">
          <Button
            priority={Button.PRIORITIES.PRIMARY}
            size={Button.SIZES.LARGE}
            text={Button.SIZES.LARGE}
          />{' '}
          <Button
            priority={Button.PRIORITIES.SECONDARY}
            size={Button.SIZES.LARGE}
            text={Button.SIZES.LARGE}
          />{' '}
          <Button
            priority={Button.PRIORITIES.TERTIARY}
            size={Button.SIZES.LARGE}
            text={Button.SIZES.LARGE}
          />
          <br />
          <br />
          <Button
            priority={Button.PRIORITIES.PRIMARY}
            size={Button.SIZES.MEDIUM}
            text={Button.SIZES.MEDIUM}
          />{' '}
          <Button
            priority={Button.PRIORITIES.SECONDARY}
            size={Button.SIZES.MEDIUM}
            text={Button.SIZES.MEDIUM}
          />{' '}
          <Button
            priority={Button.PRIORITIES.TERTIARY}
            size={Button.SIZES.MEDIUM}
            text={Button.SIZES.MEDIUM}
          />
          <br />
          <br />
          <Button
            priority={Button.PRIORITIES.PRIMARY}
            size={Button.SIZES.SMALL}
            text={Button.SIZES.SMALL}
          />{' '}
          <Button
            priority={Button.PRIORITIES.SECONDARY}
            size={Button.SIZES.SMALL}
            text={Button.SIZES.SMALL}
          />{' '}
          <Button
            priority={Button.PRIORITIES.TERTIARY}
            size={Button.SIZES.SMALL}
            text={Button.SIZES.SMALL}
          />
        </CodeBlock>
      </section>
      <section>
        <h3>Disabled</h3>
        <CodeBlock language="jsx">
          <Button
            disabled={true}
            priority={Button.PRIORITIES.PRIMARY}
            size={Button.SIZES.SMALL}
            text={Button.PRIORITIES.PRIMARY}
          />{' '}
          <Button
            disabled={true}
            priority={Button.PRIORITIES.SECONDARY}
            size={Button.SIZES.SMALL}
            text={Button.PRIORITIES.SECONDARY}
          />{' '}
          <Button
            disabled={true}
            priority={Button.PRIORITIES.TERTIARY}
            size={Button.SIZES.SMALL}
            text={Button.PRIORITIES.TERTIARY}
          />
        </CodeBlock>
      </section>
    </div>
  ),
)
