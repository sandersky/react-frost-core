/**
 * @flow
 */

import {AjaxErrorPage, CodeBlock} from '../../src'
import route from '../factory'
import React, {type Node} from 'react'

const IMPORTS_CODE = "import {AjaxErrorPage} from 'react-frost-core'"

export default route(
  'Ajax error page',
  (): Node => (
    <div>
      <section>
        <CodeBlock code={IMPORTS_CODE} demo={false} language="js" />
      </section>
      <section className="LoadingTypes">
        <CodeBlock language="jsx">
          <AjaxErrorPage
            description="Service is currently unavailable."
            errorCode={500}
            errorDetails="Detailed information would be displayed here."
            errorMessage="Failure to retrieve network elements"
            errorTitle="Internal server error"
            suggestion="Try again later."
          />
        </CodeBlock>
      </section>
    </div>
  ),
)
