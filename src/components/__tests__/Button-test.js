import Button from '../Button'
import Icon from '../Icon'
import {mount} from 'enzyme'
import React from 'react'

const TESTS = []

Object.keys(Button.PRIORITIES).forEach(priorityKey => {
  const priority = Button.PRIORITIES[priorityKey]

  Object.keys(Button.SIZES).forEach(sizeKey => {
    const size = Button.SIZES[sizeKey]

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
      run('with icon set', Object.assign({icon: Icon.ICONS.ADD}, props))
      run('with text set', Object.assign({text: 'foobar'}, props))
      run(
        'with text and icon set',
        Object.assign({icon: Icon.ICONS.ADD, text: 'foobar'}, props),
      )
    })
  })

  describe('when design property set', () => {
    it('throws an error if icon and text properties are missing', () => {
      expect(() => {
        mount(<Button design={Button.DESIGNS.APP_BAR} />)
      }).toThrowErrorMatchingSnapshot()
    })
  })

  it('functions as expected when priority is set alongside design', () => {
    expect(() => {
      mount(
        <Button
          design={Button.DESIGNS.APP_BAR}
          priority={Button.PRIORITIES.SECONDARY}
          text="foobar"
        />,
      )
    }).toThrowErrorMatchingSnapshot()
  })

  it('functions as expected when size is set alongside design', () => {
    expect(() => {
      mount(
        <Button
          design={Button.DESIGNS.APP_BAR}
          size={Button.SIZES.MEDIUM}
          text="foobar"
        />,
      )
    }).toThrowErrorMatchingSnapshot()
  })

  it('functions as expected when design is set with text', () => {
    expect(
      mount(<Button design={Button.DESIGNS.APP_BAR} text="foobar" />),
    ).toMatchSnapshot()
  })

  it('functions as expected when vertical is set to true', () => {
    expect(mount(<Button text="foobar" vertical={true} />)).toMatchSnapshot()
  })

  it('functions as expected when vertical is set to false', () => {
    expect(mount(<Button text="foobar" vertical={false} />)).toMatchSnapshot()
  })

  it('functions as expected when design is infoBar with icon', () => {
    expect(
      mount(<Button design={Button.DESIGNS.INFO_BAR} icon={Icon.ICONS.ADD} />),
    ).toMatchSnapshot()
  })

  it('functions as expected when design is infoBar with text', () => {
    expect(
      mount(<Button design={Button.DESIGNS.INFO_BAR} text="foobar" />),
    ).toMatchSnapshot()
  })

  it('functions as expected when design is inline with icon', () => {
    expect(
      mount(<Button design={Button.DESIGNS.INLINE} icon={Icon.ICONS.ADD} />),
    ).toMatchSnapshot()
  })

  it('functions as expected when design is inline with text', () => {
    expect(
      mount(<Button design={Button.DESIGNS.INLINE} text="foobar" />),
    ).toMatchSnapshot()
  })
})
