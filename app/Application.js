/**
 * @flow
 */

import Footer from './Footer'
import NotFound from './NotFound'
import {getNavigation, getRoutes} from './routes'
import t from 'grammatic'
import React, {type Node} from 'react'
import {HashRouter, NavLink, Route, Switch} from 'react-router-dom'

const GITHUB_TEXT = t(
  'Source code on Github',
  'Alternative text for Github source code link.',
)

const NAVIGATION = getNavigation()
const ROUTES = getRoutes()

const Application = (): Node => {
  return (
    <HashRouter basename="/">
      <div className="Application">
        <header>
          <NavLink to="/">
            <h1>react-frost-core</h1>
          </NavLink>
          <a
            href="https://github.com/dogma-io/react-frost-core"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt={GITHUB_TEXT}
              src={require('./assets/github-mark.svg')}
              title={GITHUB_TEXT}
            />
          </a>
        </header>
        <div className="body">
          <div className="navigation">{NAVIGATION}</div>
          <div className="content">
            <Switch>
              {ROUTES}
              <Route path="*" render={(): Node => <NotFound />} />
            </Switch>
            <Footer />
          </div>
        </div>
      </div>
    </HashRouter>
  )
}

Application.displayName = 'Application'

export default Application
