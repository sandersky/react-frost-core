/**
 * @flow
 */

// $FlowFixMe - Flow doesn't understand SASS imports
import './Icon.scss'
import React, {type Node} from 'react'

const DEFAULT_PACK = 'frost'

export const ICON_ADD: 'add' = 'add'
export const ICON_CHECKBOX: 'checkbox' = 'checkbox'
export const ICON_CHECKBOX_CHECKED: 'checkbox-checked' = 'checkbox-checked'
export const ICON_CHECKBOX_DISABLED: 'checkbox-disabled' = 'checkbox-disabled'
export const ICON_CHECKBOX_DISABLED_CHECKBOX: 'checkbox-disabled-checked' =
  'checkbox-disabled-checked'
export const ICON_CHECKBOX_ERROR: 'checkbox-error' = 'checkbox-error'
export const ICON_CHECKBOX_HOVER: 'checkbox-hover' = 'checkbox-hover'
export const ICON_CHECKBOX_HOVER_CHECKED: 'checkbox-hover-checked' =
  'checkbox-hover-checked'
export const ICON_CHEVRON: 'chevron' = 'chevron'
export const ICON_HEVRON_DOUBLE: 'chevron-double' = 'chevron-double'
export const ICON_CLOSE: 'close' = 'close'
export const ICON_EMAIL: 'email' = 'email'
export const ICON_ERROR: 'error' = 'error'
export const ICON_EXPAND_COLLAPSE: 'expand-collapse' = 'expand-collapse'
export const ICON_EXPORT: 'export' = 'export'
export const ICON_INFO: 'info' = 'info'
export const ICON_LOADING_RING: 'loading-ring' = 'loading-ring'
export const ICON_LOADING_RIPPLE: 'loading-ripple' = 'loading-ripple'
export const ICON_MENU: 'menu' = 'menu'
export const ICON_MORE: 'more' = 'more'
export const ICON_OPEN_TABS: 'open-tabs' = 'open-tabs'
export const ICON_PRINT: 'print' = 'print'
export const ICON_ROUND_ADD: 'round-add' = 'round-add'
export const ICON_ROUND_CLOSE: 'round-close' = 'round-close'
export const ICON_ROUND_REMOVE: 'round-remove' = 'round-remove'
export const ICON_VIEW_LARGE: 'view-large' = 'view-large'
export const ICON_VIEW_MEDIUM: 'view-medium' = 'view-medium'
export const ICON_VIEW_SMALL: 'view-small' = 'view-small'
export const ICON_WARNING: 'warning' = 'warning'

export type PROPS = {
  className?: string,
  icon: string,
  pack?: ?string,
}

export default ({className, icon, pack, ...passThroughProps}: PROPS): Node => {
  pack = pack || DEFAULT_PACK

  const classNames = [`frost-icon-${pack}-${icon}`]

  if (className) {
    classNames.push(className)
  }

  return (
    <svg className={classNames.join(' ')} {...passThroughProps}>
      <use xlinkHref={`${pack}-pack.svg#sprite-${icon}`} />
    </svg>
  )
}
