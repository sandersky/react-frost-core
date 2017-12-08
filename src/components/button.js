/**
 * @flow
 */

// $FlowFixMe - Flow doesn't understand SASS imports
import './Button.scss'
import Icon from './Icon'
import React, {type Node} from 'react'

export const DESIGN_APP_BAR: 'app-bar' = 'app-bar'
export const DESIGN_INFO_BAR: 'info-bar' = 'info-bar'
export const DESIGN_INLINE: 'in-line' = 'in-line'
export const DESIGN_TAB: 'tab' = 'tab'

export const PRIORITY_CANCEL: 'cancel' = 'cancel'
export const PRIORITY_CONFIRM: 'confirm' = 'confirm'
export const PRIORITY_NORMAL: 'normal' = 'normal'
export const PRIORITY_PRIMARY: 'primary' = 'primary'
export const PRIORITY_SECONDARY: 'secondary' = 'secondary'
export const PRIORITY_TERTIARY: 'tertiary' = 'tertiary'

export const SIZE_LARGE: 'large' = 'large'
export const SIZE_MEDIUM: 'medium' = 'medium'
export const SIZE_SMALL: 'small' = 'small'

export type DESIGN =
  | typeof DESIGN_APP_BAR
  | typeof DESIGN_INFO_BAR
  | typeof DESIGN_INLINE
  | typeof DESIGN_TAB

export type PRIORITY =
  | typeof PRIORITY_CANCEL
  | typeof PRIORITY_CONFIRM
  | typeof PRIORITY_NORMAL
  | typeof PRIORITY_PRIMARY
  | typeof PRIORITY_SECONDARY
  | typeof PRIORITY_TERTIARY

export type SIZE = typeof SIZE_LARGE | typeof SIZE_MEDIUM | typeof SIZE_SMALL

export type PROPS = {
  children?: Node,
  className?: string,
  design?: ?DESIGN,
  disabled?: ?boolean,
  icon?: ?string,
  pack?: ?string,
  priority?: ?PRIORITY,
  size?: ?SIZE,
  text?: ?string,
  vertical?: ?boolean,
}

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
  const classNames = ['frost-button']

  if (className) {
    classNames.push(className)
  }

  if (disabled) {
    classNames.push('disabled')
  }

  if (design) {
    classNames.push(design)

    if (!text && !icon) {
      throw new Error(
        'The "design" property requires the "icon" or "text" property to be set.',
      )
    }

    if (priority || size) {
      console.warn(
        'Warning: The "design" property takes precedence over "priority" and "size".',
      )
    }

    return classNames.join(' ')
  }

  if (size) {
    classNames.push(size)
  }

  const priorityClassName = getPriorityClassName(priority)

  if (priorityClassName) {
    classNames.push(priorityClassName)
  }

  if (vertical) {
    classNames.push('vertical')
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
    case DESIGN_INFO_BAR:
      return (
        <div className="content">
          <div className="text">
            <div className="svg">
              {icon ? <Icon icon={icon} pack={pack} /> : null}
            </div>
            <div className="text">{text}</div>
          </div>
        </div>
      )

    case DESIGN_INLINE:
      return <div className="text">{text}</div>

    default: {
      if (icon && text) {
        return (
          <div className="icon-text text">
            <div className="icon">
              <Icon icon={icon} pack={pack} />
            </div>
            <div className="text">{text}</div>
          </div>
        )
      }

      if (icon) {
        return (
          <div className="icon">
            <Icon icon={icon} pack={pack} />
          </div>
        )
      }

      if (text) {
        return <div className="text">{text}</div>
      }

      return null
    }
  }
}

export default (props: PROPS): Node => {
  const {
    children,
    className,
    design,
    disabled,
    icon,
    pack,
    priority,
    size,
    text,
    vertical,
    ...passThroughProps
  } = props

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
      {...passThroughProps}
    >
      {renderButtonContents(design, icon, pack, text)}
      {children}
    </button>
  )
}
