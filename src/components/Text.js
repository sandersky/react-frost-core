/**
 * @flow
 */

import {
  COLOR_GREY_6,
  COLOR_INPUT,
  COLOR_INPUT_BORDER,
  COLOR_INPUT_DISABLED_BG,
  COLOR_INPUT_DISABLED_BORDER,
  COLOR_INPUT_ERROR_BORDER,
  COLOR_INPUT_FOCUS_BORDER,
  COLOR_INPUT_HOVER_BORDER,
} from '../styles/colors'
import {FONT_SIZE_M} from '../styles/typography'
import ClearSVG from './ClearSVG'
import {css, names} from 'linaria'
import React, {Component, type Node} from 'react'

export const ALIGN_LEFT: 'left' = 'left'
export const ALIGN_RIGHT: 'right' = 'right'

const ERRED_STYLE = css`
  border: 1px solid ${COLOR_INPUT_ERROR_BORDER};

  &:hover {
    &:enabled {
      &:read-write {
        &:not(:focus) {
          border: 1px solid ${COLOR_INPUT_ERROR_BORDER};
        }
      }
    }
  }
`

const NOT_ERRED_STYLE = css`
  border: 1px solid ${COLOR_INPUT_BORDER};

  &:hover {
    &:enabled {
      &:read-write {
        &:not(:focus) {
          border: 1px solid ${COLOR_INPUT_HOVER_BORDER};
        }
      }
    }
  }
`

type ALIGN = typeof ALIGN_LEFT | typeof ALIGN_RIGHT

// eslint-disable-next-line flowtype/require-exact-type
export type TextProps = {
  align?: ?ALIGN,
  className?: ?string,
  clearOffset?: ?number,
  disabled?: ?boolean,
  error?: ?boolean,
  inputRef?: (el: ?HTMLInputElement) => void,
  maxLength?: ?number,
  minLength?: ?number,
  onChange?: (value: ?string) => void,
  readOnly?: ?boolean,
  size?: ?number,
  value?: ?string,
}

type TextState = {|
  animatingClearButtonOut: boolean,
  focused: boolean,
  value?: ?string,
|}

export default class Text extends Component<TextProps, TextState> {
  constructor(props: TextProps) {
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
    const {clearOffset, disabled, readOnly} = this.props
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
          css`
            display: inline-block;
            fill: ${COLOR_GREY_6};
            height: 23px;
            position: absolute;
            top: 7px;
            width: 23px;

            &:focus {
              outline: none;
            }
          `,
          animatingClearButtonOut ? 'frost-fade-out' : 'frost-fade-in',
        )}
        onAnimationEnd={this._handleClearButtonAnimationEnd}
        onClick={this._handleClear}
        style={{
          right: isNaN(clearOffset) ? 5 : clearOffset,
        }}
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

  componentWillReceiveProps(nextProps: TextProps) {
    const {value} = nextProps

    if (this.props.value !== value) {
      this.setState({value})
    }
  }

  render(): Node {
    const {
      align,
      className,
      error,
      inputRef,
      minLength,
      onChange: _onChange,
      size,
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
          css`
            display: block;
            min-width: 175px;
            position: relative;
          `,
          className,
        )}
      >
        <input
          className={names(
            css`
              color: ${COLOR_INPUT};
              display: inline-block;
              font-size: ${FONT_SIZE_M};
              font-weight: 200px;
              height: 35px;
              outline: none;
              padding: 0 30px 0 8px;
              transition: border 0.2s ease;

              &:disabled {
                background-color: ${COLOR_INPUT_DISABLED_BG};
                border: 1px solid ${COLOR_INPUT_DISABLED_BORDER};
              }

              &:focus {
                border: 1px solid ${COLOR_INPUT_FOCUS_BORDER};
              }

              &:read-only {
                border: 0;
              }

              /**
               * Note: without this Firefox ends up applying the read-only pseudo selector
               * to number inputs which causes them not to get a border.
               */
              &[type='number'] {
                border: 1px solid ${COLOR_INPUT_BORDER};
              }
            `,
            showError ? ERRED_STYLE : NOT_ERRED_STYLE,
          )}
          minLength={minLength}
          onBlur={this._handleBlur}
          onChange={this._handleChange}
          onFocus={this._handleFocus}
          ref={inputRef}
          size={size}
          style={{
            textAlign: align,
            width: size ? 'auto' : '100%',
          }}
          value={value || ''}
          {...passThroughProps}
        />
        {this._renderClearButton()}
      </div>
    )
  }
}
