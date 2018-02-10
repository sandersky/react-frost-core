/**
 * @flow
 */

import Icon from './Icon'
import React, {Component, type Node} from 'react'

const DESIGNS = {
  INFO_BAR: 'info-bar',
  INLINE: 'inline',
}

const PRIORITIES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
}

const SIZES = {
  LARGE: 'large',
  MEDIUM: 'medium',
  SMALL: 'small',
}

export type DESIGN = $Values<typeof DESIGNS>
export type PRIORITY = $Values<typeof PRIORITIES>
export type SIZE = $Values<typeof SIZES>

export type PROPS = {|
  children?: ?Node,
  className?: string,
  design?: ?DESIGN,
  disabled?: ?boolean,
  href: string,
  icon?: ?string,
  onClick?: ?() => void,
  pack?: ?string,
  priority?: PRIORITY,
  size?: ?SIZE,
  text?: ?string,
|}

function getClassName(
  className?: ?string,
  design?: ?DESIGN,
  disabled?: ?boolean,
  priority?: ?PRIORITY,
  size?: ?SIZE,
): string {
  const classNames = ['frost-link']

  if (className) {
    classNames.push(className)
  }

  if (disabled) {
    classNames.push('disabled')
  }

  if (design) {
    classNames.push(design)

    if (priority || size) {
      throw new Error(
        'The "design" property takes precedence over "priority" and "size".',
      )
    }

    return classNames.join(' ')
  }

  if (priority) {
    classNames.push(priority)
  }

  if (size) {
    classNames.push(size)
  }

  return classNames.join(' ')
}

export default class Link extends Component<PROPS> {
  static DESIGNS = DESIGNS
  static PRIORITIES = PRIORITIES
  static SIZES = SIZES

  _handleClick = (e: SyntheticEvent<*>) => {
    const {disabled, onClick} = this.props

    if (disabled) {
      e.preventDefault()
    } else if (onClick) {
      onClick()
    }
  }

  _renderContent(): Node {
    const {children, design, icon, pack, priority, text} = this.props
    const childrenArePresent = Array.isArray(children) && !!children.length
    const content = childrenArePresent ? children : text

    if (childrenArePresent) {
      switch (design) {
        case DESIGNS.INFO_BAR:
          return (
            <div className="frost-link-content">
              <div className="frost-link-text">
                {icon ? (
                  <div className="frost-link-svg">
                    <Icon icon={icon} pack={pack} />
                  </div>
                ) : null}
                {children}
              </div>
            </div>
          )

        case DESIGNS.INLINE:
          return (
            <div className="frost-link-content frost-link-text">{children}</div>
          )
      }
    }

    switch (priority) {
      case PRIORITIES.PRIMARY:
        return (
          <div className="frost-link-content frost-link-text">
            {content}
            <div className="frost-link-svg">
              <Icon icon={Icon.ICONS.OPEN_TABS} pack={pack} />
            </div>
          </div>
        )

      case PRIORITIES.SECONDARY:
        return (
          <div className="frost-link-content">
            <div className="frost-link-text">{content}</div>
          </div>
        )

      default:
        return content
    }
  }

  render(): Node {
    const {className, design, disabled, href, priority, size} = this.props

    return (
      <a
        className={getClassName(className, design, disabled, priority, size)}
        href={href}
        onClick={this._handleClick}
      >
        {this._renderContent()}
      </a>
    )
  }
}
