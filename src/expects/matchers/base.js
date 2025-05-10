import { isObject } from '../../helpers/is-object.js'

export default {
    /**
     * Asserts that the actual value is equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns {Expect}.
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
     * @returns {Expect}.
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
     * @returns {Expect}.
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
    },

    /**
     * Asserts that the actual value is an instance of the expected type.
     * @param type
     * @param msg
     * @returns {Expect}
     */
    any (type, msg) {
        const received = this.received
        
        let result = typeof received !== 'undefined'
        
        if (type && type.name === "Number") {
            result = result && typeof received === 'number'  
        } else            
        if (type && type.name === "String") {
            result = result && typeof received === 'string'  
        } else            
        if (type && type.name === "Object") {
            result = result && isObject(received)  
        } else             
        if (type && type.name === "Array") {
            result = result && Array.isArray(received)  
        } else             
        if (type && type.name === "Boolean") {
            result = result && typeof received === 'boolean' 
        } else             
        if (type && type.name === "Function") {
            result = result && typeof received === 'function' 
        } else
        if (type) {
            result = result && received instanceof type
        }

        this.assert(
            result,
            msg,
            'any',
            type
        )

        return this
    }
}
