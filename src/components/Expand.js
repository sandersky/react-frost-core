/**
 * @flow
 */

import Icon from './Icon'
import React, {Component, type Node} from 'react'

const DEFAULT_COLLAPSED_LABEL = 'Expand'
const DEFAULT_EXPANDED_LABEL = 'Collapse'

export type Props = {
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

export default class Expand extends Component<Props, State> {
  constructor() {
    super(...arguments)

    // If consumer is managing expanded state, ie prop is set, then use that
    // for the initial internal state, otherwise start with component collapsed.
    const expanded = this.props.expanded || false

    this.state = {
      expanded,
    }
  }

  _renderContent(): Node {
    const {children} = this.props
    const {expanded} = this.state

    // TODO: wrap div in scroll component
    return expanded ? (
      <div className="frost-expand-content">{children}</div>
    ) : null
  }

  _renderLabelIcon(): Node {
    return <Icon icon="chevron" />
  }

  _renderLabelText(): Node {
    const {collapsedLabel, expandedLabel} = this.props
    const {expanded} = this.state
    const text = expanded
      ? expandedLabel || DEFAULT_EXPANDED_LABEL
      : collapsedLabel || DEFAULT_COLLAPSED_LABEL

    return <div className="frost-expand-label-text">{text}</div>
  }

  _toggle = (): void => {
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

  componentWillReceiveProps(nextProps: Props): void {
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
    const {className} = this.props
    const {expanded} = this.state
    const classNames = ['frost-expand', expanded ? 'expanded' : 'collapsed']

    if (className) {
      classNames.push(className)
    }

    return (
      <div className={classNames.join(' ')}>
        <label
          className="frost-expand-label"
          onClick={this._toggle}
          role="button"
        >
          {this._renderLabelIcon()}
          {this._renderLabelText()}
        </label>
        {this._renderContent()}
      </div>
    )
  }
}
