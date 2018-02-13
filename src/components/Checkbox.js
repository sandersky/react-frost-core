/**
 * @flow
 */

import KEY_CODES from '../key-codes'
import React, {Component, type Node} from 'react'

const PREFIX = 'frost-checkbox'

const SIZES = {
  LARGE: 'large',
  MEDIUM: 'medium',
  SMALL: 'small',
}

const SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="3 2 31 31">
    <rect
      xmlns="http://www.w3.org/2000/svg"
      x="10.7"
      y="15.3"
      transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 35.6974 26.188)"
      fill="%23009EEF"
      width="3.5"
      height="10.3"
    />
    <polygon
      xmlns="http://www.w3.org/2000/svg"
      fill="%23009EEF"
      points="14.9,25.4 12.4,22.9 26.2,9.4 28.7,12.1"
    />
  </svg>
)

export type SIZE = $Values<typeof SIZES>

export type PROPS = {|
  autofocus?: ?boolean,
  checked?: ?boolean,
  children?: Node,
  disabled?: ?boolean,
  error?: ?boolean,
  falseValue: any, // eslint-disable-line
  id?: ?string,
  label?: ?string,
  onBlur?: ?() => void,
  onChange?: ?({id?: ?string, value: any}) => void, // eslint-disable-line
  size?: ?SIZE,
  trueValue?: any, // eslint-disable-line
|}

type State = {|
  checked: boolean,
|}

function getClassName(
  checked?: ?boolean,
  disabled?: ?boolean,
  error?: ?boolean,
  size?: ?SIZE,
): string {
  const classNames = [PREFIX]

  if (checked) {
    classNames.push(`${PREFIX}-checked`)
  }

  if (disabled) {
    classNames.push(`${PREFIX}-disabled`)
  }

  if (error) {
    classNames.push(`${PREFIX}-error`)
  }

  if (size) {
    classNames.push(`${PREFIX}-${size}`)
  }

  return classNames.join(' ')
}

export default class Checkbox extends Component<PROPS, State> {
  static defaultProps = {
    falseValue: false,
    size: SIZES.SMALL,
    trueValue: true,
  }

  static SIZES = SIZES

  _label: ?HTMLLabelElement

  constructor(props: PROPS) {
    super(props)

    this.state = {
      checked: props.checked || false,
    }
  }

  _handleInputChange = ({target}: SyntheticEvent<*>) => {
    // $FlowFixMe
    const {checked} = target
    const {disabled} = this.props

    if (disabled) {
      return
    }

    this._setChecked(checked)
  }

  _handleKeyPress = (e: SyntheticKeyboardEvent<*>) => {
    if (e.which === KEY_CODES.SPACE) {
      const {disabled} = this.props
      const {checked} = this.state

      if (!disabled) {
        this._setChecked(!checked)
      }

      e.preventDefault()
      e.stopPropagation()
    }
  }

  _handleLabelMouseDown = (e: SyntheticEvent<*>) => {
    const {disabled} = this.props

    // Keep disabled checkbox label from being focused
    if (disabled) {
      e.preventDefault()
    }
  }

  _setChecked(checked: boolean) {
    const {falseValue, id, onChange, trueValue} = this.props

    this.setState({checked})

    if (onChange) {
      onChange({
        id,
        value: checked ? trueValue : falseValue,
      })
    }
  }

  componentDidMount() {
    const {autofocus} = this.props

    if (this._label && autofocus) {
      this._label.focus()
    }
  }

  componentWillReceiveProps(nextProps: PROPS) {
    const {checked} = this.state

    if (
      typeof nextProps.checked === 'boolean' &&
      nextProps.checked !== checked
    ) {
      this.setState({checked: nextProps.checked})
    }
  }

  render(): Node {
    const {
      autofocus,
      checked: _checked,
      children,
      disabled,
      error,
      falseValue,
      label,
      onBlur,
      onChange,
      size,
      trueValue,
      ...passedThroughProps
    } = this.props

    const {checked} = this.state
    const areChildrenPresent = Array.isArray(children) && !!children.length

    return (
      <div
        className={getClassName(checked, disabled, error, size)}
        onKeyPress={this._handleKeyPress}
      >
        <label
          disabled={disabled}
          onBlur={this.props.onBlur}
          onMouseDown={this._handleLabelMouseDown}
          ref={(el: ?HTMLLabelElement) => {
            this._label = el
          }}
          tabIndex={disabled ? -1 : 0}
        >
          <input
            checked={checked}
            disabled={disabled}
            onChange={this._handleInputChange}
            type="checkbox"
            {...passedThroughProps}
          />
          {areChildrenPresent ? children : label}
          {SVG}
        </label>
      </div>
    )
  }
}
