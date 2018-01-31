/**
 * @flow
 */

import React, {type ComponentType, type Node} from 'react'

export default (
  title: string,
  Contents: ComponentType<*>,
): ComponentType<*> => {
  const Route = (): Node => {
    return (
      <div>
        <h2>{title}</h2>
        <Contents />
      </div>
    )
  }

  Route.title = title

  return Route
}
