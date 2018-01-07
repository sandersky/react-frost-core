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
  'Label for toggle in collapsed state',
)

export type PROPS = {
  children?: Node,
  className?: string,
  collapsedLabel?: string,
  expanded?: boolean,
  expandedLabel?: string,
  onChange?: (expanded: boolean) => void,
}

export type State = {|
  expanded: boolean,
|}

/**
 * Get content to render in expand component given current state
 * @param children - children to render when expanded
 * @param expanded - whether or not component is expanded
 * @returns content to render in expand component
 */
function renderContent(children?: Node, expanded: boolean): Node {
  // TODO: wrap div in scroll component
  return expanded ? (
    <div className="frost-expand-content">{children}</div>
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

  return <div className="frost-expand-label-text">{text}</div>
}

export default class Expand extends Component<PROPS, State> {
  constructor() {
    super(...arguments)

    // If consumer is managing expanded state, ie prop is set, then use that
    // for the initial internal state, otherwise start with component collapsed.
    const expanded = this.props.expanded || false

    this.state = {
      expanded,
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

  componentWillReceiveProps(nextProps: PROPS) {
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
    const {expanded} = this.state
    const classNames = ['frost-expand', expanded ? 'expanded' : 'collapsed']

    if (className) {
      classNames.push(className)
    }

    return (
      <div className={classNames.join(' ')}>
        <label
          className="frost-expand-label"
          onClick={this._handleToggle}
          role="button"
        >
          <Icon icon="chevron" />
          {renderLabelText(collapsedLabel, expanded, expandedLabel)}
        </label>
        {renderContent(children, expanded)}
      </div>
    )
  }
}
