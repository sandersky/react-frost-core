import Text from '../Text'
import {mount} from 'enzyme'
import React from 'react'

describe('Text', () => {
  it('renders as expected without any properties passed in', () => {
    expect(mount(<Text />)).toMatchSnapshot()
  })
})
