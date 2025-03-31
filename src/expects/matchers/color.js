import { testValue } from '../../helpers/test-value.js'

export default {
  /**
     * Asserts that the actual value is a HEX color.
     * @param msg - The message to display if the assertion fails.
     * @returns {this}.
     */
  toBeHEXColor (msg = null) {
    const received = this.received
    const result = testValue(received, 'hex')

    this.assert(
      result,
      msg,
      'toBeHEXColor',
      received
    )

    return this
  },

  /**
     * Asserts that the actual value is an RGB color.
     * @param msg - The message to display if the assertion fails.
     * @returns {this}.
     */
  toBeRGBColor (msg = null) {
    const received = this.received
    const result = testValue(received, 'rgb')

    this.assert(
      result,
      msg,
      'toBeRGBColor',
      received
    )

    return this
  },

  /**
     * Asserts that the actual value is an RGBA color.
     * @param msg - The message to display if the assertion fails.
     * @returns {this}.
     */
  toBeRGBAColor (msg = null) {
    const received = this.received
    const result = testValue(received, 'rgba')

    this.assert(
      result,
      msg,
      'toBeRGBAColor',
      received
    )

    return this
  },

  /**
     * Asserts that the actual value is an HSL color.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} {this}.
     */
  toBeHSVColor (msg = null) {
    const received = this.received
    const result = testValue(received, 'hsv')

    this.assert(
      result,
      msg,
      'toBeHSVColor',
      received
    )

    return this
  },

  /**
     * Asserts that the actual value is an HSL color.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} {this}.
     */
  toBeHSLColor (msg = null) {
    const received = this.received
    const result = testValue(received, 'hsl')

    this.assert(
      result,
      msg,
      'toBeHSLColor',
      received
    )

    return this
  },

  /**
     * Asserts that the actual value is an HSLA color.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} {this}.
     */
  toBeHSLAColor (msg = null) {
    const received = this.received
    const result = testValue(received, 'hsla')

    this.assert(
      result,
      msg,
      'toBeHSLAColor',
      received
    )

    return this
  },

  /**
     * Asserts that the actual value is a CMYK color.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} {this}.
     */
  toBeCMYKColor (msg = null) {
    const received = this.received
    const result = testValue(received, 'cmyk')

    this.assert(
      result,
      msg,
      'toBeCMYKColor',
      received
    )

    return this
  },

  /**
     * Asserts that the actual value is a valid color (HEX, RGB, RGBA, HSL, HSLA, or CMYK).
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} {this}.
     */
  toBeColor (msg = null) {
    const received = this.received
    const testHex = testValue(received, 'hex')
    const testRGB = testValue(received, 'rgb')
    const testRGBA = testValue(received, 'rgba')
    const testHSL = testValue(received, 'hsl')
    const testHSV = testValue(received, 'hsv')
    const testHSLA = testValue(received, 'hsla')
    const testCMYK = testValue(received, 'cmyk')

    const result = testHex || testRGB || testRGBA || testHSL || testHSLA || testCMYK || testHSV

    this.assert(
      result,
      msg,
      'toBeColor',
      received
    )

    return this
  }
}
