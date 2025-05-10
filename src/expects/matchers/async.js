import { ExpectError } from '../error/errors.js'

export default {
  /**
     * Asserts that the actual value is resolved with the expected value.
     * @param expected
     * @param msg
     * @returns {Expect}
     */
  async toBeResolvedWith (expected, msg = null) {
    const received = this.received
    let resolve
    try {
      resolve = await received
    } catch (e) {
      throw new ExpectError(msg || 'Promise was rejected', 'toBeResolvedWith', e, expected)
    }

    const result = Object.is(resolve, expected)

    this.assert(
      result,
      msg,
      'toBeResolvedWith',
      expected,
      resolve
    )

    return this
  },

  /**
     * Asserts that the actual value is rejected with the expected value.
     * @param expected
     * @param msg
     * @returns {Expect}
     */
  async toBeRejectedWith (expected, msg = null) {
    const received = this.received
    let resolve
    try {
      resolve = await received
    } catch (e) {
      const result = Object.is(e, expected)

      this.assert(
        result,
        msg,
        'toBeRejectedWith',
        expected,
        e
      )

      return this
    }

    throw new ExpectError(msg || 'Promise was resolved', 'toBeRejectedWith', resolve, expected)
  }
}
