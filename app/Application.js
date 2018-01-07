/**
 * @flow
 */

import AjaxErrorPage from './routes/AjaxErrorPage'
import Bookends from './routes/Bookends'
import Button from './routes/Button'
import Checkbox from './routes/Checkbox'
import CodeBlock from './routes/CodeBlock'
import ColorPalette from './routes/ColorPalette'
import Expand from './routes/Expand'
import Icons from './routes/Icons'
import Layout from './routes/Layout'
import Link from './routes/Link'
import Loading from './routes/Loading'
import Password from './routes/Password'
import Radio from './routes/Radio'
import Scroll from './routes/Scroll'
import Select from './routes/Select'
import Text from './routes/Text'
import TextArea from './routes/TextArea'
import Toggle from './routes/Toggle'
import Typography from './routes/Typography'
import React, {type Node} from 'react'
import {HashRouter, NavLink, Redirect, Route} from 'react-router-dom'

/* eslint-disable flowtype/no-weak-types */
type PAGE_TYPE = {|
  Component: any,
  path: string,
|}
/* eslint-enable flowtype/no-weak-types */

const PAGES: Array<PAGE_TYPE> = [
  {
    Component: ColorPalette,
    path: '/color-palette',
  },
  {
    Component: Layout,
    path: '/layout',
  },
  {
    Component: Typography,
    path: '/typography',
  },
  {
    Component: AjaxErrorPage,
    path: '/ajax-error-page',
  },
  {
    Component: Bookends,
    path: '/bookends',
  },
  {
    Component: Button,
    path: '/button',
  },
  {
    Component: Checkbox,
    path: '/checkbox',
  },
  {
    Component: CodeBlock,
    path: '/code-block',
  },
  {
    Component: Expand,
    path: '/expand',
  },
  {
    Component: Icons,
    path: '/icons',
  },
  {
    Component: Link,
    path: '/link',
  },
  {
    Component: Loading,
    path: '/loading',
  },
  {
    Component: Password,
    path: '/password',
  },
  {
    Component: Radio,
    path: '/radio',
  },
  {
    Component: Scroll,
    path: '/scroll',
  },
  {
    Component: Select,
    path: '/select',
  },
  {
    Component: TextArea,
    path: '/text-area',
  },
  {
    Component: Text,
    path: '/text',
  },
  {
    Component: Toggle,
    path: '/toggle',
  },
]

export default (): Node => {
  return (
    <HashRouter basename="/">
      <div className="Application">
        <header>
          <h1>react-frost-core</h1>
        </header>
        <div className="body">
          <div className="navigation">
            {PAGES.map(({Component, path}: PAGE_TYPE): Node => {
              return (
                <NavLink activeClassName="active" key={path} to={path}>
                  {Component.title}
                </NavLink>
              )
            })}
          </div>
          <div className="content">
            {PAGES.map(({Component, path}: PAGE_TYPE): Node => {
              return (
                <Route
                  key={path}
                  path={path}
                  render={(): Node => <Component />}
                />
              )
            })}
            <Route
              exact={true}
              path="/"
              render={(): Node => <Redirect from="/" to="color-palette" />}
            />
          </div>
        </div>
      </div>
    </HashRouter>
  )
}
