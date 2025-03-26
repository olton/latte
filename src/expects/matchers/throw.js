import {ExpectError} from "../error/errors.js";

export default {
    /**
     * Asserts that the actual function throws an error.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toThrow(msg = null) {
        let received = this.received
        let result = false
        try {
            received.apply()
        } catch (e) {
            result = true
        }

        this.assert(
            result,
            msg,
            'toThrow',
        )
        
        return this
    },

    /**
     * Asserts that the actual function throws an error matching the expected value.
     * @param expected - The expected error.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toThrowError(expected, msg = null) {
        let received = this.received
        let result = false
        let message = ``
        try {
            received.apply()
        } catch (e) {
            message = e.message
            result = e.message.match(expected) !== null
        }

        this.assert(
            result,
            msg,
            'toThrowError',
            expected,
            message
        )
        
        return this
    },
}