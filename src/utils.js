/**
 * @flow
 */

const ctx = document.createElement('canvas').getContext('2d')

/**
 * Get width of text for a specific font
 * @param text - text to measure width of
 * @returns width of text using font
 */
function getTextWidth(text: string): number {
  return Math.ceil(ctx.measureText(text).width)
}

/**
 * Trim text to fit within a specified width by removing characters from the
 * center out and replacing with an ellipsis.
 * Note: Replaces just enough characters from the center so that the text fills
 * the width to the best of its ability.
 * @param text - text to trim
 * @param width - width trimmed text needs to fit within in pixels
 * @returns trimmed text
 */
function trimDataToFit(text: string, width: number): string {
  // Start at two end characters
  let leftIndex = 0
  let rightIndex = text.length - 1

  if (getTextWidth(text) <= width) {
    return text
  }

  // Start total width as width of ellipsis since it will be added to the middle of the text
  let total = getTextWidth('…')

  while (leftIndex < rightIndex) {
    // Determine width of next two characters inward
    let current = getTextWidth(text[leftIndex]) + getTextWidth(text[rightIndex])

    // Determine total width including next two characters inward
    let newTotal = total + current

    // If adding next two characters makes string too long let's go ahead and stop
    if (newTotal > width) {
      leftIndex -= 1
      rightIndex += 1
      break
    }

    total = newTotal
    leftIndex += 1
    rightIndex -= 1
  }

  // Get trimmed text
  return (
    text.slice(0, leftIndex + 1) + '…' + text.slice(rightIndex, text.length)
  )
}

/**
 * If data is too long for element without wrapping trim with ellipsis in middle
 * Note: expects data-text attribute to be on element with full text
 * @param element - HTML element to trim data within
 * @returns updated text and tooltip
 */
export function trimLongDataInElement(
  element: HTMLElement,
): ?{text: string, tooltip: string} {
  const fullText = element.dataset.text

  if (!fullText) {
    return null
  }

  const style = window.getComputedStyle(element)
  const width = parseInt(style.getPropertyValue('width'))
  const fontFamily = style.getPropertyValue('font-family')
  const fontSize = style.getPropertyValue('font-size')

  ctx.font = `${fontSize} ${fontFamily}`

  const text = trimDataToFit(fullText, width)
  const tooltip = text === fullText ? '' : fullText

  // If rendered text has changed, update it
  if (element.textContent.trim() !== text) {
    return {text, tooltip}
  }

  return null
}
