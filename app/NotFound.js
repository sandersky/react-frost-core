/**
 * @flow
 */

import t from 'grammatic'
import React, {type Node} from 'react'

const TITLE = t('Not found', 'Not found title')

const NotFound = (): Node => {
  return <h2>{TITLE}</h2>
}

NotFound.displayName = 'NotFound'

export default NotFound
