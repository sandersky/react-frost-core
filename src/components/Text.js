/**
 * @flow
 */

/* global HTMLButtonElement, SyntheticInputEvent */

// $FlowFixMe - Flow doesn't understand SASS imports
import './Text.scss'
import React, {Component, type Node} from 'react'

export const ALIGN_LEFT: 'left' = 'left'
export const ALIGN_RIGHT: 'right' = 'right'

type Props = {
  align?: typeof ALIGN_LEFT | typeof ALIGN_RIGHT,
  disabled?: ?boolean,
  error?: ?boolean,
  onChange?: (value: ?string) => void,
  readOnly?: ?boolean,
  value?: ?string,
}

type State = {
  animatingClearButtonOut: boolean,
  value?: ?string,
}

const CLEAR_SVG = (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

export default class Text extends Component<Props, State> {
  _clearButtonElement: ?HTMLButtonElement
  _clearButtonAnimationEndHandler: ?() => void

  constructor() {
    super(...arguments)

    this.state = {
      animatingClearButtonOut: false,
      value: this.props.value,
    }
  }

  _clear = () => {
    this._updateValue('')
  }

  _handleChange = (e: SyntheticInputEvent<*>) => {
    this._updateValue(e.target.value)
  }

  _addClearButtonAnimationEndListener() {
    // If the clear button is present and it doesn't currently have an
    // animationend event listener, go ahead and add one.
    if (this._clearButtonElement && !this._clearButtonAnimationEndHandler) {
      this._clearButtonAnimationEndHandler = () => {
        const {value} = this.state

        // We don't want to do anything if this is the fade in animation.
        if (value) {
          return
        }

        this._removeClearButtonAnimationEndListener()
        this.setState({animatingClearButtonOut: false})
      }

      this._clearButtonElement.addEventListener(
        'animationend',
        this._clearButtonAnimationEndHandler,
      )
    }
  }

  _getClassName() {
    const {error} = this.props
    const classNames = ['frost-text']

    if (error) {
      classNames.push('frost-text-error')
    }

    return classNames.join(' ')
  }

  _getInputClassName() {
    const {align} = this.props
    const classNames = ['frost-text-input']

    switch (align) {
      case 'right':
        classNames.push('frost-text-align-right')
    }

    return classNames.join(' ')
  }

  _removeClearButtonAnimationEndListener() {
    // If the clear button is present and we have an event listener, make sure
    // to remove it.
    if (this._clearButtonElement && this._clearButtonAnimationEndHandler) {
      this._clearButtonElement.removeEventListener(
        'animationend',
        this._clearButtonAnimationEndHandler,
      )
    }

    this._clearButtonAnimationEndHandler = null
  }

  _renderClearButton(): Node {
    const {disabled, readOnly} = this.props
    const {animatingClearButtonOut, value} = this.state

    if (disabled || readOnly || (!animatingClearButtonOut && !value)) {
      return null
    }

    const classNames = [
      'frost-text-clear',
      animatingClearButtonOut ? 'frost-fade-out' : 'frost-fade-in',
    ]

    return (
      <button
        className={classNames.join(' ')}
        onClick={this._clear}
        ref={el => {
          this._clearButtonElement = el
        }}
      >
        {CLEAR_SVG}
      </button>
    )
  }

  _updateValue(nextValue: ?string) {
    const {onChange} = this.props
    const {value} = this.state

    if (nextValue === '') {
      nextValue = null
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

  componentDidMount() {
    this._addClearButtonAnimationEndListener()
  }

  componentDidUpdate() {
    this._addClearButtonAnimationEndListener()
  }

  componentWillUnmount() {
    this._removeClearButtonAnimationEndListener()
  }

  render(): Node {
    const {
      error: _error,
      onChange: _onChange,
      value: _value,
      ...passThroughProps
    } = this.props

    const {value} = this.state

    return (
      <div className={this._getClassName()}>
        <input
          className={this._getInputClassName()}
          onChange={this._handleChange}
          value={value || ''}
          {...passThroughProps}
        />
        {this._renderClearButton()}
      </div>
    )
  }
}
