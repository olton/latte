import {ExpectError} from "./errors.js";

export default {
    /**
     * Asserts that the actual value is equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBe(expected, msg = null) {
        let received = this.received
        let result = Object.is(received, expected)
        
        result = result === this.control

        if (!result) {
            throw new ExpectError(msg || `Expected value not equal to received`, 'toBe', received, expected)
        }
    },
    
    /**
     * Asserts that the actual value is strict equal (using ===) to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeStrictEqual(expected, msg = null) {
        let received = this.received
        let result = received === expected

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value not strict equal to received`, 'toBeStrictEqual', received, expected)
        }
    },

    /**
     * Asserts that the actual value is equal (using ==) to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeEqual(expected, msg = null) {
        let received = this.received
        let result = received == expected

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value not equal to received`, 'toBeEqual', received, expected)
        }
    },
}