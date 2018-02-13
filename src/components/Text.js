/**
 * @flow
 */

import ClearSVG from './ClearSVG'
import React, {Component, type Node} from 'react'

export const ALIGN_LEFT: 'left' = 'left'
export const ALIGN_RIGHT: 'right' = 'right'

const PREFIX = 'frost-text'

type ALIGN = typeof ALIGN_LEFT | typeof ALIGN_RIGHT

// eslint-disable-next-line flowtype/require-exact-type
export type PROPS = {
  align?: ?ALIGN,
  className?: ?string,
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

type State = {|
  animatingClearButtonOut: boolean,
  focused: boolean,
  value?: ?string,
|}

/**
 * Get class name for text component given it's current state
 * @param className - user specified class name
 * @param error - whether or not input has an error
 * @param minLength - minimum length input's value should be
 * @param size - size if input
 * @param value - input value
 * @returns class name for text component
 */
function getClassName(
  className?: ?string,
  error?: ?boolean,
  minLength?: ?number,
  size?: ?number,
  value?: ?string,
): string {
  const classNames = [PREFIX]

  if (className) {
    classNames.push(className)
  }

  if (size) {
    classNames.push(`${PREFIX}-size`)
  }

  if (
    error ||
    (typeof minLength === 'number' &&
      (typeof value !== 'string' || minLength > value.length))
  ) {
    classNames.push(`${PREFIX}-error`)
  }

  return classNames.join(' ')
}

/**
 * Get class name for text component's input
 * @param align - how to align text within input
 * @returns class name for text component's input
 */
function getInputClassName(align?: ?ALIGN): string {
  const classNames = [`${PREFIX}-input`]

  switch (align) {
    case ALIGN_RIGHT:
      classNames.push(`${PREFIX}-align-right`)
  }

  return classNames.join(' ')
}

export default class Text extends Component<PROPS, State> {
  constructor() {
    super(...arguments)

    this.state = {
      animatingClearButtonOut: false,
      focused: false,
      value: this.props.value,
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

    const classNames = [
      `${PREFIX}-clear`,
      animatingClearButtonOut ? 'frost-fade-out' : 'frost-fade-in',
    ]

    return (
      <button
        className={classNames.join(' ')}
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
      inputRef,
      minLength,
      onChange: _onChange,
      size,
      value: _value,
      ...passThroughProps
    } = this.props

    const {value} = this.state

    return (
      <div className={getClassName(className, error, minLength, size, value)}>
        <input
          className={getInputClassName(align)}
          minLength={minLength}
          onBlur={this._handleBlur}
          onChange={this._handleChange}
          onFocus={this._handleFocus}
          ref={inputRef}
          size={size}
          value={value || ''}
          {...passThroughProps}
        />
        {this._renderClearButton()}
      </div>
    )
  }
}
