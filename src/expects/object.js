import {ExpectError} from "./errors.js";
import {compareStructure, deepEqual} from "../helpers/objects.js";
import {stringify} from "../helpers/json.js";

export default {
    /**
     * Asserts that the actual object is equal to the expected object.
     * @param expected - The expected object.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeObject(expected, msg = null) {
        let received = this.received
        let result = true
        let key1 = Object.keys(received)
        let key2 = Object.keys(expected)

        if (key1.length !== key2.length) {
            result = false
        } else {
            for (let key of key1) {
                if (received[key] !== expected[key]) {
                    result = false
                }
            }
        }

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected object not equal to received`, 'toBeObject', received, expected)
        }
    },

    /**
     * Asserts that the actual value is deeply equal to the expected value.
     * With this method you can compare objects with circular references.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDeepEqual(expected, msg = null) {
        let received = this.received
        let result = deepEqual(received, expected)

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected object not equal to received`, 'toBeDeepEqual', received, expected)
        }
    },

    /**
     * Asserts that the actual value is deeply equal to the expected value using a safe comparison.
     * With this method you can compare objects with circular references.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDeepEqualSafe(expected, msg = null) {
        let received = this.received
        let result = stringify(received) === stringify(expected)

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected object not equal to received`, 'toBeDeepEqualSafe', received, expected)
        }
    },

    /**
     * Asserts that the actual structure is equal to the expected structure.
     * @param expected - The expected structure.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeObjectStructureEqual(expected, msg = null) {
        let received = this.received
        let result = compareStructure(received, expected)

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected object structure not equal to received`, 'toBeObjectStructureEqual', received, expected)
        }
    },

    /**
     * Asserts that the actual value has the specified property.
     * @param {string} expected - The expected property name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasProperty(expected, msg = null) {
        let received = this.received
        let result = received[expected] !== undefined

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected object has not property ${expected}`, 'hasProperty', received, expected)
        }
    },
}