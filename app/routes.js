/**
 * @flow
 */

import AjaxErrorPage from './components/AjaxErrorPage'
import Bookends from './components/Bookends'
import Button from './components/Button'
import Checkbox from './components/Checkbox'
import CodeBlock from './components/CodeBlock'
import Expand from './components/Expand'
import Icons from './components/Icons'
import Link from './components/Link'
import Loading from './components/Loading'
import Password from './components/Password'
import Radio from './components/Radio'
import Scroll from './components/Scroll'
import Select from './components/Select'
import Text from './components/Text'
import Textarea from './components/Textarea'
import Toggle from './components/Toggle'
import ColorPalette from './content/ColorPalette'
import Typography from './content/Typography'
import Installation from './getting-started/Installation'
import Introduction from './getting-started/Introduction'
import t from 'grammatic'
import React, {type Node} from 'react'
import {NavLink, Redirect, Route} from 'react-router-dom'

/* eslint-disable flowtype/no-weak-types */
type ROUTE =
  | {|
      Component: any,
      path: string,
    |}
  | {|
      children: Array<ROUTE>,
      label: string,
      path: string,
    |}
/* eslint-enable flowtype/no-weak-types */

const ROUTES = [
  {
    children: [
      {
        Component: Introduction,
        path: 'introduction',
      },
      {
        Component: Installation,
        path: 'installation',
      },
    ],
    label: t('Getting started', 'Getting started link text'),
    path: 'getting-started',
  },
  {
    children: [
      {
        Component: ColorPalette,
        path: 'color-palette',
      },
      {
        Component: Typography,
        path: 'typography',
      },
    ],
    label: t('Content', 'Content link text'),
    path: 'content',
  },
  {
    children: [
      {
        Component: AjaxErrorPage,
        path: 'ajax-error-page',
      },
      {
        Component: Bookends,
        path: 'bookends',
      },
      {
        Component: Button,
        path: 'button',
      },
      {
        Component: Checkbox,
        path: 'checkbox',
      },
      {
        Component: CodeBlock,
        path: 'code-block',
      },
      {
        Component: Expand,
        path: 'expand',
      },
      {
        Component: Icons,
        path: 'icons',
      },
      {
        Component: Link,
        path: 'link',
      },
      {
        Component: Loading,
        path: 'loading',
      },
      {
        Component: Password,
        path: 'password',
      },
      {
        Component: Radio,
        path: 'radio',
      },
      {
        Component: Scroll,
        path: 'scroll',
      },
      {
        Component: Select,
        path: 'select',
      },
      {
        Component: Text,
        path: 'text',
      },
      {
        Component: Textarea,
        path: 'textarea',
      },
      {
        Component: Toggle,
        path: 'toggle',
      },
    ],
    label: t('Components', 'Components link text'),
    path: 'components',
  },
]

function _getNavigation(input: Array<ROUTE>, path: string): Array<Node> {
  return input.map(
    (routeInfo: ROUTE): Node => {
      const {path: routePath} = routeInfo
      const fullPath = `${path}${routePath}/`

      if (routeInfo.children) {
        return (
          <li key={fullPath}>
            <NavLink to={fullPath}>{routeInfo.label}</NavLink>
            <ul>{_getNavigation(routeInfo.children, fullPath)}</ul>
          </li>
        )
      } else {
        const {Component} = routeInfo

        return (
          <li key={fullPath}>
            <NavLink to={fullPath}>{Component.title}</NavLink>
          </li>
        )
      }
    },
  )
}

function _getRoutePaths(input: Array<ROUTE>, path: string): Array<string> {
  let output: Array<string> = []

  input.forEach((routeInfo: ROUTE) => {
    const {path: routePath} = routeInfo
    const fullPath = `${path}${routePath}/`

    if (routeInfo.children) {
      output = output.concat(_getRoutePaths(routeInfo.children, fullPath))
    } else {
      output.push(fullPath)
    }
  })

  return output
}

function _getRoutes(input: Array<ROUTE>, path: string): Array<Route> {
  let output: Array<Route> = []

  input.forEach((routeInfo: ROUTE) => {
    const {path: routePath} = routeInfo
    const fullPath = `${path}${routePath}/`

    if (routeInfo.children) {
      output = output.concat(_getRoutes(routeInfo.children, fullPath))

      if (routeInfo.children.length) {
        const firstChildPath = `${fullPath}${routeInfo.children[0].path}`

        output = output.concat([
          <Route
            exact={true}
            key={fullPath}
            path={fullPath}
            render={(): Node => (
              <Redirect from={fullPath} to={firstChildPath} />
            )}
          />,
        ])
      }
    } else {
      const {Component} = routeInfo

      output.push(
        <Route
          exact={true}
          key={fullPath}
          path={fullPath}
          render={(): Node => <Component />}
        />,
      )
    }
  })

  return output
}

export function getNavigation(): Node {
  return <ul>{_getNavigation(ROUTES, '/')}</ul>
}

export function getRoutePaths(): Array<string> {
  return _getRoutePaths(ROUTES, '/')
}

export function getRoutes(): Array<Route> {
  return _getRoutes(ROUTES, '/').concat([
    <Route
      exact={true}
      key="/"
      path="/"
      render={(): Node => <Redirect key="/" from="/" to={ROUTES[0].path} />}
    />,
  ])
}
