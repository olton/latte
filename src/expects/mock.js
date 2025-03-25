import {ExpectError} from "./errors.js";
import {deepEqual} from "../helpers/objects.js";
import {stringify} from "../helpers/json.js";

export default {
    /**
     * Asserts the mock function was called at least once
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toHaveBeenCalled(msg = null) {
        let received = this.received
        let result = received.mock.calls.length > 0

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected function is not called`, 'toHaveBeenCalled', received.mock.calls.length, 'Called')
        }
    },

    /**
     * Asserts the mock function was called at least once
     * @param expected
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toHaveBeenCalledTimes(expected, msg = null) {
        let received = this.received
        let result = received.mock.calls.length === expected

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Function was called ${received.mock.calls.length} times instead of ${expected}`, 'toHaveBeenCalledTimes', received.mock.calls.length, expected)
        }
    },

    /**
     * Asserts that the mock function was called with specified arguments.
     * @param {Array} expected - The expected arguments.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toHaveBeenCalledWith(expected, msg = null) {
        let received = this.received
        let result = received.mock.calls.some(call => deepEqual(call, expected))

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected function is not called with ${stringify(expected)}`, 'toHaveBeenCalledWith', received.mock.calls, expected)
        }
    },

    /**
     * Asserts that the mock function was called last with specified arguments.
     * @param {Array} expected - The expected arguments.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toHaveBeenLastCalledWith(expected, msg = null) {
        let received = this.received
        let result = deepEqual(received.mock.calls[received.mock.calls.length - 1], expected)

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected function is not called with ${stringify(expected)}`, 'toHaveBeenLastCalledWith', received.mock.calls, expected)
        }
    },
}