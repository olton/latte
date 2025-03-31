export default {
  /**
     * Asserts that the actual value is equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns {this}.
     */
  toBe (expected, msg = null) {
    const received = this.received
    const result = Object.is(received, expected)

    this.assert(
      result,
      msg,
      'toBe',
      expected
    )

    return this
  },

  /**
     * Asserts that the actual value is strict equal (using ===) to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns {this}.
     */
  toBeStrictEqual (expected, msg = null) {
    const received = this.received
    const result = received === expected

    this.assert(
      result,
      msg,
      'toBeStrictEqual',
      expected
    )

    return this
  },

  /**
     * Asserts that the actual value is equal (using ==) to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns {this}.
     */
  toBeEqual (expected, msg = null) {
    const received = this.received
    const result = received == expected

    this.assert(
      result,
      msg,
      'toBeEqual',
      expected
    )

    return this
  }
}
