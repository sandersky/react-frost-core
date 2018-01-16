/**
 * @flow
 */

import t from 'grammatic'
import React, {type Node} from 'react'

const TITLE = t('Not found', 'Not found title')

export default (): Node => {
  return <h2>{TITLE}</h2>
}
