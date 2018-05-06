/**
 * @flow
 */

import {Link} from '../src'
import {getRoutePaths} from './routes'
import t from 'grammatic'
import React, {type Node} from 'react'
import {withRouter} from 'react-router-dom'

const NEXT_LABEL = t('Next', 'Next button label')
const PREVIOUS_LABEL = t('Previous', 'Previous button label')

/* eslint-disable flowtype/no-weak-types */
type PROPS = {|
  className?: ?string,
  history: any,
  location: any,
  match: any,
|}
/* eslint-enable flowtype/no-weak-types */

const ROUTE_PATHS = getRoutePaths()

const Footer = ({className, location}: PROPS): Node => {
  const {pathname} = location
  let nextRoute
  let prevRoute

  for (let i = 0; i < ROUTE_PATHS.length; i++) {
    const path = ROUTE_PATHS[i]

    if (path.indexOf(pathname) === 0) {
      nextRoute = i !== ROUTE_PATHS.length - 1 ? ROUTE_PATHS[i + 1] : null
      prevRoute = i !== 0 ? ROUTE_PATHS[i - 1] : null
      break
    }
  }

  return (
    <div className={className}>
      <Link
        disabled={!prevRoute}
        href={`/react-frost-core/#${prevRoute || ''}`}
        priority={Link.PRIORITIES.SECONDARY}
        size={Link.SIZES.MEDIUM}
        text={PREVIOUS_LABEL}
      />
      <Link
        disabled={!nextRoute}
        href={`/react-frost-core/#${nextRoute || ''}`}
        priority={Link.PRIORITIES.SECONDARY}
        size={Link.SIZES.MEDIUM}
        text={NEXT_LABEL}
      />
    </div>
  )
}

export default withRouter(Footer)
