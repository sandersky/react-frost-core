/**
 * @flow
 */

/* global HTMLElement */

import {
  COLOR_LIGHT_GREY_2,
  COLOR_NIGHT_2,
  COLOR_NIGHT_3,
} from '../styles/colors'
import Expand from './Expand'
import {css, names} from 'linaria'
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

  return (
    <div
      className={names(
        css`
          border: 1px solid ${COLOR_LIGHT_GREY_2};
          padding: 6;
        `,
      )}
    >
      {children}
    </div>
  )
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
      <div
        className={names(
          css`
            background-color: ${COLOR_NIGHT_3};
            color: ${COLOR_NIGHT_2};
            padding: 6px;
          `,
        )}
        key="language"
      >
        {language}
      </div>,
      <pre
        className={names(
          `language-${language}`,
          css`
            margin-top: 0;
          `,
        )}
        key="code"
      >
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
        className={names(
          css`
            margin-top: 10px;
          `,
        )}
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
      <div className="frost-code-block">
        {renderCodeDemo(children, demo)}
        {togglable !== false
          ? this._renderCodeToggle()
          : this._renderCodeSample()}
      </div>
    )
  }
}
