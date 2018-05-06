/**
 * @flow
 */

import KEY_CODES from '../key-codes'
import styles from './Checkbox.css'
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

export type CheckboxProps = {|
  autoFocus?: ?boolean,
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

type CheckboxState = {|
  checked: boolean,
  id: string,
|}

function getClassName(
  checked?: ?boolean,
  disabled?: ?boolean,
  error?: ?boolean,
  size?: ?SIZE,
): string {
  const classNames = [styles.root]

  if (checked) {
    classNames.push(styles.checked)
  }

  if (disabled) {
    classNames.push(styles.disabled)
  }

  if (error) {
    classNames.push(styles.error)
  }

  if (size) {
    classNames.push(styles[size])
  }

  return classNames.join(' ')
}

let counter = 0

export default class Checkbox extends Component<CheckboxProps, CheckboxState> {
  static defaultProps = {
    falseValue: false,
    size: SIZES.SMALL,
    trueValue: true,
  }

  static SIZES = SIZES

  _el: ?HTMLDivElement

  constructor(props: CheckboxProps) {
    super(props)

    this.state = {
      checked: props.checked || false,
      id: `${PREFIX}-${counter}`,
    }

    // If we've reached the max possible number for the counter we'll start back at zero.
    // Most likely this will never happen but if an app were to be used long enough without
    // a hard refresh this is theoretically possible.
    if (counter === Number.MAX_SAFE_INTEGER) {
      counter = 0
    } else {
      counter++
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

  _handleMouseDown = (e: SyntheticEvent<*>) => {
    const {disabled} = this.props

    // Keep disabled checkbox from being focused
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
    const {autoFocus} = this.props

    if (this._el && autoFocus) {
      this._el.focus()
    }
  }

  componentWillReceiveProps(nextProps: CheckboxProps) {
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
      autoFocus,
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

    const {checked, id} = this.state
    const areChildrenPresent = Array.isArray(children) && !!children.length

    return (
      <div
        aria-checked={checked}
        className={getClassName(checked, disabled, error, size)}
        onBlur={this.props.onBlur}
        onKeyPress={this._handleKeyPress}
        onMouseDown={this._handleMouseDown}
        ref={(el: ?HTMLDivElement) => {
          this._el = el
        }}
        role="checkbox"
        tabIndex={disabled ? -1 : 0}
      >
        <label disabled={disabled} htmlFor={id}>
          <input
            checked={checked}
            disabled={disabled}
            id={id}
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
