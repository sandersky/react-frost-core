/**
 * @flow
 */

/* global HTMLElement */

import Application from './Application'
// $FlowFixMe - Flow doesn't understand SASS imports
import './prism-theme.css'
import React from 'react'
import {render} from 'react-dom'

const rootElement: ?HTMLElement = document.getElementById('root')

if (rootElement) {
  render(<Application />, rootElement)
} else {
  throw new Error('Root element not found to render application in')
}
