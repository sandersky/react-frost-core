/**
 * @flow
 */

import {CodeBlock, Icon} from '../../src'
import t from 'grammatic'
import React, {type Node} from 'react'

const INFO = t(
  'You can install <em>react-frost-core</em> using any of the package managers listed below.',
  'Installation information',
)

const NPM_TITLE = t("Visit Node Package Manager's website", 'npm link title')
const TITLE = t('Installation', 'Installation title')
const YARN_TITLE = t("Visit Yarn's website", 'Yarn link title')

const Installation = (): Node => {
  return (
    <div>
      <h2>{TITLE}</h2>
      <p dangerouslySetInnerHTML={{__html: INFO}} />
      <h3>
        <a
          className="ExternalLink"
          href="https://www.npmjs.com/"
          rel="noopener noreferrer"
          target="_blank"
          title={NPM_TITLE}
        >
          npm <Icon icon={Icon.ICONS.OPEN_TABS} />
        </a>
      </h3>
      <CodeBlock
        code="npm install react-frost-core"
        demo={false}
        language="bash"
        togglable={false}
      />
      <h3>
        <a
          className="ExternalLink"
          href="https://yarnpkg.com/"
          rel="noopener noreferrer"
          target="_blank"
          title={YARN_TITLE}
        >
          yarn <Icon icon={Icon.ICONS.OPEN_TABS} />
        </a>
      </h3>
      <CodeBlock
        code="yarn install react-frost-core"
        demo={false}
        language="bash"
        togglable={false}
      />
    </div>
  )
}

Installation.title = TITLE

export default Installation
