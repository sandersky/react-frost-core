/**
 * @flow
 */

/* global $Values */

import styles from './Button.css'
import Icon from './Icon'
import React, {Component, type Node} from 'react'

const DESIGNS = {
  APP_BAR: 'appBar',
  INFO_BAR: 'infoBar',
  INLINE: 'inLine',
  TAB: 'tab',
}

const PRIORITIES = {
  CANCEL: 'cancel',
  CONFIRM: 'confirm',
  NORMAL: 'normal',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
}

const SIZES = {
  LARGE: 'large',
  MEDIUM: 'medium',
  SMALL: 'small',
}

export type DESIGN = $Values<typeof DESIGNS>
export type PRIORITY = $Values<typeof PRIORITIES>
export type SIZE = $Values<typeof SIZES>

export type ButtonProps = {|
  children?: Node,
  className?: string,
  design?: ?DESIGN,
  disabled?: ?boolean,
  icon?: ?string,
  onClick?: () => void,
  pack?: ?string,
  priority?: ?PRIORITY,
  size?: ?SIZE,
  text?: ?string,
  vertical?: ?boolean,
|}

/**
 * Get class name for button given it's current state
 * @param design - button design
 * @param icon - button icon
 * @param priority - button priority
 * @param size - button size
 * @param text - button text
 * @param vertical - whether or not icon is above text
 * @returns class name for button
 */
function getClassName(
  className?: string,
  design?: ?DESIGN,
  disabled?: ?boolean,
  icon?: ?string,
  priority?: ?PRIORITY,
  size?: ?SIZE,
  text?: ?string,
  vertical?: ?boolean,
): string {
  const classNames = [styles.root]

  if (className) {
    classNames.push(className)
  }

  if (disabled) {
    classNames.push(styles.disabled)
  }

  if (design) {
    classNames.push(styles[design])

    if (!text && !icon) {
      throw new Error(
        'The "design" property requires the "icon" or "text" property to be set.',
      )
    }

    if (priority || size) {
      throw new Error(
        'The "design" property takes precedence over "priority" and "size".',
      )
    }

    return classNames.join(' ')
  }

  if (size) {
    classNames.push(styles[size])
  }

  const priorityClassName = getPriorityClassName(priority)

  if (priorityClassName) {
    classNames.push(styles[priorityClassName])
  }

  if (vertical) {
    classNames.push(styles.vertical)
  }

  return classNames.join(' ')
}

/**
 * Get the appropriate class name for the a given priority
 * @param priority - the priority to get class name for
 * @returns priority class name
 */
function getPriorityClassName(priority?: ?PRIORITY): ?string {
  switch (priority) {
    case 'confirm':
    case 'primary':
      return 'primary'

    case 'normal':
    case 'secondary':
      return 'secondary'

    case 'cancel':
    case 'tertiary':
      return 'tertiary'

    default:
      return null
  }
}

/**
 * Get contents to render in button given button's current state
 * @param design - button design
 * @param icon - button icon
 * @param pack - button icon pack
 * @param text - button text
 * @returns contents to render in button
 */
function renderButtonContents(
  design?: ?DESIGN,
  icon?: ?string,
  pack?: ?string,
  text?: ?string,
): Node {
  switch (design) {
    case DESIGNS.INFO_BAR:
      return (
        <div className={styles.content}>
          <div className={styles.text}>
            <div className={styles.svg}>
              {icon ? (
                <Icon className={styles.icon} icon={icon} pack={pack} />
              ) : null}
            </div>
            <div className={styles.text}>{text}</div>
          </div>
        </div>
      )

    case DESIGNS.INLINE:
      return <div className={styles.text}>{text}</div>

    default: {
      if (icon && text) {
        return (
          <div className={`${styles.iconText} {styles.text}`}>
            <div className={styles.icon}>
              <Icon className={styles.icon} icon={icon} pack={pack} />
            </div>
            <div className={styles.text}>{text}</div>
          </div>
        )
      }

      if (icon) {
        return (
          <div className={styles.icon}>
            <Icon className={styles.icon} icon={icon} pack={pack} />
          </div>
        )
      }

      if (text) {
        return <div className={styles.text}>{text}</div>
      }

      return null
    }
  }
}

class Button extends Component<ButtonProps> {
  static DESIGNS = DESIGNS
  static PRIORITIES = PRIORITIES
  static SIZES = SIZES

  _handleClick = () => {
    const {onClick} = this.props

    if (onClick) {
      onClick()
    }
  }

  render(): Node {
    const {
      children,
      className,
      design,
      disabled,
      icon,
      onClick: _onClick,
      pack,
      priority,
      size,
      text,
      vertical,
      ...passThroughProps
    } = this.props

    return (
      <button
        className={getClassName(
          className,
          design,
          disabled,
          icon,
          priority,
          size,
          text,
          vertical,
        )}
        disabled={disabled}
        onClick={this._handleClick}
        {...passThroughProps}
      >
        {renderButtonContents(design, icon, pack, text)}
        {children}
      </button>
    )
  }
}

export default Button
