import {ExpectError} from "../error/errors.js";
import {testValue} from "../../helpers/test-value.js";

export default {
    /**
     * Asserts that the actual value is true.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeTrue(msg = null) {
        let received = this.received
        let result = received === true

        this.assert(
            result,
            msg,
            'toBeTrue',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is false.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeFalse(msg = null) {
        let received = this.received
        let result = received === false

        this.assert(
            result,
            msg,
            'toBeFalse',
        )
        
        return this
    },


    /**
     * Asserts that the actual value matches the expected pattern.
     * @param expected - The expected pattern.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toMatch(expected, msg = null) {
        let received = this.received

        if (typeof received !== 'string') {
            throw new ExpectError(
                `Expected value is not a string`, 
                'toMatch', 
                typeof received, 
                'string'
            )
        }

        let result = received.match(expected) !== null

        this.assert(
            result,
            msg,
            'toMatch',
            expected,
        )
        
        return this
    },
    
    /**
     * Asserts that the actual value is greater than the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeGreaterThan(expected, msg = null) {
        let received = this.received
        let result = received > expected

        this.assert(
            result,
            msg,
            'toBeGreaterThan',
            expected,
        )
        
        return this
    },

    /**
     * Asserts that the actual value is greater than or equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeGreaterThanOrEqual(expected, msg = null) {
        let received = this.received
        let result = received >= expected

        this.assert(
            result,
            msg,
            'toBeGreaterThanOrEqual',
            expected,
        )
        
        return this
    },

    /**
     * Asserts that the actual value is less than the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeLessThan(expected, msg = null) {
        let received = this.received
        let result = received < expected

        this.assert(
            result,
            msg,
            'toBeLessThan',
            expected,
        )
        
        return this
    },

    /**
     * Asserts that the actual value is less than or equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeLessThanOrEqual(expected, msg = null) {
        let received = this.received
        let result = received <= expected

        this.assert(
            result,
            msg,
            'toBeLessThanOrEqual',
            expected,
        )
        
        return this
    },

    /**
     * Asserts that the actual value is between the specified minimum and maximum values.
     * @param min - The minimum value.
     * @param max - The maximum value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBetween(min, max, msg = null) {
        let received = this.received
        let result = received >= min && received <= max

        this.assert(
            result,
            msg,
            'toBetween',
            `Between ${min} and ${max}`,
        )
        
        return this
    },
    
    /**
     * Asserts that the actual value is positive.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBePositive(msg = null) {
        let received = this.received
        let result = typeof received === 'number' && received > 0

        this.assert(
            result,
            msg,
            'toBePositive',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is negative.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNegative(msg = null) {
        let received = this.received
        let result = typeof received === 'number' && received < 0

        this.assert(
            result,
            msg,
            'toBeNegative',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is finite.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeFinite(msg = null) {
        let received = this.received
        let result = typeof received === 'number' && Number.isFinite(received)

        this.assert(
            result,
            msg,
            'toBeFinite',
        )
        
        return this
    },


    /**
     * Asserts that the actual value is close to the expected value within a certain precision.
     * @param {number} expected - The expected value to compare against.
     * @param {number} [precision=2] - The number of decimal places to consider in the comparison.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeCloseTo(expected, precision = 2, msg = null) {
        let received = this.received
        let result = Math.abs(received - expected) < Math.pow(10, -precision) / 2

        this.assert(
            result,
            msg,
            'toBeCloseTo',
            `Expected ${expected} with precision ${precision}`,
            received,
        )
        
        return this
    },

    /**
     * Asserts that the actual value is a valid IP address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeIP(msg = null) {
        let received = this.received
        let result = testValue(received, 'ipv4') || testValue(received, 'ipv6')

        this.assert(
            result,
            msg,
            'toBeIP',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is a valid IPv4 address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeIPv4(msg = null) {
        let received = this.received
        let result = testValue(received, 'ipv4')

        this.assert(
            result,
            msg,
            'toBeIPv4',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is a valid IPv6 address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeIPv6(msg = null) {
        let received = this.received
        let result = testValue(received, 'ipv6')

        this.assert(
            result,
            msg,
            'toBeIPv6',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is a valid email address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeEmail(msg = null) {
        let received = this.received
        let result = testValue(received, 'email')

        this.assert(
            result,
            msg,
            'toBeEmail',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is a valid URL.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeUrl(msg = null) {
        let received = this.received
        let result = testValue(received, 'url')

        this.assert(
            result,
            msg,
            'toBeUrl',
        )
        
        return this
    },


    /**
     * Asserts that the actual value is a Base64 encoded string.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeBase64(msg = null) {
        let received = this.received
        let result = testValue(received, 'base64')
        
        this.assert(
            result,
            msg,
            'toBeBase64',
        )
        
        return this
    },
}