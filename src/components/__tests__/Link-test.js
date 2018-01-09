import Link from '../Link'
import Icon from '../Icon'
import {mount} from 'enzyme'
import React from 'react'

const TESTS = []

Object.keys(Link.PRIORITIES).forEach(priorityKey => {
  const priority = Link.PRIORITIES[priorityKey]

  Object.keys(Link.SIZES).forEach(sizeKey => {
    const size = Link.SIZES[sizeKey]

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
    describe('when className set', () => {
      test(desc, Object.assign({className: 'baz', props}))
    })

    describe('when className not set', () => {
      test(desc, props)
    })
  })

  describe('when onClick set', () => {
    describe('when className set', () => {
      test(
        desc,
        Object.assign(
          {
            className: 'baz',
            onClick: jest.fn(),
          },
          props,
        ),
      )
    })

    describe('when className not set', () => {
      test(desc, Object.assign({onClick: jest.fn()}, props))
    })
  })
}

function test(desc, props) {
  describe(desc, () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(<Link {...props} />)
    })

    it('functions as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    describe('when pressed', () => {
      beforeEach(() => {
        wrapper.find('a').simulate('click')
      })

      it('functions as expected', () => {
        expect(wrapper).toMatchSnapshot()
      })
    })
  })
}

describe('Link', () => {
  TESTS.forEach(({desc, props}) => {
    describe(desc, () => {
      run('with icon set', Object.assign({icon: Icon.ICONS.ADD}, props))
      run('with text set', Object.assign({text: 'foobar'}, props))
      run(
        'with text and icon set',
        Object.assign({icon: Icon.ICONS.ADD, text: 'foobar'}, props),
      )
    })
  })

  it('functions as expected when priority is set alongside design', () => {
    expect(() => {
      mount(
        <Link
          design={Link.DESIGNS.INFO_BAR}
          priority={Link.PRIORITIES.SECONDARY}
          text="foobar"
        />,
      )
    }).toThrowErrorMatchingSnapshot()
  })

  it('functions as expected when size is set alongside design', () => {
    expect(() => {
      mount(
        <Link
          design={Link.DESIGNS.INFO_BAR}
          size={Link.SIZES.MEDIUM}
          text="foobar"
        />,
      )
    }).toThrowErrorMatchingSnapshot()
  })

  it('functions as expected when design is set with text', () => {
    expect(
      mount(<Link design={Link.DESIGNS.INFO_BAR} text="foobar" />),
    ).toMatchSnapshot()
  })

  it('functions as expected when design is info-bar with icon', () => {
    expect(
      mount(<Link design={Link.DESIGNS.INFO_BAR} icon={Icon.ICONS.ADD} />),
    ).toMatchSnapshot()
  })

  it('functions as expected when design is info-bar with text', () => {
    expect(
      mount(<Link design={Link.DESIGNS.INFO_BAR} text="foobar" />),
    ).toMatchSnapshot()
  })

  it('functions as expected when design is inline with icon', () => {
    expect(
      mount(<Link design={Link.DESIGNS.INLINE} icon={Icon.ICONS.ADD} />),
    ).toMatchSnapshot()
  })

  it('functions as expected when design is inline with text', () => {
    expect(
      mount(<Link design={Link.DESIGNS.INLINE} text="foobar" />),
    ).toMatchSnapshot()
  })
})
