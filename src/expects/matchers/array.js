import checkArraySorted from "../../helpers/check-array-sorted.js";

export default {
    /**
     * Asserts that the actual value is empty.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeEmpty(msg = null) {
        let received = this.received
        let result = "length" in received && received.length === 0

        this.assert(
            result,
            msg,
            'toBeEmpty',
        )
        
        return this
    },

    /**
     * Asserts that the array-like object has the expected length.
     * @param {number} expected - The expected length.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasLength(expected, msg = null) {
        let received = this.received
        let result = "length" in received && received.length === expected

        this.assert(
            result,
            msg,
            'hasLength',
            expected,
            received.length,
        )
        
        return this
    },

    /**
     * Asserts that values in the array are unique.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArrayUnique(msg = null) {
        let received = this.received
        let result = new Set(received).size === received.length

        this.assert(
            result,
            msg,
            'toBeArrayUnique',
        )
        
        return this
    },
    
    /**
     * Asserts that the actual value is sorted.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArraySorted(msg = null) {
        let received = this.received
        let result = checkArraySorted(received)
        let expected = received.slice().sort((a, b) => a - b)

        this.assert(
            result,
            msg,
            'toBeArraySorted',
            expected,
        )
        
        return this
    },

    /**
     * Asserts that the actual value contains the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toContain(expected, msg = null) {
        let received = this.received
        let result

        if (typeof received === 'object' && !Array.isArray(received)) {
            result = received.hasOwnProperty(expected)
        } else if (Array.isArray(received)) {
            if (Array.isArray(expected)) {
                result = expected.every((v) => received.includes(v))
            } else {
                result = received.includes(expected)
            }
        } else {
            result = received.includes(expected)
        }

        this.assert(
            result,
            msg,
            'toContain',
            expected,
        )
        
        return this
    },

    /**
     * Asserts that the actual array is equal to the expected array.
     * @param expected - The expected array.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArrayEqual(expected, msg = null) {
        let received = this.received
        let result = true

        if (received.length !== expected.length) {
            result = false
        } else {
            result = received.every((item, index) => item === expected[index]);
        }

        this.assert(
            result,
            msg,
            'toBeArrayEqual',
            expected,
            received,
        )
        
        return this
    },

    /**
     * Asserts that the actual value is an array.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArray(msg = null) {
        let received = this.received
        let result = Array.isArray(received)

        this.assert(
            result,
            msg,
            'toBeArray',
        )
        
        return this
    },
}