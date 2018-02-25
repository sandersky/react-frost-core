import {trimLongDataInElement} from '../utils'

describe('utils', () => {
  describe('trimLongDataInElement()', () => {
    describe('when text dataset is missing from element', () => {
      let element, text

      beforeEach(() => {
        text = 'The quick brown fox'
        element = document.createElement('div')
        element.textContent = text
        element.style.font = 'normal normal normal 10px/14px Arial'
      })

      describe('when text fits within element', () => {
        beforeEach(() => {
          element.style.width = '200px'
        })

        it('should not trim text or set title', () => {
          expect(trimLongDataInElement(element)).toBe(null)
        })
      })

      describe('when text does not fit within element', () => {
        beforeEach(() => {
          element.style.width = '80px'
        })

        it('should not trim text or set title', () => {
          expect(trimLongDataInElement(element)).toBe(null)
        })
      })
    })

    describe('when initial text fits within element', () => {
      let element, text

      beforeEach(() => {
        text = 'The quick brown fox'
        element = document.createElement('div')
        element.dataset.text = text
        element.textContent = text
        element.style.font = 'normal normal normal 10px/14px Arial'
      })

      describe('when text fits within element', () => {
        beforeEach(() => {
          element.style.width = '200px'
        })

        it('should not trim text or set title', () => {
          expect(trimLongDataInElement(element)).toBe(null)
        })
      })

      describe('when text does not fit within element', () => {
        beforeEach(() => {
          element.style.width = '80px'
        })

        it('should trim text and sets title', () => {
          const result = trimLongDataInElement(element)

          expect(result.text.indexOf('The')).toBe(0)
          expect(result.text.indexOf('…')).not.toBe(-1)
          expect(result.text.indexOf('fox')).toBe(result.text.length - 3)
          expect(result.tooltip).toBe(text)
        })
      })
    })

    describe('when initial text does not fit within element', () => {
      let element, text

      beforeEach(() => {
        text = 'The quick brown fox'
        element = document.createElement('div')
        element.dataset.text = text
        element.textContent = text
        element.style.font = 'normal normal normal 10px/14px Arial'

        // perform initial trimming of text
        element.style.width = '80px'
        const initial = trimLongDataInElement(element)
        element.textContent = initial.text
        element.title = initial.tooltip
      })

      it('should trim text', () => {
        let currentText = element.textContent

        expect(currentText.indexOf('The')).toBe(0)
        expect(currentText.indexOf('…')).not.toBe(-1)
        expect(currentText.indexOf('fox')).toBe(currentText.length - 3)
      })

      it('should have title', () => {
        expect(element.title).toBe(text)
      })

      describe('when text fits within element', () => {
        beforeEach(() => {
          element.style.width = '200px'
        })

        it('should set text back to full text and unsets tooltip', () => {
          const result = trimLongDataInElement(element)
          expect(result.text).toBe(text)
          expect(result.tooltip).toBe('')
        })
      })

      describe('when trimmed text remains the same', () => {
        beforeEach(() => {
          element.style.width = '80px'
        })

        it('should not update text or tooltip', () => {
          expect(trimLongDataInElement(element)).toBe(null)
        })

        it('should have same trimmed text', () => {
          let currentText = element.textContent

          expect(currentText.indexOf('The')).toBe(0)
          expect(currentText.indexOf('…')).not.toBe(-1)
          expect(currentText.indexOf('fox')).toBe(currentText.length - 3)
        })

        it('should have same title', () => {
          expect(element.title).toBe(text)
        })
      })
    })
  })
})
