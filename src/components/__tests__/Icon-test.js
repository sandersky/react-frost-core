import Icon, {ICON_ADD} from '../Icon'
import {mount} from 'enzyme'
import React from 'react'

const TESTS = [
  {
    desc: 'when icon set',
    props: {icon: ICON_ADD},
  },
  {
    desc: 'when className and icon set',
    props: {
      className: 'foobar',
      icon: ICON_ADD,
    },
  },
  {
    desc: 'when icon and pack set',
    props: {
      icon: ICON_ADD,
      pack: 'fire',
    },
  },
  {
    desc: 'when className, icon, and pack set',
    props: {
      className: 'foobar',
      icon: ICON_ADD,
      pack: 'fire',
    },
  },
]

describe('Icon', () => {
  TESTS.forEach(({desc, props}) => {
    describe(desc, () => {
      let wrapper

      beforeEach(() => {
        wrapper = mount(<Icon {...props} />)
      })

      it('functions as expected', () => {
        expect(wrapper).toMatchSnapshot()
      })
    })
  })
})
