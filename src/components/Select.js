/**
 * @flow
 */

import KEY_CODES from '../key-codes'
import SelectDropdown, {type Item} from './SelectDropdown'
import React, {Component, type Node} from 'react'
import {createPortal} from 'react-dom'

const PREFIX = 'frost-select'

export type SelectProps = {|
  autoFocus?: ?boolean,
  className?: ?string,
  data: ?Array<Item>,
  disabled?: ?boolean,
  domNode?: ?Element,
  error?: ?boolean,
  label: string,
  multiselect?: ?boolean,
  onBlur?: () => void,
  onChange?: ?(value: Array<Item>) => void,
  onClick?: (e: SyntheticEvent<*>) => void,
  onFocus?: () => void,
  onInput?: (value: ?string) => void,
  placeholder?: ?string,
  width?: ?number,
  wrapLabels?: ?boolean,
|}

type SelectState = {|
  filter: string,
  focused: boolean,
  id: string,
  opened: boolean,
  selectedItems: Array<Item>,
|}

/**
 * Get accessibility label for select input
 * @param label - label
 * @param opened - whether or not select dropdown is open
 * @returns accessibility label for select input
 */
function getAriaLabel(label: string, opened: boolean): string {
  // TODO: add i18n support
  const verb = opened ? 'Hide' : 'Show'

  if (label) {
    return `${verb} ${label} combobox`
  }

  return `${verb} combobox`
}

/**
 * Get class name for select component given it's current state
 * @param className - user specified class name
 * @param disabled - whether or not select input is disabled
 * @param error - whether or not select input has an error
 * @param focused - whether or not select is focused
 * @param opened - whether or not select dropdown is open
 * @param text - current select input label
 * @returns class name for select component
 */
function getClassName(
  className?: ?string,
  disabled?: ?boolean,
  error?: ?boolean,
  focused: boolean,
  opened: boolean,
  text?: ?string,
): string {
  const classNames = [PREFIX]

  if (className) {
    classNames.push(className)
  }

  if (disabled) {
    classNames.push(`${PREFIX}-disabled`)
  }

  if (error) {
    classNames.push(`${PREFIX}-error`)
  }

  if (focused) {
    classNames.push(`${PREFIX}-focused`)
  }

  if (opened) {
    classNames.push(`${PREFIX}-opened`)
  }

  if (!text) {
    classNames.push(`${PREFIX}-placeholder`)
  }

  return classNames.join(' ')
}

function getItemsFromData(
  data: ?Array<Item>,
  filter: string,
  onInput: ?(value: string) => void,
): Array<Item> {
  if (!data) {
    return []
  }

  if (onInput) {
    return data
  }

  const normalizedFilter: string = filter.toLowerCase()

  return data.filter((item: Item): boolean => {
    if (!normalizedFilter) {
      return true
    }

    const label = item.label || ''
    const secondaryLabels = item.secondaryLabels || []

    if (label.toLowerCase().indexOf(normalizedFilter) !== -1) {
      return true
    }

    const filteredSecondaryLabels = secondaryLabels.filter(
      (secondaryLabel: string): boolean => {
        return secondaryLabel.toLowerCase().indexOf(normalizedFilter) !== -1
      },
    )

    return filteredSecondaryLabels.length > 0
  })
}

/**
 * Get label for select input
 * @param selectedItems - currently selected items
 * @returns label for select input
 */
function getText(selectedItems: Array<Item>): ?string {
  switch (selectedItems.length) {
    case 0:
      return null

    case 1:
      return selectedItems[0].label

    case 2:
      return `${selectedItems[0].label}, ${selectedItems[1].label}`
  }

  return `${selectedItems.length} items selected`
}

let counter = 0

export default class Select extends Component<SelectProps, SelectState> {
  _el: ?HTMLDivElement

