/**
 * @flow
 */

import {
  Button,
  CodeBlock,
  BUTTON_PRIORITY_PRIMARY,
  BUTTON_PRIORITY_SECONDARY,
  BUTTON_PRIORITY_TERTIARY,
  BUTTON_SIZE_LARGE,
  BUTTON_SIZE_MEDIUM,
  BUTTON_SIZE_SMALL,
} from '../../src'
import route from './factory'
import React, {type Node} from 'react'

const IMPORTS_CODE = `
import {
  Button,
  BUTTON_DESIGN_APP_BAR,
  BUTTON_DESIGN_INFO_BAR,
  BUTTON_DESIGN_TAB,
  BUTTON_PRIORITY_CANCEL, // Alias for BUTTON_PRIORITY_TERTIARY
  BUTTON_PRIORITY_CONFIRM, // Alias for BUTTON_PRIORITY_PRIMARY
  BUTTON_PRIORITY_NORMAL, // Alias for BUTTON_PRIORITY_SECONDARY
  BUTTON_PRIORITY_PRIMARY,
  BUTTON_PRIORITY_SECONDARY,
  BUTTON_PRIORITY_TERTIARY,
  BUTTON_SIZE_LARGE,
  BUTTON_SIZE_MEDIUM,
  BUTTON_SIZE_SMALL,
} from 'react-frost-core'
`.trim()

export default route('Button', (): Node => {
  return [
    <section key="imports">
      <CodeBlock code={IMPORTS_CODE} demo={false} language="js" />
    </section>,
    <section key="priorities">
      <h3>Priorities</h3>
      <CodeBlock language="jsx">
        <Button
          priority={BUTTON_PRIORITY_PRIMARY}
          size={BUTTON_SIZE_SMALL}
          text={BUTTON_PRIORITY_PRIMARY}
        />{' '}
        <Button
          priority={BUTTON_PRIORITY_SECONDARY}
          size={BUTTON_SIZE_SMALL}
          text={BUTTON_PRIORITY_SECONDARY}
        />{' '}
        <Button
          priority={BUTTON_PRIORITY_TERTIARY}
          size={BUTTON_SIZE_SMALL}
          text={BUTTON_PRIORITY_TERTIARY}
        />
      </CodeBlock>
    </section>,
    <section key="sizes">
      <h3>Sizes</h3>
      <CodeBlock language="jsx">
        <Button
          priority={BUTTON_PRIORITY_PRIMARY}
          size={BUTTON_SIZE_LARGE}
          text={BUTTON_SIZE_LARGE}
        />{' '}
        <Button
          priority={BUTTON_PRIORITY_SECONDARY}
          size={BUTTON_SIZE_LARGE}
          text={BUTTON_SIZE_LARGE}
        />{' '}
        <Button
          priority={BUTTON_PRIORITY_TERTIARY}
          size={BUTTON_SIZE_LARGE}
          text={BUTTON_SIZE_LARGE}
        />
        <br />
        <br />
        <Button
          priority={BUTTON_PRIORITY_PRIMARY}
          size={BUTTON_SIZE_MEDIUM}
          text={BUTTON_SIZE_MEDIUM}
        />{' '}
        <Button
          priority={BUTTON_PRIORITY_SECONDARY}
          size={BUTTON_SIZE_MEDIUM}
          text={BUTTON_SIZE_MEDIUM}
        />{' '}
        <Button
          priority={BUTTON_PRIORITY_TERTIARY}
          size={BUTTON_SIZE_MEDIUM}
          text={BUTTON_SIZE_MEDIUM}
        />
        <br />
        <br />
        <Button
          priority={BUTTON_PRIORITY_PRIMARY}
          size={BUTTON_SIZE_SMALL}
          text={BUTTON_SIZE_SMALL}
        />{' '}
        <Button
          priority={BUTTON_PRIORITY_SECONDARY}
          size={BUTTON_SIZE_SMALL}
          text={BUTTON_SIZE_SMALL}
        />{' '}
        <Button
          priority={BUTTON_PRIORITY_TERTIARY}
          size={BUTTON_SIZE_SMALL}
          text={BUTTON_SIZE_SMALL}
        />
      </CodeBlock>
    </section>,
    <section key="disabled">
      <h3>Disabled</h3>
      <CodeBlock language="jsx">
        <Button
          disabled={true}
          priority={BUTTON_PRIORITY_PRIMARY}
          size={BUTTON_SIZE_SMALL}
          text={BUTTON_PRIORITY_PRIMARY}
        />{' '}
        <Button
          disabled={true}
          priority={BUTTON_PRIORITY_SECONDARY}
          size={BUTTON_SIZE_SMALL}
          text={BUTTON_PRIORITY_SECONDARY}
        />{' '}
        <Button
          disabled={true}
          priority={BUTTON_PRIORITY_TERTIARY}
          size={BUTTON_SIZE_SMALL}
          text={BUTTON_PRIORITY_TERTIARY}
        />
      </CodeBlock>
    </section>,
  ]
})
