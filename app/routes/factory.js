/**
 * @flow
 */

import React, {type ComponentType, type Node} from 'react'

export default (
  title: string,
  Contents: ComponentType<*>,
): ComponentType<*> => {
  const Route = (): Node => {
    return [<h2 key="title">{title}</h2>, <Contents key="contents" />]
  }

  Route.title = title

  return Route
}
