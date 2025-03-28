export default {
    /**
     * Asserts that the actual value is equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns {this}.
     */
    toBe(expected, msg = null) {
        let received = this.received
        let result = Object.is(received, expected)
        
        this.assert(
            result,
            msg,
            'toBe',
            expected,
        )
        
        return this
    },
    
    /**
     * Asserts that the actual value is strict equal (using ===) to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns {this}.
     */
    toBeStrictEqual(expected, msg = null) {
        let received = this.received
        let result = received === expected

        this.assert(
            result,
            msg,
            'toBeStrictEqual',
            expected,
        )
        
        return this
    },

    /**
     * Asserts that the actual value is equal (using ==) to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns {this}.
     */
    toBeEqual(expected, msg = null) {
        let received = this.received
        let result = received == expected

        this.assert(
            result,
            msg,
            'toBeEqual',
            expected,
        )
        
        return this
    },
}