  constructor(props: SelectProps) {
    super(props)

    const filter = ''

    this.state = {
      filter,
      id: `${PREFIX}-${counter}`,
      focused: false,
      opened: false,
      selectedItems: [],
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

  _handleBlur = () => {
    // We must use setTimeout so filter text input has time to focus when select
    // dropdown is being opened
    setTimeout(() => {
      // TODO: check if component has been destroyed and if so abort immediately

      const focusedElement = document.querySelector(':focus')

      if (focusedElement) {
        let element = focusedElement.parentElement

        while (element) {
          if (element.classList.contains(`${PREFIX}-dropdown`)) {
            return
          }

          element = element.parentElement
        }
      }

      const state = {}

      if (this.state.focused) {
        state.focused = false
      }

      if (this.state.opened) {
        state.filter = ''
        state.opened = false
      }

      if (Object.keys(state).length) {
        this.setState(state)

        const {onBlur} = this.props

        if (onBlur && this.state.focused) {
          onBlur()
        }
      }
    }, 1)
  }

  _handleClick = (e: SyntheticEvent<*>) => {
    // $FlowFixMe
    let element: HTMLElement = e.target

    while (element) {
      if (element.classList.contains(`${PREFIX}-dropdown-wrapper`)) {
        return
      }

      element = element.parentElement
    }

    if (!this.props.disabled) {
      this.setState({opened: !this.state.opened})

      const {onClick} = this.props

      if (onClick) {
        onClick(e)
      }
    }
  }

  _handleDropdownClose = () => {
    this.setState({
      filter: '',
      opened: false,
    })

    // We need to make sure focus goes back to select since it is on the filter
    // text input while the dropdown is open
    if (this._el) {
      this._el.focus()
    }
  }

  _handleDropdownFilterInput = (value: ?string) => {
    const {onInput} = this.props

    if (onInput) {
      onInput(value) // TODO: debounce
    } else {
      this.setState({filter: value || ''})
    }
  }

  _handleDropdownSelect = (selectedItems: Array<Item>) => {
    const {multiselect, onChange} = this.props

    // eslint-disable-next-line flowtype/no-weak-types
    const state: any = {
      opened: multiselect,
      selectedItems,
    }

    if (!multiselect) {
      state.filter = ''
    }

    this.setState(state)

    if (onChange) {
      onChange(selectedItems)
    }

    // We need to make sure focus goes back to select since it is on the filter
    // text input while the dropdown is open
    if (this._el) {
      this._el.focus()
    }
  }

  _handleFocus = () => {
    if (!this.state.focused) {
      this.setState({focused: true})

      const {onFocus} = this.props

      if (onFocus) {
        onFocus()
      }
    }
  }

  _handleKeyDown = (e: SyntheticKeyboardEvent<*>) => {
    if (
      [KEY_CODES.DOWN_ARROW, KEY_CODES.UP_ARROW].includes(e.which) &&
      !this.state.opened
    ) {
      e.preventDefault() // Keep up/down arrow from scrolling page
      e.stopPropagation()
      this.setState({opened: true})
    }
  }

  _handleKeyPress = (e: SyntheticKeyboardEvent<*>) => {
    if (e.target === this._el && e.which === KEY_CODES.SPACE) {
      e.preventDefault() // Keep space from scrolling page
      e.stopPropagation()
      this.setState({opened: !this.state.opened})
    }
  }

  _renderItems(): Node {
    const {data, multiselect, onInput, wrapLabels} = this.props
    const {filter, id, selectedItems} = this.state

    if (!this.state.opened) {
      return null
    }

    return (
      <SelectDropdown
        element={this._el}
        filter={filter}
        id={id}
        items={getItemsFromData(data, filter, onInput)}
        multiselect={multiselect || false}
        onClose={this._handleDropdownClose}
        onFilterInput={this._handleDropdownFilterInput}
        onSelect={this._handleDropdownSelect}
        selectedItems={selectedItems}
        wrapLabels={wrapLabels || false}
      />
    )
  }

  componentDidMount() {
    // If autofocus and nothing else has focus, focus on select
    if (this.props.autoFocus && this._el && !document.querySelector(':focus')) {
      this._el.focus()
    }
  }

  render(): Node {
    const {
      className,
      disabled,
      domNode,
      error,
      label,
      placeholder,
      width,
    } = this.props

    const {focused, id, opened, selectedItems} = this.state
    const text = getText(selectedItems)
    const items = this._renderItems()

    return (
      <div
        aria-controls={`${id}-dropdown-container`}
        aria-expanded={opened}
        aria-haspopup="listbox"
        aria-label={getAriaLabel(label, opened)}
        aria-owns={opened ? id : null}
        className={getClassName(
          className,
          disabled,
          error,
          focused,
          opened,
          text,
        )}
        onBlur={this._handleBlur}
        onClick={this._handleClick}
        onFocus={this._handleFocus}
        onKeyDown={this._handleKeyDown}
        onKeyPress={this._handleKeyPress}
        ref={(el: ?HTMLDivElement) => {
          this._el = el
        }}
        role="combobox"
        style={width ? {maxWidth: 'initial', minWidth: 'initial', width} : null}
        tabIndex={disabled ? -1 : 0}
      >
        <span className="frost-select-text">{text || placeholder}</span>
        <svg viewBox="0 0 15 15">
          <polygon points="7.5,11.4 1.1,5 2.5,3.6 7.5,8.6 12.5,3.6 13.9,5" />
        </svg>
        {domNode ? createPortal(items, domNode) : items}
      </div>
    )
  }
}
