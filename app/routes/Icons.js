/**
 * @flow
 */

import {CodeBlock, Icon, ICON_ROUND_ADD} from '../../src'
import route from './factory'
// $FlowFixMe
import './Icons.scss'
import React, {Component, type Node} from 'react'

const BACKGROUND_COLORS = [
  'white',
  'tile',
  'content',
  'info',
  'hint-text',
  'line',
  'main-button',
]

// Note: this array is auto-populated by the plugin:
// babel-plugin-auto-generate-icons
const ICONS: string[] = []

const ICON_MAPPING: {[icon: string]: string} = ICONS.reduce(
  (
    mapping: {[icon: string]: string},
    icon: string,
  ): {[icon: string]: string} => {
    return Object.assign(mapping, {
      [`ICON_${icon.toUpperCase().replace(/-/g, '_')}`]: icon,
    })
  },
  {},
)

const IMPORTS_CODE =
  'import {\n  Icon,\n' +
  Object.keys(ICON_MAPPING)
    .map((icon: string) => `  ${icon},\n`)
    .join('') +
  "} from 'react-frost-core'"

type IconBackgroundColorSwatchProps = {
  color: string,
  onClick: (color: string) => void,
}

const IconBackgroundColorSwatch = ({
  color,
  onClick,
}: IconBackgroundColorSwatchProps): Node => {
  return (
    <button
      className={`IconBackgroundColorSwatch bg-${color}-color`}
      onClick={onClick.bind(null, color)}
    />
  )
}

type IconSwatchProps = {
  background: string,
  icon: string,
  literal: string,
}

const IconSwatch = ({background, icon, literal}: IconSwatchProps): Node => {
  return (
    <div className="IconSwatch">
      <div className={`IconSwatchIconWrapper bg-${background}-color`}>
        <Icon className="IconSwatchIcon" icon={literal} />
      </div>
      <strong>{icon}</strong>
      <em>"{literal}"</em>
    </div>
  )
}

type State = {|
  background: string,
|}

class IconDemo extends Component<{}, State> {
  constructor() {
    super(...arguments)

    this.state = {
      background: BACKGROUND_COLORS[0],
    }
  }

  _changeBackground = (background: string): void => {
    this.setState({background})
  }

  render(): Node {
    const {background} = this.state

    return [
      <p key="import-description">
        In order to use Frost icons simply import the component and whichever
        icons you wish to use like so:
      </p>,
      <CodeBlock
        code={IMPORTS_CODE}
        demo={false}
        key="imports"
        language="js"
      />,
      <p key="continued-description">
        Then consume the component like so, passing in whichever icon you want:
      </p>,
      <CodeBlock demo={false} key="example" language="jsx">
        <Icon icon={ICON_ROUND_ADD} />
      </CodeBlock>,
      <p key="background-description">
        Click on these colors to see what the icons below look like against each
        color:
      </p>,
      <div key="background">
        {BACKGROUND_COLORS.map((color: string): Node => {
          return (
            <IconBackgroundColorSwatch
              color={color}
              key={color}
              onClick={this._changeBackground}
            />
          )
        })}
      </div>,
      <p key="icons-description">
        Below are the icons in the frost pack, which are the default icons that
        ship with react-frost-core. Here both the importable variable as well as
        the literal value for each variable are listed, but it is recommended
        you always use the variable when possible. The reason we provide the
        literal value as well is in case you need the ability to store icon
        types in a non-Javascript layer such as database rows or JSON files.
      </p>,
      <div className="IconSwatchGroup" key="icons">
        {Object.keys(ICON_MAPPING).map((icon: string): Node => {
          return (
            <IconSwatch
              background={background}
              icon={icon}
              key={icon}
              literal={ICON_MAPPING[icon]}
            />
          )
        })}
      </div>,
    ]
  }
}

export default route('Icons', IconDemo)
