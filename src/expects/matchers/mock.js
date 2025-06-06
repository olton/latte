import { ExpectError } from '../error/errors.js'
import { deepEqual } from '../../helpers/objects.js'

const noMockFn = (method) => {
  throw new ExpectError(
    'Expected function is not a mock function',
    method
  )
}

export default {
  /**
     * Asserts the mock function was called at least once
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect} The result of the test.
     */
  toHaveBeenCalled (msg = null) {
    const received = this.received

    if (!received.mock || !Array.isArray(received.mock.calls)) {
      noMockFn('toHaveBeenCalled')
    }

    const result = received.mock.calls.length > 0

    this.assert(
      result,
      msg,
      'toHaveBeenCalled',
      null,
      received.mock.calls.length
    )

    return this
  },

  /**
     * Asserts the mock function was called at least once
     * @param expected
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect} The result of the test.
     */
  toHaveBeenCalledTimes (expected, msg = null) {
    const received = this.received

    if (!received.mock || !Array.isArray(received.mock.calls)) {
      noMockFn('toHaveBeenCalledTimes')
    }

    const result = received.mock.calls.length === expected

    this.assert(
      result,
      msg,
      'toHaveBeenCalledTimes',
      expected,
      received.mock.calls.length
    )

    return this
  },

  /**
     * Asserts that the mock function was called with specified arguments.
     * @param {Array} expected - The expected arguments.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect} The result of the test.
     */
  toHaveBeenCalledWith (expected, msg = null) {
    const received = this.received

    if (!received.mock || !Array.isArray(received.mock.calls)) {
      noMockFn('toHaveBeenCalledWith')
    }

    const result = received.mock.calls.some(call => deepEqual(call, expected))

    this.assert(
      result,
      msg,
      'toHaveBeenCalledWith',
      expected,
      received.mock.calls
    )

    return this
  },

  /**
     * Asserts that the mock function was called last with specified arguments.
     * @param {Array} expected - The expected arguments.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Expect} The result of the test.
     */
  toHaveBeenLastCalledWith (expected, msg = null) {
    const received = this.received

    if (!received.mock || !Array.isArray(received.mock.calls)) {
      noMockFn('toHaveBeenLastCalledWith')
    }

    const result = deepEqual(received.mock.calls[received.mock.calls.length - 1], expected)

    this.assert(
      result,
      msg,
      'toHaveBeenLastCalledWith',
      expected,
      received.mock.calls
    )

    return this
  }
}
