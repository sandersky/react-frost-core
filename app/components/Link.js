/**
 * @flow
 */

import {CodeBlock, Link} from '../../src'
import route from '../factory'
import React, {type Node} from 'react'

const IMPORTS_CODE = "import {Link} from 'react-frost-core'"

export default route(
  'Link',
  (): Node => (
    <div>
      <section>
        <CodeBlock code={IMPORTS_CODE} demo={false} language="js" />
      </section>
      <section>
        <h3>Priorities</h3>
        <CodeBlock language="jsx">
          <Link
            href="#"
            priority={Link.PRIORITIES.PRIMARY}
            size={Link.SIZES.SMALL}
            text={Link.PRIORITIES.PRIMARY}
          />{' '}
          <Link
            href="#"
            priority={Link.PRIORITIES.SECONDARY}
            size={Link.SIZES.SMALL}
            text={Link.PRIORITIES.SECONDARY}
          />
        </CodeBlock>
      </section>
      <section>
        <h3>Sizes</h3>
        <CodeBlock language="jsx">
          <Link
            href="#"
            priority={Link.PRIORITIES.PRIMARY}
            size={Link.SIZES.LARGE}
            text={Link.SIZES.LARGE}
          />{' '}
          <Link
            href="#"
            priority={Link.PRIORITIES.SECONDARY}
            size={Link.SIZES.LARGE}
            text={Link.SIZES.LARGE}
          />
          <br />
          <br />
          <Link
            href="#"
            priority={Link.PRIORITIES.PRIMARY}
            size={Link.SIZES.MEDIUM}
            text={Link.SIZES.MEDIUM}
          />{' '}
          <Link
            href="#"
            priority={Link.PRIORITIES.SECONDARY}
            size={Link.SIZES.MEDIUM}
            text={Link.SIZES.MEDIUM}
          />
          <br />
          <br />
          <Link
            href="#"
            priority={Link.PRIORITIES.PRIMARY}
            size={Link.SIZES.SMALL}
            text={Link.SIZES.SMALL}
          />{' '}
          <Link
            href="#"
            priority={Link.PRIORITIES.SECONDARY}
            size={Link.SIZES.SMALL}
            text={Link.SIZES.SMALL}
          />
        </CodeBlock>
      </section>
      <section>
        <h3>Disabled</h3>
        <CodeBlock language="jsx">
          <Link
            disabled={true}
            href="#"
            priority={Link.PRIORITIES.PRIMARY}
            size={Link.SIZES.SMALL}
            text={Link.PRIORITIES.PRIMARY}
          />{' '}
          <Link
            disabled={true}
            href="#"
            priority={Link.PRIORITIES.SECONDARY}
            size={Link.SIZES.SMALL}
            text={Link.PRIORITIES.SECONDARY}
          />
        </CodeBlock>
      </section>
    </div>
  ),
)
