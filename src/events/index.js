/**
 * Simples the event on the Dom element
 * @param {HTMLElement} element - DOM element
 * @param {string} eventName - event name
 * @param {Object} options - event options
 */
export function fire (element, eventName, options = {}) {
  const event = new Event(eventName, {
    bubbles: true,
    cancelable: true,
    ...options
  })
  element.dispatchEvent(event)
}
