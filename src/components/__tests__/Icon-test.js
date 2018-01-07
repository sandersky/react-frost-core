import Icon from '../Icon'
import {mount} from 'enzyme'
import React from 'react'

const TESTS = [
  {
    desc: 'when icon set',
    props: {icon: Icon.ICONS.ADD},
  },
  {
    desc: 'when className and icon set',
    props: {
      className: 'foobar',
      icon: Icon.ICONS.ADD,
    },
  },
  {
    desc: 'when icon and pack set',
    props: {
      icon: Icon.ICONS.ADD,
      pack: 'fire',
    },
  },
  {
    desc: 'when className, icon, and pack set',
    props: {
      className: 'foobar',
      icon: Icon.ICONS.ADD,
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

  it('has expected display name', () => {
    expect(Icon.displayName).toBe('Icon')
  })

  it('has expected icons', () => {
    expect(Icon.ICONS).toEqual({
      ADD: 'add',
      CHECKBOX: 'checkbox',
      CHECKBOX_CHECKED: 'checkbox-checked',
      CHECKBOX_DISABLED: 'checkbox-disabled',
      CHECKBOX_DISABLED_CHECKBOX: 'checkbox-disabled-checked',
      CHECKBOX_ERROR: 'checkbox-error',
      CHECKBOX_HOVER: 'checkbox-hover',
      CHECKBOX_HOVER_CHECKED: 'checkbox-hover-checked',
      CHEVRON: 'chevron',
      CHEVRON_DOUBLE: 'chevron-double',
      CLOSE: 'close',
      EMAIL: 'email',
      ERROR: 'error',
      EXPAND_COLLAPSE: 'expand-collapse',
      EXPORT: 'export',
      INFO: 'info',
      LOADING_RING: 'loading-ring',
      LOADING_RIPPLE: 'loading-ripple',
      MENU: 'menu',
      MORE: 'more',
      OPEN_TABS: 'open-tabs',
      PRINT: 'print',
      ROUND_ADD: 'round-add',
      ROUND_CLOSE: 'round-close',
      ROUND_REMOVE: 'round-remove',
      VIEW_LARGE: 'view-large',
      VIEW_MEDIUM: 'view-medium',
      VIEW_SMALL: 'view-small',
      WARNING: 'warning',
    })
  })
})
