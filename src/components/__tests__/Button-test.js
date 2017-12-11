import Button, {
  DESIGN_APP_BAR,
  PRIORITY_CANCEL,
  PRIORITY_CONFIRM,
  PRIORITY_NORMAL,
  PRIORITY_PRIMARY,
  PRIORITY_SECONDARY,
  PRIORITY_TERTIARY,
  SIZE_LARGE,
  SIZE_MEDIUM,
  SIZE_SMALL,
} from '../Button'
import {ICON_ADD} from '../Icon'
import {mount} from 'enzyme'
import React from 'react'

const PRIORITIES = [
  PRIORITY_CANCEL,
  PRIORITY_CONFIRM,
  PRIORITY_NORMAL,
  PRIORITY_PRIMARY,
  PRIORITY_SECONDARY,
  PRIORITY_TERTIARY,
]

const SIZES = [SIZE_LARGE, SIZE_MEDIUM, SIZE_SMALL]

const TESTS = []

PRIORITIES.forEach(priority => {
  SIZES.forEach(size => {
    TESTS.push(
      {
        desc: `when ${size} ${priority} button`,
        props: {priority, size},
      },
      {
        desc: `when ${size} ${priority} disabled button`,
        props: {
          disabled: true,
          priority,
          size,
        },
      },
      {
        desc: `when ${size} ${priority} explicitly enabled button`,
        props: {
          disabled: false,
          priority,
          size,
        },
      },
    )
  })
})

function run(desc, props) {
  describe('when onClick not set', () => {
    test(desc, props)
  })

  describe('when onClick set', () => {
    test(desc, Object.assign({onClick: jest.fn()}, props))
  })
}

function test(desc, props) {
  describe(desc, () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(<Button {...props} />)
    })

    it('functions as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    describe('when pressed', () => {
      beforeEach(() => {
        wrapper.find('button').simulate('click')
      })

      it('functions as expected', () => {
        expect(wrapper).toMatchSnapshot()
      })
    })
  })
}

describe('Button', () => {
  TESTS.forEach(({desc, props}) => {
    describe(desc, () => {
      run('with icon set', Object.assign({icon: ICON_ADD}, props))
      run('with text set', Object.assign({text: 'foobar'}, props))
      run(
        'with text and icon set',
        Object.assign({icon: ICON_ADD, text: 'foobar'}, props),
      )
    })
  })

  describe('when design property set', () => {
    it('throws an error if icon and text properties are missing', () => {
      expect(() => {
        mount(<Button design={DESIGN_APP_BAR} />)
      }).toThrowErrorMatchingSnapshot()
    })
  })
})
