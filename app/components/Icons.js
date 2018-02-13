/**
 * @flow
 */

import {CodeBlock, Icon} from '../../src'
import route from '../factory'
import React, {Component, type Node} from 'react'

const BACKGROUND_COLORS = [
  'tile',
  'content',
  'info',
  'hint-text',
  'line',
  'white',
  'main-button',
]

const IMPORTS_CODE = "'import {Icon} from 'react-frost-core'"

type IconBackgroundColorSwatchProps = {|
  color: string,
  onClick: (color: string) => void,
|}

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

type IconSwatchProps = {|
  background: string,
  icon: string,
  literal: string,
|}

const IconSwatch = ({background, icon, literal}: IconSwatchProps): Node => {
  return (
    <div className="IconSwatch">
      <div className={`IconSwatchIconWrapper bg-${background}-color`}>
        <Icon className="IconSwatchIcon" icon={literal} />
      </div>
      <strong>{icon}</strong>
      <em>{`"${literal}"`}</em>
    </div>
  )
}

type State = {|
  background: string,
|}

class IconDemo extends Component<{}, State> {
  state = {
    background: BACKGROUND_COLORS[0],
  }

  _changeBackground = (background: string) => {
    this.setState({background})
  }

  render(): Node {
    const {background} = this.state

    return (
      <div>
        <p>
          In order to use Frost icons simply import the component and whichever
          icons you wish to use like so:
        </p>
        <CodeBlock code={IMPORTS_CODE} demo={false} language="js" />
        <p>
          Then consume the component like so, passing in whichever icon you
          want:
        </p>
        <CodeBlock demo={false} language="jsx">
          <Icon icon={Icon.ICONS.ROUND_ADD} />
        </CodeBlock>
        <p>
          Click on these colors to see what the icons below look like against
          each color:
        </p>
        <div>
          {BACKGROUND_COLORS.map((color: string): Node => {
            return (
              <IconBackgroundColorSwatch
                color={color}
                key={color}
                onClick={this._changeBackground}
              />
            )
          })}
        </div>
        <p>
          Below are the icons in the frost pack, which are the default icons
          that ship with react-frost-core. Here both the importable variable as
          well as the literal value for each variable are listed, but it is
          recommended you always use the variable when possible. The reason we
          provide the literal value as well is in case you need the ability to
          store icon types in a non-Javascript layer such as database rows or
          JSON files.
        </p>
        <div className="IconSwatchGroup">
          {Object.keys(Icon.ICONS).map((icon: string): Node => {
            return (
              <IconSwatch
                background={background}
                icon={icon}
                key={icon}
                literal={Icon.ICONS[icon]}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default route('Icons', IconDemo)
