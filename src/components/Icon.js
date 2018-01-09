/**
 * @flow
 */

import React, {type Node} from 'react'

export const DEFAULT_PACK = 'frost'

export type PROPS = {
  className?: string,
  icon: string,
  pack?: ?string,
}

const Icon = ({className, icon, pack, ...passThroughProps}: PROPS): Node => {
  pack = pack || DEFAULT_PACK

  const classNames = ['frost-icon', `frost-icon-${pack}-${icon}`]

  if (className) {
    classNames.push(className)
  }

  return (
    <svg className={classNames.join(' ')} {...passThroughProps}>
      <use xlinkHref={`${pack}-pack.svg#sprite-${icon}`} />
    </svg>
  )
}

Icon.displayName = 'Icon'

Icon.ICONS = {
  ADD: 'add',
  CHECKBOX: 'checkbox',
  CHECKBOX_CHECKED: 'checkbox-checked',
  CHECKBOX_DISABLED: 'checkbox-disabled',
  CHECKBOX_DISABLED_CHECKBOX: 'checkbox-disabled-checked',
  CHECKBOX_ERROR: 'checkbox-error',
  CHECKBOX_HOVER: 'checkbox-hover',
  CHECKBOX_HOVER_CHECKED: 'checkbox-hover-checked',
  CHEVRON: 'chevron',
  CHEVRON_DOUBLE: 'chevron-double',
  CLOSE: 'close',
  EMAIL: 'email',
  ERROR: 'error',
  EXPAND_COLLAPSE: 'expand-collapse',
  EXPORT: 'export',
  INFO: 'info',
  LOADING_RING: 'loading-ring',
  LOADING_RIPPLE: 'loading-ripple',
  MENU: 'menu',
  MORE: 'more',
  OPEN_TABS: 'open-tabs',
  PRINT: 'print',
  ROUND_ADD: 'round-add',
  ROUND_CLOSE: 'round-close',
  ROUND_REMOVE: 'round-remove',
  VIEW_LARGE: 'view-large',
  VIEW_MEDIUM: 'view-medium',
  VIEW_SMALL: 'view-small',
  WARNING: 'warning',
}

export default Icon
