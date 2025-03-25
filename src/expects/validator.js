import {ExpectError} from "./errors.js";
import {testValue} from "../helpers/test-value.js";

export default {
    /**
     * Asserts that the actual value is true.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeTrue(msg = null) {
        let received = this.received
        let result = received === true

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected true received ${received}`, 'toBeTrue', received, true)
        }
    },

    /**
     * Asserts that the actual value is false.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeFalse(msg = null) {
        let received = this.received
        let result = received === false

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected false received ${received}`, 'toBeFalse', received, false)
        }
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
            throw new ExpectError(msg || `Expected value is not a string`, 'toMatch', received, 'string')
        }

        let result = received.match(expected) !== null

        result = result === this.control  
        
        if (!result) {
            throw new ExpectError(msg || `Expected value not match received`, 'toMatch', received, expected)
        }
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

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value not greater than received`, 'toBeGreaterThan', received, expected)
        }
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

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value not greater than or equal to received`, 'toBeGreaterThanOrEqual', received, expected)
        }
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

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value not less than received`, 'toBeLessThan', received, expected)
        }
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

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value not less than or equal to received`, 'toBeLessThanOrEqual', received, expected)
        }
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

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value not between ${min} and ${max}`, 'toBeBetween', received, `Between ${min} and ${max}`)
        }
    },
    
    /**
     * Asserts that the actual value is positive.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBePositive(msg = null) {
        let received = this.received
        let result = typeof received === 'number' && received > 0

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value not positive`, 'toBePositive', received, 'Positive')
        }
    },

    /**
     * Asserts that the actual value is negative.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNegative(msg = null) {
        let received = this.received
        let result = typeof received === 'number' && received < 0

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value not negative`, 'toBeNegative', received, 'Negative')
        }
    },

    /**
     * Asserts that the actual value is finite.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeFinite(msg = null) {
        let received = this.received
        let result = typeof received === 'number' && Number.isFinite(received)

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value not finite`, 'toBeFinite', received, 'Finite')
        }
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

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not close to`, 'toBeCloseTo', received, expected)
        }
    },

    /**
     * Asserts that the actual value is a valid IP address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeIP(msg = null) {
        let received = this.received
        let result = testValue(received, 'ipv4') || testValue(received, 'ipv6')

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not IP Address`, 'toBeIP', received, 'IP Address')
        }
    },

    /**
     * Asserts that the actual value is a valid IPv4 address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeIPv4(msg = null) {
        let received = this.received
        let result = testValue(received, 'ipv4')

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not IPv4`, 'toBeIPv4', received, 'IPv4')
        }
    },

    /**
     * Asserts that the actual value is a valid IPv6 address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeIPv6(msg = null) {
        let received = this.received
        let result = testValue(received, 'ipv6')

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not IPv6`, 'toBeIPv6', received, 'IPv6')
        }
    },

    /**
     * Asserts that the actual value is a valid email address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeEmail(msg = null) {
        let received = this.received
        let result = testValue(received, 'email')

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not Email`, 'toBeEmail', received, 'Email')
        }
    },

    /**
     * Asserts that the actual value is a valid URL.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeUrl(msg = null) {
        let received = this.received
        let result = testValue(received, 'url')

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not URL`, 'toBeUrl', received, 'URL')
        }
    },


    /**
     * Asserts that the actual value is a Base64 encoded string.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeBase64(msg = null) {
        let received = this.received
        let result = testValue(received, 'base64')

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not base64`, 'toBeBase64', received, 'Base64')
        }
    },
}