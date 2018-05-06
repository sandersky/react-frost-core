/**
 * @flow
 */

import styles from './AjaxErrorPage.css'
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
        <div className={styles.description}>{description}</div>
        {suggestion ? (
          <div className={styles.suggestion}>{suggestion}</div>
        ) : null}
        <div className={styles.httpError}>
          Error {errorCode} - {errorTitle}
        </div>
        <div className={styles.message}>{errorMessage}</div>
        <Expand
          className={styles.expand}
          collapsedLabel={COLLAPSED_LABEL}
          expanded={expanded}
          expandedLabel={EXPANDED_LABEL}
          onChange={this._handleExpandChange}
        >
          <div className={styles.details}>{errorDetails}</div>
        </Expand>
      </div>
    )
  }
}
