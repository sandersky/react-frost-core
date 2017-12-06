/**
 * @flow
 */

/* global HTMLElement */

import Application from './Application'
// $FlowFixMe
import './prism-theme.scss'
import React from 'react'
import {render} from 'react-dom'

const rootElement: ?HTMLElement = document.getElementById('root')

if (rootElement) {
  render(<Application />, rootElement)
} else {
  throw new Error('Root element not found to render application in')
}
