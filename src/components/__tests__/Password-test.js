import Password, {ALIGN_LEFT, ALIGN_RIGHT} from '../Password'
import {mount} from 'enzyme'
import React from 'react'

const TESTS = [
  {
    desc: 'when no properties passed in',
    props: {},
  },
  {
    desc: 'when align set to left',
    props: {align: ALIGN_LEFT},
  },
  {
    desc: 'when align set to right',
    props: {align: ALIGN_RIGHT},
  },
  {
    desc: 'when class name passed in',
    props: {className: 'foobar'},
  },
  {
    desc: 'when disabled set to true',
    props: {disabled: true},
  },
  {
    desc: 'when disabled set to false',
    props: {disabled: false},
  },
  {
    desc: 'when error set to true',
    props: {error: true},
  },
  {
    desc: 'when error set to false',
    props: {error: false},
  },
  {
    desc: 'when maximum length set to 1',
    props: {maxLength: 1},
  },
  {
    desc: 'when minimum length set to 1',
    props: {minLength: 1},
  },
  {
    desc: 'when onChange set',
    props: {onChange: jest.fn()},
  },
  {
    desc: 'when readOnly set to true',
    props: {readOnly: true},
  },
  {
    desc: 'when readOnly set to false',
    props: {readOnly: false},
  },
  {
    desc: 'when revealable set to true',
    props: {revealable: true},
  },
  {
    desc: 'when revealable set to false',
    props: {revealable: false},
  },
  {
    desc: 'when size set to 3',
    props: {size: 3},
  },
  {
    desc: 'when value set to empty string',
    props: {value: ''},
  },
  {
    desc: 'when value set to non-empty string',
    props: {value: 'foobar'},
  },
]

describe('Password', () => {
  TESTS.forEach(({desc, props}) => {
    describe(desc, () => {
      let wrapper

      beforeEach(() => {
        if (props.onChange) {
          props.onChange.mockReset()
        }

        wrapper = mount(<Password {...props} />)
      })

      it('functions as expected', () => {
        expect(wrapper).toMatchSnapshot()
      })

      describe('when input is focused', () => {
        let input

        beforeEach(() => {
          input = wrapper.find('input')
          input.simulate('focus')
        })

        it('functions as expected', () => {
          expect(wrapper).toMatchSnapshot()
        })

        if (props.value) {
          describe('when clear button fade in animation has completed', () => {
            beforeEach(() => {
              wrapper.find('button').simulate('animationEnd')
            })

            it('functions as expected', () => {
              expect(wrapper).toMatchSnapshot()
            })
          })
        }

        if (props.disabled !== true && props.readOnly !== true) {
          describe('when value changed', () => {
            beforeEach(() => {
              const target = input.at(0)
              const event = {target}

              target.value = 'baz'

              input.simulate('change', event)
            })

            it('functions as expected', () => {
              expect(wrapper).toMatchSnapshot()
            })

            describe('when clear button is pressed', () => {
              let button

              beforeEach(() => {
                button = wrapper.find('button')
                button.simulate('click')
              })

              it('functions as expected', () => {
                expect(wrapper).toMatchSnapshot()
              })

              describe('when clear button fade out animation has completed', () => {
                beforeEach(() => {
                  button.simulate('animationEnd')
                })

                it('functions as expected', () => {
                  expect(wrapper).toMatchSnapshot()
                })
              })
            })

            if (props.revealable === true) {
              describe('when reveal toggled', () => {
                let toggle

                beforeEach(() => {
                  toggle = wrapper.find('.frost-password-reveal')
                  toggle.simulate('click')
                })

                it('functions as expected', done => {
                  setTimeout(() => {
                    expect(wrapper).toMatchSnapshot()
                    done()
                  }, 1)
                })

                describe('when reveal toggled again', () => {
                  beforeEach(() => {
                    toggle.simulate('click')
                  })

                  it('functions as expected', done => {
                    setTimeout(() => {
                      expect(wrapper).toMatchSnapshot()
                      done()
                    }, 1)
                  })
                })
              })
            }
          })

          if (props.revealable === true) {
            describe('when reveal toggled', () => {
              let toggle

              beforeEach(() => {
                toggle = wrapper.find('.frost-password-reveal')
                toggle.simulate('click')
              })

              it('functions as expected', done => {
                setTimeout(() => {
                  expect(wrapper).toMatchSnapshot()
                  done()
                }, 1)
              })

              describe('when reveal toggled again', () => {
                beforeEach(() => {
                  toggle.simulate('click')
                })

                it('functions as expected', done => {
                  setTimeout(() => {
                    expect(wrapper).toMatchSnapshot()
                    done()
                  }, 1)
                })
              })
            })
          }
        }

        describe('when input looses focus', () => {
          beforeEach(() => {
            input.simulate('blur')
          })

          it('renders as expected', () => {
            expect(wrapper).toMatchSnapshot()
          })

          if (props.value) {
            describe('when clear button fade out animation has completed', () => {
              beforeEach(() => {
                wrapper.find('button').simulate('animationEnd')
              })

              it('functions as expected', () => {
                expect(wrapper).toMatchSnapshot()
              })
            })
          }
        })
      })
    })
  })
})
