export default {
  /**
     * Check if an element has aria attribute
     * @param expected
     * @param msg
     * @returns {this}
     */
  hasAriaAttribute (expected, msg = null) {
    const received = this.received
    const result = received.hasAttribute(`aria-${expected}`)

    this.assert(
      result,
      msg,
      'toHaveAriaAttribute',
            `aria-${expected}`
    )

    return this
  },

  /**
     * Check if an element has aria attributes
     * @param expected - space separated list of aria attributes
     * @param msg
     * @returns {this}
     */
  hasAriaAttributes (expected, msg = null) {
    const received = this.received
    let result = 0
    const names = expected.split(' ')

    for (const attr of received.attributes) {
      const attrName = attr.name
      if (attrName.startsWith('aria-') && names.includes(attrName)) {
        result++
      }
    }

    this.assert(
      result === names.length,
      msg,
      'toHaveAriaAttributes',
      'aria-*'
    )

    return this
  },

  /**
     * Check if an element has an aria role
     * @param expected
     * @param msg
     * @returns {this}
     */
  hasAriaRole (expected, msg = null) {
    const received = this.received
    const result = received.getAttribute('role') === expected

    this.assert(
      result,
      msg,
      'toHaveAriaRole',
      received.getAttribute('role')
    )

    return this
  },

  /**
     * Check if an element has an aria label
     * @param msg
     * @returns {this}
     */
  hasAriaLabel (msg = null) {
    const received = this.received
    const result = received.hasAttribute('aria-label')

    this.assert(
      result,
      msg,
      'toHaveAriaLabel',
      received.getAttribute('aria-label')
    )

    return this
  },

  /**
     * Check if an element has an alt text
     * @param msg
     * @returns {this}
     */
  hasAltText (msg = null) {
    const received = this.received
    const alt = received.getAttribute('alt')
    const result = alt && alt !== ''

    this.assert(
      result,
      msg,
      'toHaveAltText',
      alt
    )

    return this
  },

  /**
     * Check if an element is keyboard-accessible
     * @param msg
     * @returns {this}
     */
  toBeKeyboardAccessible (msg = null) {
    const received = this.received
    let result = false

    // Елементи, які за замовчуванням отримують фокус
    const nativelyFocusable = [
      'a', 'button', 'input', 'select', 'textarea', 'summary', 'audio[controls]',
      'video[controls]', '[contenteditable]'
    ]

    // Перевіряємо, чи елемент має вбудовану фокусовність
    const tagName = received.tagName.toLowerCase()
    const isNativelyFocusable = nativelyFocusable.some(selector => {
      if (selector.includes('[')) {
        // Для селекторів з атрибутами
        const [tag, attr] = selector.split('[')
        const attrName = attr.replace(']', '')
        return tagName === tag && received.hasAttribute(attrName)
      }
      return tagName === selector
    })

    // Перевіряємо tabindex
    const hasTabindex = received.hasAttribute('tabindex')
    const tabindexValue = hasTabindex ? received.getAttribute('tabindex') : null
    const hasValidTabindex = hasTabindex && tabindexValue !== '-1'

    // Перевіряємо, чи елемент не є прихованим
    const isHidden =
            received.hasAttribute('hidden') ||
            received.hasAttribute('aria-hidden') === 'true' ||
            (received.style && received.style.display === 'none') ||
            (received.style && received.style.visibility === 'hidden')

    if (isNativelyFocusable && !isHidden) {
      result = true
    } else if (hasValidTabindex && !isHidden) {
      result = true
    } else if (isHidden) {
      result = false
    } else if (hasTabindex && tabindexValue === '-1') {
      result = false
    } else {
      result = false
    }

    this.assert(
      result,
      msg,
      'toBeKeyboardAccessible',
      'Accessible',
      'Not Accessible'
    )

    return this
  }
}
