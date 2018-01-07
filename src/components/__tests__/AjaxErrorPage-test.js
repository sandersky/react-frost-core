import AjaxErrorPage from '../AjaxErrorPage'
import {mount} from 'enzyme'
import React from 'react'

describe('AjaxErrorPage', () => {
  describe('when suggestion provided', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(
        <AjaxErrorPage
          description="Service is currently unavailable."
          errorCode={500}
          errorDetails="Detailed information would be displayed here."
          errorMessage="Failure to retrieve network elements"
          errorTitle="Internal server error"
          suggestion="Try again later."
        />,
      )
    })

    it('functions as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    describe('when details expanded', () => {
      let toggle

      beforeEach(() => {
        toggle = wrapper.find('.frost-expand-label-text')
        toggle.simulate('click')
      })

      it('functions as expected', () => {
        expect(wrapper).toMatchSnapshot()
      })

      describe('when details collapsed', () => {
        beforeEach(() => {
          toggle.simulate('click')
        })

        it('functions as expected', () => {
          expect(wrapper).toMatchSnapshot()
        })
      })
    })
  })

  describe('when suggestion omitted', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(
        <AjaxErrorPage
          description="Service is currently unavailable."
          errorCode={500}
          errorDetails="Detailed information would be displayed here."
          errorMessage="Failure to retrieve network elements"
          errorTitle="Internal server error"
        />,
      )
    })

    it('functions as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })

    describe('when details expanded', () => {
      let toggle

      beforeEach(() => {
        toggle = wrapper.find('.frost-expand-label-text')
        toggle.simulate('click')
      })

      it('functions as expected', () => {
        expect(wrapper).toMatchSnapshot()
      })

      describe('when details collapsed', () => {
        beforeEach(() => {
          toggle.simulate('click')
        })

        it('functions as expected', () => {
          expect(wrapper).toMatchSnapshot()
        })
      })
    })
  })
})
