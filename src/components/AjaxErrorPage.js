/**
 * @flow
 */

import {COLOR_GREY_1, COLOR_GREY_5, COLOR_GREY_6} from '../styles/colors'
import {
  FONT_FAMILY,
  FONT_SIZE_L,
  FONT_SIZE_M,
  FONT_SIZE_S,
  FONT_SIZE_XXL,
} from '../styles/typography'
import Expand from './Expand'
import t from 'grammatic'
import {css, names} from 'linaria'
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
      <div
        className={names(
          css`
            display: inline-block;
            font-family: ${FONT_FAMILY};
          `,
        )}
      >
        <div
          className={names(
            css`
              color: ${COLOR_GREY_1};
              font-size: ${FONT_SIZE_XXL};
              margin-bottom: 10px;
            `,
          )}
        >
          {description}
        </div>
        {suggestion ? (
          <div
            className={names(
              css`
                color: ${COLOR_GREY_1};
                font-size: ${FONT_SIZE_L};
                margin-bottom: 15px;
              `,
            )}
          >
            {suggestion}
          </div>
        ) : null}
        <div
          className={names(
            css`
              color: ${COLOR_GREY_5};
              font-size: ${FONT_SIZE_M};
              margin-bottom: 5px;
            `,
          )}
        >
          Error {errorCode} - {errorTitle}
        </div>
        <div
          className={names(
            css`
              color: ${COLOR_GREY_6};
              font-size: ${FONT_SIZE_S};
              margin-bottom: 20px;
            `,
          )}
        >
          {errorMessage}
        </div>
        <Expand
          className={names(
            css`
              max-height: 400px;
              width: 600px;
            `,
          )}
          collapsedLabel={COLLAPSED_LABEL}
          expanded={expanded}
          expandedLabel={EXPANDED_LABEL}
          onChange={this._handleExpandChange}
        >
          <div
            className={names(
              css`
                white-space: pre-line;
              `,
            )}
          >
            {errorDetails}
          </div>
        </Expand>
      </div>
    )
  }
}
