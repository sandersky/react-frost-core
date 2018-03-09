/**
 * @flow
 */

import {
  COLOR_DANGER,
  COLOR_GREY_1,
  COLOR_GREY_6,
  COLOR_INPUT_BORDER,
  COLOR_INPUT_DISABLED_BG,
  COLOR_INPUT_DISABLED_BORDER,
  COLOR_INPUT_ERROR_BORDER,
  COLOR_INPUT_FOCUS_BORDER,
} from '../styles/colors'
import {FONT_SIZE_S} from '../styles/typography'
import ClearSVG from './ClearSVG'
import {css, names} from 'linaria'
import React, {Component, type Node} from 'react'

export const ALIGN_LEFT: 'left' = 'left'
export const ALIGN_RIGHT: 'right' = 'right'

const ERRED_STYLE = css({
  border: `1px solid ${COLOR_INPUT_ERROR_BORDER}`,
  color: COLOR_DANGER,
  margin: 1,

  '&:hover': {
    '&:enabled': {
      '&:read-write': {
        '&:not(:focus)': {
          border: `1px solid ${COLOR_INPUT_ERROR_BORDER}`,
          outline: 'none',
        },
      },
    },
  },
})

const NOT_ERRED_STYLE = css({
  border: `1px solid ${COLOR_INPUT_BORDER}`,
  color: COLOR_GREY_1,

  '&:hover': {
    '&:enabled': {
      '&:read-write': {
        '&:not(:focus)': {
          border: `1px solid ${COLOR_INPUT_FOCUS_BORDER}`,
          outline: 'none',
        },
      },
    },
  },
})

type ALIGN = typeof ALIGN_LEFT | typeof ALIGN_RIGHT

// eslint-disable-next-line flowtype/require-exact-type
export type TextareaProps = {
  align?: ?ALIGN,
  className?: ?string,
  disabled?: ?boolean,
  error?: ?boolean,
  maxLength?: ?number,
  minLength?: ?number,
  onChange?: (value: ?string) => void,
  readOnly?: ?boolean,
  value?: ?string,
}

type TextareaState = {|
  animatingClearButtonOut: boolean,
  focused: boolean,
  value?: ?string,
|}

export default class Textarea extends Component<TextareaProps, TextareaState> {
  constructor(props: TextareaProps) {
    super(props)

    this.state = {
      animatingClearButtonOut: false,
      focused: false,
      value: props.value,
    }
  }

  _handleBlur = () => {
    const {disabled, readOnly} = this.props
    const {animatingClearButtonOut, value} = this.state
    // eslint-disable-next-line flowtype/no-weak-types
    const state: any = {focused: false}

    if (!animatingClearButtonOut && !disabled && !readOnly && value) {
      state.animatingClearButtonOut = true
    }

    this.setState(state)
  }

  _handleChange = (e: SyntheticInputEvent<*>) => {
    this._updateValue(e.target.value)
  }

  _handleClear = () => {
    this._updateValue('')
  }

  _handleClearButtonAnimationEnd = () => {
    const {animatingClearButtonOut, value} = this.state

    // We don't want to do anything if this is the fade in animation.
    if (!animatingClearButtonOut && value) {
      return
    }

    this.setState({animatingClearButtonOut: false})
  }

  _handleFocus = () => {
    this.setState({focused: true})
  }

  _renderClearButton(): Node {
    const {disabled, readOnly} = this.props
    const {animatingClearButtonOut, focused, value} = this.state

    if (
      !animatingClearButtonOut &&
      (disabled || !focused || readOnly || !value)
    ) {
      return null
    }

    return (
      <button
        className={names(
          // $FlowFixMe - babel-plugin-object-styles-to-template
          css({
            fill: COLOR_GREY_6,
            height: 23,
            position: 'relative',
            right: 26,
            top: 7,
            transition: 'opacity .2s ease',
            width: 23,

            '&:focus': {
              outline: 'none',
            },
          }),
          animatingClearButtonOut ? 'frost-fade-out' : 'frost-fade-in',
        )}
        onAnimationEnd={this._handleClearButtonAnimationEnd}
        onClick={this._handleClear}
        tabIndex={-1}
      >
        <ClearSVG />
      </button>
    )
  }

  _updateValue(nextValue: ?string) {
    const {maxLength, onChange} = this.props
    const {value} = this.state

    if (nextValue === '') {
      nextValue = null
    } else if (
      typeof nextValue === 'string' &&
      typeof maxLength === 'number' &&
      nextValue.length > maxLength
    ) {
      nextValue = nextValue.slice(0, maxLength)
    }

    // Determine if the value was just cleared, which is used to determine
    // when we should start fading the clear button out.
    const valueCleared = !!value && !nextValue

    this.setState({
      animatingClearButtonOut: valueCleared,
      value: nextValue,
    })

    if (onChange) {
      onChange(nextValue)
    }
  }

  render(): Node {
    const {
      align,
      className,
      error,
      minLength,
      onChange: _onChange,
      value: _value,
      ...passThroughProps
    } = this.props

    const {value} = this.state

    const showError =
      error ||
      (typeof minLength === 'number' &&
        (typeof value !== 'string' || minLength > value.length))

    return (
      <div
        className={names(
          // $FlowFixMe - babel-plugin-object-styles-to-template
          css({
            display: 'flex',
            position: 'relative',
          }),
        )}
      >
        <textarea
          className={names(
            // $FlowFixMe - babel-plugin-object-styles-to-template
            css({
              fontSize: FONT_SIZE_S,
              padding: '5px 30px 5px 5px',
              resize: 'none',
              transition: 'border .2s ease',

              '&:disabled': {
                backgroundColor: COLOR_INPUT_DISABLED_BG,
                border: `1px solid ${COLOR_INPUT_DISABLED_BORDER}`,
              },

              '&:focus': {
                border: `1px solid ${COLOR_INPUT_FOCUS_BORDER}`,
                outline: 'none',
              },

              '&:read-only': {
                border: 0,
                cursor: 'default',
              },
            }),
            showError ? ERRED_STYLE : NOT_ERRED_STYLE,
          )}
          minLength={minLength}
          onBlur={this._handleBlur}
          onChange={this._handleChange}
          onFocus={this._handleFocus}
          style={{
            textAlign: align,
          }}
          value={value || ''}
          {...passThroughProps}
        />
        {this._renderClearButton()}
      </div>
    )
  }
}
