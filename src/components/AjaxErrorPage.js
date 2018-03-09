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
          // $FlowFixMe - babel-plugin-object-styles-to-template
          css({
            display: 'inline-block',
            fontFamily: FONT_FAMILY,
          }),
        )}
      >
        <div
          className={names(
            // $FlowFixMe - babel-plugin-object-styles-to-template
            css({
              color: COLOR_GREY_1,
              fontSize: FONT_SIZE_XXL,
              marginBottom: 10,
            }),
          )}
        >
          {description}
        </div>
        {suggestion ? (
          <div
            className={names(
              // $FlowFixMe - babel-plugin-object-styles-to-template
              css({
                color: COLOR_GREY_1,
                fontSize: FONT_SIZE_L,
                marginBottom: 15,
              }),
            )}
          >
            {suggestion}
          </div>
        ) : null}
        <div
          className={names(
            // $FlowFixMe - babel-plugin-object-styles-to-template
            css({
              color: COLOR_GREY_5,
              fontSize: FONT_SIZE_M,
              marginBottom: 5,
            }),
          )}
        >
          Error {errorCode} - {errorTitle}
        </div>
        <div
          className={names(
            // $FlowFixMe - babel-plugin-object-styles-to-template
            css({
              color: COLOR_GREY_6,
              fontSize: FONT_SIZE_S,
              marginBottom: 20,
            }),
          )}
        >
          {errorMessage}
        </div>
        <Expand
          className={names(
            // $FlowFixMe - babel-plugin-object-styles-to-template
            css({
              maxHeight: 400,
              width: 600,
            }),
          )}
          collapsedLabel={COLLAPSED_LABEL}
          expanded={expanded}
          expandedLabel={EXPANDED_LABEL}
          onChange={this._handleExpandChange}
        >
          <div
            className={names(
              // $FlowFixMe - babel-plugin-object-styles-to-template
              css({
                whiteSpace: 'pre-line',
              }),
            )}
          >
            {errorDetails}
          </div>
        </Expand>
      </div>
    )
  }
}
