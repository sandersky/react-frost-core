/**
 * @flow
 */

import Expand from './Expand'
import t from 'grammatic'
import React, {Component, type Node} from 'react'

export type AjaxErrorPageProps = {|
  description: string,
  errorCode: number,
  errorDetails: string,
  errorMessage: string,
  errorTitle: string,
  suggestion?: ?string,
|}

type AjaxErrorPageState = {|
  expanded: boolean,
|}

const COLLAPSED_LABEL = t('Show details', 'Label for toggle in collapsed state')
const EXPANDED_LABEL = t('Hide details', 'Label for toggle in expanded state')
const PREFIX = 'frost-ajax-error-page'

export default class AjaxErrorPage extends Component<
  AjaxErrorPageProps,
  AjaxErrorPageState,
> {
  state = {
    expanded: false,
  }

  _handleExpandChange = (expanded: boolean) => {
    this.setState({expanded})
  }

  render(): Node {
    const {
      description,
      errorCode,
      errorDetails,
      errorMessage,
      errorTitle,
      suggestion,
    } = this.props

    const {expanded} = this.state

    return (
      <div>
        <div className={`${PREFIX}-description`}>{description}</div>
        {suggestion ? (
          <div className={`${PREFIX}-suggestion`}>{suggestion}</div>
        ) : null}
        <div className={`${PREFIX}-http-error`}>
          Error {errorCode} - {errorTitle}
        </div>
        <div className={`${PREFIX}-message`}>{errorMessage}</div>
        <Expand
          className={`${PREFIX}-expand`}
          collapsedLabel={COLLAPSED_LABEL}
          expanded={expanded}
          expandedLabel={EXPANDED_LABEL}
          onChange={this._handleExpandChange}
        >
          <div className={`${PREFIX}-details`}>{errorDetails}</div>
        </Expand>
      </div>
    )
  }
}
