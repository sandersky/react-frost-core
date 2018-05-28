/**
 * @flow
 */

import KEY_CODES from '../key-codes'
import {trimLongDataInElement} from '../utils'
import Button from './Button'
import Checkbox from './Checkbox'
import Text from './Text'
import t from 'grammatic'
import React, {Component, type Node as ReactNode} from 'react'
import {DOMListener} from 'react-domlistener'

export type Item = {|
  className?: ?string,
  label: string,
  secondaryLabels?: ?Array<string>,
  value: *,
|}

type SelectDropdownProps = {|
  element: ?HTMLElement,
  filter?: ?string,
  id: string,
  items: Array<Item>,
  multiselect: boolean,
  onClose: () => void,
  onFilterInput: (value: ?string) => void,
  onSelect: (Array<*>) => void,
  selectedItems: Array<Item>,
  wrapLabels: boolean,
|}

type SelectDropdownState = {|
  arrowNav: boolean,
  bottom: number | 'auto',
  dropdownClassName: string,
  dropdownSecondaryLabelsTextClassName: string,
  dropdownTextClassName: string,
  focusedIndex: number,
  left: number,
  maxHeight: number,
  prevMultiselect: boolean,
  prevWrapLabels: boolean,
  top: number | 'auto',
  width: number,
|}

const ARROW_HEIGHT = 12
const ARROW_WIDTH = 25
const BORDER_HEIGHT = 1
const CLEAR_ALL_LABEL = t('Clear all', 'Clear all label')
const NO_FILTERED_ITEMS_LABEL = t(
  'No items match your filter.',
  'No filtered items label',
)
const NO_ITEMS_LABEL = t('No items.', 'No items label')
const PREFIX = 'frost-select'
const WINDOW_SPACE = 20

/**
 * Get the class name for the select dropdown
 * @param wrapLabels - whether or not select option text should wrap
 * @returns the class name for the select dropdown
 */
function getDropdownClassName(wrapLabels: boolean): string {
  const classNames = [`${PREFIX}-dropdown`]

  if (wrapLabels) {
    classNames.push(`${PREFIX}-dropdown-wrap-labels`)
  }

  return classNames.join(' ')
}

/**
 * Get the class name for the select dropdown options
 * @param multiselect - whether or not this is a multiselect
 * @returns the class name for the select dropdown options
 */
function getDropdownTextClassName(multiselect: boolean): string {
  const classNames = [`${PREFIX}-list-item-text`]

  if (multiselect) {
    classNames.push('frost-multi-select-list-item-text')
  }

  return classNames.join(' ')
}

/**
 * Get the class name for the select dropdown secondary options
 * @param multiselect - whether or not this is a multiselect
 * @returns the class name for the select dropdown secondary options
 */
function getDropdownSecondaryLabelsTextClassName(multiselect: boolean): string {
  const classNames = [`${PREFIX}-list-secondary-item-text`]

  if (multiselect) {
    classNames.push('frost-multi-select-list-secondary-item-text')
  }

  return classNames.join(' ')
}

/**
 * Get the class name for a particular item in the select dropdown
 * @param item - item to get class name for
 * @param isFocused - whether or not this item is currently focused
 * @param isSelected - whether or not this item is currently selected
 * @returns the class name for a particular item in the select dropdown
 */
function getItemClassName(
  item: Item,
  isFocused: boolean,
  isSelected: boolean,
): string {
  const classNames = [`${PREFIX}-list-item`]

  if (item.secondaryLabels && item.secondaryLabels.length) {
    classNames.push(`${PREFIX}-list-secondary-item`)
  }

  if (isSelected) {
    classNames.push(`${PREFIX}-list-item-selected`)
  }

  if (isFocused) {
    classNames.push(`${PREFIX}-list-item-focused`)
  }

  return classNames.join(' ')
}

/**
 * Get item's index in list
 * @param target - target element
 * @returns item's index
 */
