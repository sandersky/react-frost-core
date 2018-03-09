/**
 * @flow
 */

import KEY_CODES from '../key-codes'
import {COLOR_BLUE_1, COLOR_LIGHT_GREY_2} from '../styles/colors'
import {FONT_SIZE_XS} from '../styles/typography'
import Text, {
  ALIGN_LEFT as TEXT_ALIGN_LEFT,
  ALIGN_RIGHT as TEXT_ALIGN_RIGHT,
} from './Text'
import t from 'grammatic'
import {css, names} from 'linaria'
import React, {Component, type Node} from 'react'

export const ALIGN_LEFT: 'left' = TEXT_ALIGN_LEFT
export const ALIGN_RIGHT: 'right' = TEXT_ALIGN_RIGHT

// eslint-disable-next-line flowtype/require-exact-type
export type PasswordProps = {
  className?: ?string,
  revealable?: ?boolean,
}

type PasswordState = {|
  revealed: boolean,
|}

const HIDE_A11Y_LABEL = t(
  'Hide password',
  'Accessible label for hiding raw password',
)
const HIDE_LABEL = t('Hide', 'Label for hiding raw password')
const SHOW_A11Y_LABEL = t(
  'Show password',
  'Accessible label for showing raw password',
)
const SHOW_LABEL = t('Show', 'Label for showing raw password')

export default class Password extends Component<PasswordProps, PasswordState> {
  _el: ?HTMLDivElement

  state = {
    revealed: false,
  }

  _handleRevealKeyPress = (e: SyntheticKeyboardEvent<*>) => {
    if ([KEY_CODES.ENTER, KEY_CODES.SPACE].includes(e.which)) {
      this.setState({revealed: !this.state.revealed})
    }
  }

  _handleRevealMouseUp = (e: SyntheticEvent<*>) => {
    if (this._el) {
      // eslint-disable-next-line flowtype/no-weak-types
      const input: ?HTMLInputElement = (this._el.querySelector('input'): any)

      // Make sure when toggling reveal we keep input focused without changing
      // cursor position or selection
      if (input) {
        let {selectionEnd, selectionStart} = input

        input.focus()

        setTimeout(() => {
          input.selectionStart = selectionStart
          input.selectionEnd = selectionEnd
        }, 0)
      }
    }

    this.setState({revealed: !this.state.revealed})
  }

  render(): Node {
    const {className, revealable, ...passThroughProps} = this.props
    const {revealed} = this.state

    return (
      <div
        className={names(
          // $FlowFixMe - babel-plugin-object-styles-to-template
          css({
            display: 'block',
            minWidth: 175,
            position: 'relative',
          }),
        )}
        ref={(el: ?HTMLDivElement) => {
          this._el = el
        }}
      >
        <Text
          className="frost-password-input"
          clearOffset={revealable ? 50 : null}
          type={revealed ? 'text' : 'password'}
          {...passThroughProps}
        />
        {revealable ? (
          <button
            aria-label={revealed ? HIDE_A11Y_LABEL : SHOW_A11Y_LABEL}
            className={names(
              // $FlowFixMe - babel-plugin-object-styles-to-template
              css({
                borderLeft: `1px solid ${COLOR_LIGHT_GREY_2}`,
                color: COLOR_BLUE_1,
                cursor: 'pointer',
                display: 'inline-block',
                fontSize: FONT_SIZE_XS,
                height: 33,
                lineHeight: 35,
                position: 'absolute',
                right: 0,
                textAlign: 'center',
                top: 2,
                verticalAlign: 'middle',
                width: 45,

                '&:focus': {
                  outline: 'none',
                },
              }),
            )}
            onKeyPress={this._handleRevealKeyPress}
            onMouseUp={this._handleRevealMouseUp}
            style={{
              paddingRight: revealable ? 75 : null,
            }}
          >
            {revealed ? HIDE_LABEL : SHOW_LABEL}
          </button>
        ) : null}
      </div>
    )
  }
}
