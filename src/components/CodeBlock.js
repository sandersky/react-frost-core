/**
 * @flow
 */

/* global HTMLElement */

import styles from './CodeBlock'
import Expand from './Expand'
import React, {Component, type Node} from 'react'

export type CodeBlockProps = {|
  children?: Node,
  code?: string,
  demo?: boolean,
  language: 'bash' | 'css' | 'js' | 'jsx',
  maxLineLength?: number,
  togglable?: boolean,
|}

type CodeBlockState = {|
  expanded: boolean,
|}

/**
 * Get code demo to render for code block component
 * @param children - children to render
 * @param demo - whether or not to render a demo
 * @returns code demo for code block component
 */
function renderCodeDemo(children?: Node, demo?: boolean): Node {
  if (demo === false) {
    return null
  }

  return <div className={styles.demo}>{children}</div>
}

export default class CodeBlock extends Component<
  CodeBlockProps,
  CodeBlockState,
> {
  _codeElement: ?HTMLElement

  state = {
    expanded: false,
  }

  _handleCodeToggle = () => {
    const {expanded} = this.state

    this.setState(
      {
        expanded: !expanded,
      },
      () => {
        this._highlightCode()
      },
    )
  }

  _highlightCode() {
    if (this._codeElement) {
      window.Prism.highlightElement(this._codeElement, false)
    }
  }

  _renderCodeSample(): Node {
    const {code, language, togglable} = this.props
    const {expanded} = this.state

    if (!code || (!expanded && togglable !== false)) {
      return null
    }

    return [
      <div className={styles.language} key="language">
        {language}
      </div>,
      <pre className={`language-${language}`} key="code">
        <code
          className={`language-${language}`}
          ref={(el: ?HTMLElement) => {
            this._codeElement = el
          }}
        >
          {code.replace(/\\n/g, '\n')}
        </code>
      </pre>,
    ]
  }

  _renderCodeToggle(): Node {
    const {code, togglable} = this.props
    const {expanded} = this.state

    if (!code || togglable === false) {
      return null
    }

    return (
      <Expand
        className={styles.expand}
        collapsedLabel="Show code"
        expandedLabel="Hide code"
        expanded={expanded}
        onChange={this._handleCodeToggle}
      >
        {this._renderCodeSample()}
      </Expand>
    )
  }

  componentDidMount() {
    this._highlightCode()
  }

  render(): Node {
    const {children, demo, togglable} = this.props

    return (
      <div className={styles.root}>
        {renderCodeDemo(children, demo)}
        {togglable !== false
          ? this._renderCodeToggle()
          : this._renderCodeSample()}
      </div>
    )
  }
}
