export default {
  /**
     * Check if the component renders without errors.
     * @param msg
     * @returns {this}
     */
  async toRenderWithoutError (msg = null) {
    const Component = this.received
    let result = false
    let errorMessage = ''

    try {
      const { unmount } = await R.render(Component)
      unmount()
      result = true
    } catch (error) {
      result = false
      errorMessage = error.message
    }

    this.assert(
      result,
      msg || errorMessage,
      'toRenderWithoutErrors',
      null,
      errorMessage
    )

    return this
  },

  /**
     * Check if the component renders a specific text.
     * @param expected
     * @param msg
     * @returns {this}
     */
  async toRenderText (expected, msg = null) {
    const Component = this.received
    const { unmount, getByText } = await R.render(Component)
    let result = false

    try {
      result = !!getByText(expected)
    } finally {
      unmount() // Важливо демонтувати компонент після тесту
    }

    this.assert(
      result,
      msg,
      'toRenderText',
      expected,
      null
    )

    return this
  },

  /**
     * Check if the component contains a specific element.
     * @param selector
     * @param msg
     * @returns {this}
     */
  async toContainElement (selector, msg = null) {
    const Component = this.received
    const { unmount, $ } = await R.render(Component)
    let result = false

    try {
      const element = $(selector)
      result = !!element
    } finally {
      unmount()
    }

    this.assert(
      result,
      msg,
      'toContainElement',
      selector,
      null
    )

    return this
  },

  /**
     * Check if the component has a specific number of elements.
     * @param selector
     * @param expectedCount
     * @param msg
     * @returns {this}
     */
  async toHaveElementCount (selector, expectedCount, msg = null) {
    const Component = this.received
    const { unmount, $$ } = await R.render(Component)
    let result = false
    let actualCount = 0

    try {
      const elements = $$(selector)
      actualCount = elements.length
      result = actualCount === expectedCount
    } finally {
      unmount()
    }

    this.assert(
      result,
      msg,
      'toHaveElementCount',
            `Expected ${expectedCount} elements`,
            `Found ${actualCount} elements`
    )

    return this
  },

  /**
     * Check triggering an event on element.
     * @param selector
     * @param event
     * @param callback
     * @param data
     * @param msg
     * @returns {this}
     */
  async toTriggerEvent (selector, event, callback, data, msg = null) {
    const Component = this.received
    const { unmount, $, fireEvent } = await R.render(Component)
    let wasCalled = false

    try {
      const originalCallback = callback
      callback = function (...args) {
        wasCalled = true
        return originalCallback && originalCallback.apply(this, args)
      }

      const element = $(selector)
      if (!element) {
        this.assert(
          false,
                    `Element by selector "${selector}" not found`,
                    'toTriggerEventHandler'
        )
        return this
      }

      element.addEventListener(event, callback)

      if (fireEvent[event]) {
        fireEvent[event](element, data)
      } else {
        const customEvent = new Event(event)
        element.dispatchEvent(customEvent)
      }
    } finally {
      unmount()
    }

    this.assert(
      wasCalled,
      msg,
      'toTriggerEventHandler',
      event,
      null
    )

    return this
  },

  /**
     * Wait for an element to eventually appear in the DOM.
     * @param selector
     * @param timeout
     * @param msg
     * @returns {this}
     */
  async toEventuallyContain (selector, timeout = 1000, msg = null) {
    const Component = this.received
    const { unmount, $ } = await R.render(Component)
    let result = false

    try {
      const startTime = Date.now()

      while (Date.now() - startTime < timeout) {
        const element = $(selector)
        if (element) {
          result = true
          break
        }
        await new Promise(resolve => setTimeout(resolve, 50))
      }
    } finally {
      unmount()
    }

    this.assert(
      result,
      msg,
      'toEventuallyContain',
      selector,
      null
    )

    return this
  }
}