function getItemIndex(target: *): ?number {
  if (target instanceof Node) {
    let child: Node = target
    let index = 0

    while (child) {
      const next: ?Node = child.previousSibling

      if (next) {
        index += 1
        child = next
      } else {
        break
      }
    }

    return index
  }

  return null
}

export default class SelectDropdown extends Component<
  SelectDropdownProps,
  SelectDropdownState,
> {
  _textInput: ?HTMLInputElement
  _ul: ?HTMLUListElement

  /* eslint-disable flowtype/no-weak-types */
  static getDerviedStateFromProps(
    nextProps: SelectDropdownProps,
    prevState: SelectDropdownState,
  ): ?Object {
    /* eslint-enable flowtype/no-weak-types */
    const {multiselect, wrapLabels} = nextProps
    const {prevMultiselect, prevWrapLabels} = prevState

    if (prevMultiselect !== multiselect || prevWrapLabels !== wrapLabels) {
      return {
        dropdownClassName: getDropdownClassName(wrapLabels),
        dropdownSecondaryLabelsTextClassName: getDropdownSecondaryLabelsTextClassName(
          multiselect,
        ),
        dropdownTextClassName: getDropdownTextClassName(multiselect),
        prevMultiselect,
        prevWrapLabels,
      }
    }

    return null
  }

  constructor(props: SelectDropdownProps) {
    super(props)

    const {multiselect, wrapLabels} = props

    this.state = {
      arrowNav: false,
      bottom: 0,
      dropdownClassName: getDropdownClassName(wrapLabels),
      dropdownSecondaryLabelsTextClassName: getDropdownSecondaryLabelsTextClassName(
        multiselect,
      ),
      dropdownTextClassName: getDropdownTextClassName(multiselect),
      focusedIndex: 0,
      left: 0,
      maxHeight: 0,
      prevMultiselect: multiselect,
      prevWrapLabels: wrapLabels,
      top: 0,
      width: 0,
    }
  }

  /**
   * Bind event listeners to items in dropdown
   * @param ul - dropdown list element
   */
  _addListItemEventListeners = (ul: HTMLUListElement) => {
    const listItems = ul.querySelectorAll('li')

    Array.from(listItems).forEach((listItem: HTMLElement) => {
      listItem.addEventListener('mousedown', this._handleItemMouseDown)
      listItem.addEventListener('mouseenter', this._handleItemMouseEnter)
    })
  }

  _getElementDimensionsAndPosition(element: HTMLElement): * {
    const {document, pageXOffset, pageYOffset} = window
    const {documentElement} = document
    const rect = element.getBoundingClientRect()
    const {height, width} = rect
    const top = rect.top + pageYOffset - documentElement.clientTop

    return {
      center: {
        x: height / 2 + top,
      },
      height,
      left: rect.left + pageXOffset - documentElement.clientLeft,
      top,
      width,
    }
  }

  _handleArrowKey(upArrow: boolean) {
    const {items} = this.props
    const {focusedIndex} = this.state

    const newFocusedIndex = upArrow
      ? Math.max(0, focusedIndex - 1)
      : Math.min(items.length - 1, focusedIndex + 1)

    if (
      this._ul &&
      newFocusedIndex !== undefined &&
      newFocusedIndex !== focusedIndex
    ) {
      const newFocusedListItem: ?Node = this._ul.childNodes[newFocusedIndex]

      this.setState({
        arrowNav: true,
        focusedIndex: newFocusedIndex,
      })

      if (newFocusedListItem instanceof HTMLLIElement) {
        if (newFocusedIndex === 0) {
          // $FlowFixMe
          this._ul.scrollTop = 0
          // $FlowFixMe
        } else if (newFocusedListItem.scrollIntoViewIfNeeded) {
          // $FlowFixMe
          newFocusedListItem.scrollIntoViewIfNeeded(false)
        } else {
          newFocusedListItem.scrollIntoView(upArrow)
        }
      }
    }
  }

  _handleClear = () => {
    this.props.onSelect([])

    // Focus is now on clear all button so we need to put focus back on the
    // filter text input
    if (this._textInput) {
      this._textInput.focus()
    }
  }

  _handleEnterKey() {
    const {items} = this.props
    const {focusedIndex} = this.state
    this._selectItem(items[focusedIndex])
  }

  _handleItemMouseDown = ({currentTarget}: Event) => {
    const {items} = this.props
    const index: ?number = getItemIndex(currentTarget)

    // $FlowFixMe
    if (!isNaN(index) && items.length >= index) {
      // $FlowFixMe
      this.setState({focusedIndex: index})
      // $FlowFixMe
      this._selectItem(items[index])
    }
  }

  _handleItemMouseEnter = ({currentTarget}: Event) => {
    const index: ?number = getItemIndex(currentTarget)

    if (!isNaN(index)) {
      // $FlowFixMe
      this.setState({focusedIndex: index})
    }
  }

  _handleKeyDown = (e: KeyboardEvent) => {
    const {onClose} = this.props
    const {arrowNav} = this.state

    if ([KEY_CODES.DOWN_ARROW, KEY_CODES.UP_ARROW].indexOf(e.keyCode) !== -1) {
      e.preventDefault() // Keep arrow keys from scrolling document
      this._handleArrowKey(e.keyCode === KEY_CODES.UP_ARROW)
    }

    switch (e.keyCode) {
      case KEY_CODES.ENTER:
        this._handleEnterKey()
        return

      case KEY_CODES.ESCAPE:
      case KEY_CODES.TAB:
        onClose()
        return

      default: {
        if (arrowNav) {
          this.setState({arrowNav: false})
        }
      }
    }
  }

  _handleKeyUp = (e: KeyboardEvent) => {
    const {onFilterInput} = this.props

    if (![KEY_CODES.DOWN_ARROW, KEY_CODES.UP_ARROW].indexOf(e.keyCode) !== -1) {
      const {target} = e

      if (target instanceof HTMLInputElement) {
        onFilterInput(target.value)
      }
    }
  }

  _handleMouseDown = (e: SyntheticMouseEvent<*>) => {
    // This keeps the overlay from swallowing clicks on the clear button
    e.preventDefault()
  }

  /**
   * Get necessary property values for positioning dropdown above select
   * @param {Number} top - top position of select
   * @returns {Object} property values
   */
  _positionAboveInput(top: number): * {
    const bottom =
      window.innerHeight -
      top +
      window.pageYOffset +
      ARROW_HEIGHT +
      BORDER_HEIGHT

    const maxHeight = window.innerHeight - bottom - WINDOW_SPACE

    if (bottom === this.state.bottom && maxHeight === this.state.maxHeight) {
      return {}
    }

    return {
      bottom,
      maxHeight,
      top: 'auto',
    }
  }

  /**
   * Get necessary property values for positioning dropdown below select
   * @param {Number} height - height of select
   * @param {Number} top - top position of select
   * @returns {Object} property values
   */
  _positionBelowInput(height: number, top: number): * {
    // Make sure dropdown is rendered below input and we leave space for arrow
    // that connects dropdown to input
    top = top + height + ARROW_HEIGHT + BORDER_HEIGHT - window.pageYOffset

    const maxHeight = window.innerHeight - top - WINDOW_SPACE

    if (top === this.state.top && maxHeight === this.state.maxHeight) {
      return {}
    }

    return {
      bottom: 'auto',
      maxHeight,
      top,
    }
  }

  /**
   * Unbind event listeners to items in dropdown
   * @param ul - dropdown list element
   */
  _removeListItemEventListeners = (ul: HTMLUListElement) => {
    const listItems = ul.querySelectorAll('li')

    Array.from(listItems).forEach((listItem: HTMLElement) => {
      listItem.removeEventListener('mousedown', this._handleItemMouseDown)
      listItem.removeEventListener('mouseenter', this._handleItemMouseEnter)
    })
  }

  _renderItem = (item: Item, index: number): ReactNode => {
    const {id, multiselect, selectedItems} = this.props

    const {
      dropdownSecondaryLabelsTextClassName,
      dropdownTextClassName,
      focusedIndex,
    } = this.state

    const isSelected = !!selectedItems.find(
      (selectedItem: Item): boolean => selectedItem.value === item.value,
    )

    const secondaryText = item.secondaryLabels
      ? item.secondaryLabels.join(' | ')
      : ''

    const listItemProps = {}

    if (isSelected) {
      listItemProps['aria-activedescendant'] = `${id}-focused-item`
    }

    return (
      <li
        className={getItemClassName(item, index === focusedIndex, isSelected)}
        key={item.value}
        {...listItemProps}
      >
        {multiselect ? (
          <Checkbox checked={isSelected} size={Checkbox.SIZES.MEDIUM} />
        ) : null}
        {item.secondaryLabels && item.secondaryLabels.length ? (
          <div className={`${PREFIX}-list-item-container`}>
            <div className={dropdownTextClassName} data-text={item.label}>
              {item.label}
            </div>
            <div
              className={dropdownSecondaryLabelsTextClassName}
              data-text={secondaryText}
            >
              {secondaryText}
            </div>
          </div>
        ) : (
          <div className={dropdownTextClassName} data-text={item.label}>
            {item.label}
          </div>
        )}
      </li>
    )
  }

  _selectItem(item: Item) {
    const {multiselect, onSelect, selectedItems} = this.props

    if (!multiselect) {
      onSelect([item])
      return
    }

    const match = selectedItems.find(
      (i: Item): boolean => i.value === item.value,
    )

    const index = selectedItems.indexOf(match)

    if (index === -1) {
      onSelect(selectedItems.concat([item]))
    } else {
      onSelect(
        selectedItems.slice(0, index).concat(selectedItems.slice(index + 1)),
      )
    }

    // When multiselect the checkbox for selected item gets focus so we need
    // to put focus back on filter text input
    if (this._textInput) {
      this._textInput.focus()
    }
  }

  _updatePosition = () => {
    const {element} = this.props

    if (element) {
      const {
        center,
        height,
        left,
        top,
        width,
      } = this._getElementDimensionsAndPosition(element)

      const windowCenterX = window.innerHeight / 2 + window.pageYOffset

      const state =
        center.x > windowCenterX
          ? this._positionAboveInput(top)
          : this._positionBelowInput(height, top)

      if (left !== this.state.left) {
        state.left = left
      }

      if (width !== this.state.width) {
        state.width = width
      }

      this.setState(state)
    }
  }

  _updateText() {
    const {filter, wrapLabels} = this.props

    if (this._ul) {
      const ul: HTMLUListElement = this._ul
      const clonedUl: HTMLUListElement = ul.cloneNode(true)
      const clonedTextElements = clonedUl.querySelectorAll(
        `.${PREFIX}-list-item-text`,
      )
      const textElements = ul.querySelectorAll(`.${PREFIX}-list-item-text`)
      const clonedSecondaryTextElements = clonedUl.querySelectorAll(
        `.${PREFIX}-list-secondary-item-text`,
      )
      const secondaryTextElements = ul.querySelectorAll(
        `.${PREFIX}-list-secondary-item-text`,
      )
      const scrollTop = ul.scrollTop
      const updateText = (
        texElements: NodeList<HTMLElement>,
        clonedTextElements: NodeList<HTMLElement>,
      ) => {
        Array.from(texElements).forEach(
          (textElement: HTMLElement, index: number) => {
            if (!wrapLabels) {
              const clonedTextElement = clonedTextElements[index]
              const updatedData = trimLongDataInElement(clonedTextElement)

              if (updatedData) {
                textElement.textContent = updatedData.text
                textElement.setAttribute('title', updatedData.tooltip)
              }
            }

            if (filter) {
              const pattern = new RegExp(
                filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
                'gi',
              )
              const textWithMatch = textElement.textContent.replace(
                pattern,
                '<u>$&</u>',
              )

              // If rendered text has changed, update it
              if (textElement.innerHTML !== textWithMatch) {
                textElement.innerHTML = textWithMatch
              }
            }
          },
        )
      }

      this._removeListItemEventListeners(ul)
      ul.replaceWith(clonedUl)

      updateText(textElements, clonedTextElements)
      updateText(secondaryTextElements, clonedSecondaryTextElements)

      clonedUl.replaceWith(ul)
      this._addListItemEventListeners(ul)

      // Make sure we scroll back to where the user was
      ul.scrollTop = scrollTop
    }
  }

  componentDidMount() {
    // Focus on filter
    if (this._textInput) {
      this._textInput.focus()
    }

    this._updatePosition()
    this._updateText()
  }

  componentDidUpdate() {
    this._updateText()
  }

  render(): ReactNode {
    const {filter, id, items, multiselect, onClose, selectedItems} = this.props

    const {
      arrowNav,
      bottom,
      dropdownClassName,
      left,
      maxHeight,
      top,
      width,
    } = this.state

    // eslint-disable-next-line flowtype/no-weak-types
    const arrowStyle: Object = {left: left + (width - ARROW_WIDTH) / 2}

    if (bottom === 'auto') {
      if (top === 'auto') {
        throw new Error('Expected top to be a number when bottom is "auto"')
      } else {
        arrowStyle.top = top - ARROW_HEIGHT + BORDER_HEIGHT
      }
    } else {
      arrowStyle.bottom = bottom - ARROW_HEIGHT + BORDER_HEIGHT
    }

    // TODO: i18n
    const selectedText = `${selectedItems.length} selected`

    return (
      <div
        className={`${PREFIX}-dropdown-wrapper`}
        id={`${id}-dropdown-container`}
      >
        <DOMListener
          listener={this._updatePosition}
          target={document}
          type="scroll"
        />
        <DOMListener
          listener={this._updatePosition}
          target={window}
          type="resize"
        />
        <div className={`${PREFIX}-overlay`} onClick={onClose} role="none" />
        <div
          className={
            top === 'auto'
              ? `${PREFIX}-down-arrow-shadow`
              : `${PREFIX}-up-arrow-shadow`
          }
          style={arrowStyle}
        />
        <div
          className={
            top === 'auto' ? `${PREFIX}-down-arrow` : `${PREFIX}-up-arrow`
          }
          style={arrowStyle}
        />
        <div
          className={dropdownClassName}
          onMouseDown={this._handleMouseDown}
          role="none"
          style={{bottom, left, maxHeight, top, width}}
        >
          <Text
            aria-activedescendant={arrowNav ? `${id}-focused-item` : null}
            aria-autocomplete="list"
            aria-controls={id}
            inputRef={(el: ?HTMLInputElement) => {
              this._textInput = el
            }}
            onKeyDown={this._handleKeyDown}
            onKeyUp={this._handleKeyUp}
            role="combobox"
            value={filter}
          />
          {multiselect ? (
            <div className="multi-status">
              <span className="number-selected">{selectedText}</span>
              <Button
                className={`${PREFIX}-clear`}
                onClick={this._handleClear}
                priority={Button.PRIORITIES.TERTIARY}
                text={CLEAR_ALL_LABEL}
              />
            </div>
          ) : null}
          <ul
            id={id}
            ref={(el: ?HTMLUListElement) => {
              this._ul = el
            }}
            role="listbox"
          >
            {items.length === 0 ? (
              <div className={`${PREFIX}-dropdown-empty-msg`}>
                {filter ? NO_FILTERED_ITEMS_LABEL : NO_ITEMS_LABEL}
              </div>
            ) : (
              items.map(this._renderItem)
            )}
          </ul>
        </div>
      </div>
    )
  }
}
