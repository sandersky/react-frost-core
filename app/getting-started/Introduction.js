/**
 * @flow
 */

import t from 'grammatic'
import React, {type Node} from 'react'

const DESCRIPTION = t(
  'React components that implement <a href="http://ciena-frost.github.io/" target="_blank">Ciena\'s Frost UI library</a>.',
  'Project description.',
)

const DISCLAIMER = t(
  'Note: This project was developed outside of Ciena and is in no way affiliated with the company.',
  'Non-Ciena disclaimer.',
)

const TITLE = t('Introduction', 'Introduction title')

const Introduction = (): Node => {
  return (
    <div>
      <p dangerouslySetInnerHTML={{__html: DESCRIPTION}} />
      <p className="Disclaimer">{DISCLAIMER}</p>
    </div>
  )
}

Introduction.title = TITLE

export default Introduction
