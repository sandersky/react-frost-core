/**
 * @flow
 */

import {CodeBlock} from '../../src'
import route from './factory'
import React, {type Node} from 'react'

const ALARM_STATUSES = [
  'active-1',
  'active-2',
  'active-3',
  'clear',
  'critical-1',
  'critical-2',
  'critical-3',
  'indeter-1',
  'info-1',
  'loa-1',
  'loa-2',
  'loa-3',
  'major-1',
  'major-2',
  'major-3',
  'minor-1',
  'minor-2',
  'minor-3',
  'warn-1',
  'warn-2',
  'warn-3',
]
const BLUES = ['blue-1', 'blue-2', 'blue-3', 'blue-4']
const BROWNS = ['brown-1', 'brown-2', 'brown-3']
const GREENS = ['green-1', 'green-2', 'green-3', 'green-4', 'green-5']
const GREYS = [
  'grey-1',
  'grey-2',
  'grey-3',
  'grey-4',
  'grey-5',
  'grey-6',
  'grey-7',
]
const INDIGOS = ['indigo-1', 'indigo-2', 'indigo-3', 'indigo-4']
const LGREYS = ['lgrey-1', 'lgrey-2', 'lgrey-3', 'lgrey-4', 'lgrey-5']
const LILACS = ['lilac-1', 'lilac-2', 'lilac-3', 'lilac-4']
const NIGHTS = ['night-1', 'night-2', 'night-3']
const ORANGES = ['orange-1', 'orange-2', 'orange-3']
const PINKS = ['pink-1', 'pink-2', 'pink-3', 'pink-4']
const STATUSES = ['danger', 'neutral', 'positive']
const TEALS = ['teal-1', 'teal-2', 'teal-3', 'teal-4']
const YELLOWS = ['yellow-1', 'yellow-2', 'yellow-3', 'yellow-4']
const WHITES = ['white']

const IMPORTS_CODE = "@import 'react-frost-core.css';"
const INFO = `
The color palette is a set of predefined SASS variables that are used across
all of the Frost components. It is recommended you use these colors in the
components of your codebase as well in order to maintain a unified look and
feel. By using the variables instead of hard-coding colors in your codebase, if
the colors should ever change in the future you'll have less work upgrading. To
get started simply import the react-frost-core SASS like in the code snippet
below:
`

type SwatchProps = {
  color: string,
}

const Swatch = ({color}: SwatchProps): Node => {
  return <span className={`ColorPaletteSwatch frost-bg-${color}`} />
}

type ColorProps = {
  color: string,
}

const Color = ({color}: ColorProps): Node => {
  return (
    <tr>
      <td>
        <Swatch color={color} />
      </td>
      <td>
        <code>{`--frost-color-${color}`}</code>
      </td>
      <td>
        <code>{`frost-bg-${color}`}</code>
      </td>
    </tr>
  )
}

type ColorTableProps = {
  colors: string[],
  title: string,
}

const ColorTable = ({colors, title}: ColorTableProps): Node => {
  return (
    <table className="ColorPaletteTable">
      <caption>{title}</caption>
      <thead>
        <tr>
          <th>Color</th>
          <th>CSS Variable</th>
          <th>Background Class</th>
        </tr>
      </thead>
      <tbody>
        {colors.map((color: string) => <Color color={color} key={color} />)}
      </tbody>
    </table>
  )
}

export default route('Color palette', (): Node => {
  return [
    <p key="info">{INFO}</p>,
    <CodeBlock key="imports" code={IMPORTS_CODE} demo={false} language="css" />,
    <p key="colors-description">
      Below is a list of all of the colors and their SASS variables. Also
      included are classes for setting the background of DOM elemnts to a
      particular color which are sometimes more useful then defining a bunch of
      extra classes that utilize the SASS variables.
    </p>,
    <div className="ColorPaletteTables" key="tables">
      <ColorTable colors={WHITES} title="Whites" />
      <ColorTable colors={BLUES} title="Blues" />
      <ColorTable colors={NIGHTS} title="Nights" />
      <ColorTable colors={ORANGES} title="Oranges" />
      <ColorTable colors={GREENS} title="Greens" />
      <ColorTable colors={TEALS} title="Teals" />
      <ColorTable colors={LILACS} title="Lilacs" />
      <ColorTable colors={INDIGOS} title="Indigos" />
      <ColorTable colors={PINKS} title="Pinks" />
      <ColorTable colors={GREYS} title="Greys" />
      <ColorTable colors={LGREYS} title="Light greys" />
      <ColorTable colors={BROWNS} title="Browns" />
      <ColorTable colors={YELLOWS} title="Yellows" />
      <ColorTable colors={STATUSES} title="Statuses" />
      <ColorTable colors={ALARM_STATUSES} title="Alarm statuses" />
    </div>,
  ]
})
