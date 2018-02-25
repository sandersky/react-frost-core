import Loading from '../Loading'
import {mount} from 'enzyme'
import React from 'react'

describe('Loading', () => {
  describe('when type is not set', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(<Loading />)
    })

    it('functions as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    describe('when type is set to null', () => {
      beforeEach(() => {
        wrapper.setProps({type: null})
      })

      it('functions as expected', () => {
        expect(wrapper).toMatchSnapshot()
      })
    })

    describe('when type is set to ring', () => {
      beforeEach(() => {
        wrapper.setProps({type: Loading.TYPES.RING})
      })

      it('functions as expected', () => {
        expect(wrapper).toMatchSnapshot()
      })
    })

    describe('when type is set to ripple', () => {
      beforeEach(() => {
        wrapper.setProps({type: Loading.TYPES.RIPPLE})
      })

      it('functions as expected', () => {
        expect(wrapper).toMatchSnapshot()
      })
    })
  })

  describe('when type is null', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(<Loading type={null} />)
    })

    it('functions as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    describe('when type is unset (set to undefined)', () => {
      beforeEach(() => {
        wrapper.setProps({type: undefined})
      })

      it('functions as expected', () => {
        expect(wrapper).toMatchSnapshot()
      })
    })

    describe('when type is set to ring', () => {
      beforeEach(() => {
        wrapper.setProps({type: Loading.TYPES.RING})
      })

      it('functions as expected', () => {
        expect(wrapper).toMatchSnapshot()
      })
    })

    describe('when type is set to ripple', () => {
      beforeEach(() => {
        wrapper.setProps({type: Loading.TYPES.RIPPLE})
      })

      it('functions as expected', () => {
        expect(wrapper).toMatchSnapshot()
      })
    })
  })

  describe('when type is ring', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(<Loading type={Loading.TYPES.RING} />)
    })

    it('functions as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    describe('when type is unset (set to undefined)', () => {
      beforeEach(() => {
        wrapper.setProps({type: undefined})
      })

      it('functions as expected', () => {
        expect(wrapper).toMatchSnapshot()
      })
    })

    describe('when type is set to null', () => {
      beforeEach(() => {
        wrapper.setProps({type: null})
      })

      it('functions as expected', () => {
        expect(wrapper).toMatchSnapshot()
      })
    })

    describe('when type is set to ripple', () => {
      beforeEach(() => {
        wrapper.setProps({type: Loading.TYPES.RIPPLE})
      })

      it('functions as expected', () => {
        expect(wrapper).toMatchSnapshot()
      })
    })
  })

  describe('when type is ripple', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(<Loading type={Loading.TYPES.RIPPLE} />)
    })

    it('functions as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    describe('when type is unset (set to undefined)', () => {
      beforeEach(() => {
        wrapper.setProps({type: undefined})
      })

      it('functions as expected', () => {
        expect(wrapper).toMatchSnapshot()
      })
    })

    describe('when type is set to null', () => {
      beforeEach(() => {
        wrapper.setProps({type: null})
      })

      it('functions as expected', () => {
        expect(wrapper).toMatchSnapshot()
      })
    })

    describe('when type is set to ring', () => {
      beforeEach(() => {
        wrapper.setProps({type: Loading.TYPES.RING})
      })

      it('functions as expected', () => {
        expect(wrapper).toMatchSnapshot()
      })
    })
  })
})
