/**
 * @flow
 */

import Icon from './Icon'
import t from 'grammatic'
import React, {Component, type Node} from 'react'

const DEFAULT_COLLAPSED_LABEL = t(
  'Expand',
  'Label for toggle in collapsed state',
)
const DEFAULT_EXPANDED_LABEL = t(
  'Collapse',
  'Label for toggle in expanded state',
)
const PREFIX = 'frost-expand'

export type ExpandProps = {|
  children?: Node,
  className?: string,
  collapsedLabel?: string,
  expanded?: boolean,
  expandedLabel?: string,
  onChange?: (expanded: boolean) => void,
|}

export type ExpandState = {|
  expanded: boolean,
  id: string,
|}

/**
 * Get content to render in expand component given current state
 * @param children - children to render when expanded
 * @param expanded - whether or not component is expanded
 * @param id - unique identifier
 * @returns content to render in expand component
 */
function renderContent(children?: Node, expanded: boolean, id: string): Node {
  // TODO: wrap div in scroll component
  return expanded ? (
    <div className={`${PREFIX}-content`} id={id} role="region" tabIndex={-1}>
      {children}
    </div>
  ) : null
}

/**
 * Get label to render given expand component's current state
 * @param collapsedLabel - label to render when component is collapsed
 * @param expanded - whether or not component is expanded
 * @param expandedLabel - label to render when component is expanded
 * @returns label to render given component's current state
 */
function renderLabelText(
  collapsedLabel?: string,
  expanded: boolean,
  expandedLabel?: string,
): Node {
  const text = expanded
    ? expandedLabel || DEFAULT_EXPANDED_LABEL
    : collapsedLabel || DEFAULT_COLLAPSED_LABEL

  return <div className={`${PREFIX}-label-text`}>{text}</div>
}

let counter = 0

export default class Expand extends Component<ExpandProps, ExpandState> {
  constructor() {
    super(...arguments)

    // If consumer is managing expanded state, ie prop is set, then use that
    // for the initial internal state, otherwise start with component collapsed.
    const expanded = this.props.expanded || false

    this.state = {
      expanded,
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

  _handleToggle = () => {
    const {onChange} = this.props
    const {expanded} = this.state

    // Update state.
    this.setState({
      expanded: !expanded,
    })

    // Notify consumer of changed state if they are listening for changes.
    if (onChange) {
      onChange(!expanded)
    }
  }

  componentWillReceiveProps(nextProps: ExpandProps) {
    const {expanded: expandedProp} = nextProps
    const {expanded} = this.state

    // If consumer is managing expanded state, ie prop is set, then only
    // update state if incoming expanded state differs from current internal
    // state.
    if (expandedProp !== undefined && expandedProp !== expanded) {
      this.setState({
        expanded: expandedProp,
      })
    }
  }

  render(): Node {
    const {children, className, collapsedLabel, expandedLabel} = this.props
    const {expanded, id} = this.state
    const classNames = [PREFIX, expanded ? 'expanded' : 'collapsed']

    if (className) {
      classNames.push(className)
    }

    return (
      <div className={classNames.join(' ')}>
        <button
          aria-controls={id}
          aria-expanded={expanded}
          className={`${PREFIX}-label`}
          onClick={this._handleToggle}
        >
          <Icon icon="chevron" />
          {renderLabelText(collapsedLabel, expanded, expandedLabel)}
        </button>
        {renderContent(children, expanded, id)}
      </div>
    )
  }
}
