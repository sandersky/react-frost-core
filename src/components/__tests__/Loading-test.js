import Loading from '../Loading'
import {mount} from 'enzyme'
import React from 'react'

describe('Loading', () => {
  it('functions as expected when type is not set', () => {
    expect(mount(<Loading />)).toMatchSnapshot()
  })

  it('functions as expected when type is null', () => {
    expect(mount(<Loading type={null} />)).toMatchSnapshot()
  })

  it('functions as expected when type is ring', () => {
    expect(mount(<Loading type={Loading.TYPES.RING} />)).toMatchSnapshot()
  })

  it('functions as expected when type is ripple', () => {
    expect(mount(<Loading type={Loading.TYPES.RIPPLE} />)).toMatchSnapshot()
  })
})
