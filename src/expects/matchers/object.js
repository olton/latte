import {ExpectError} from "../error/errors.js";
import {compareStructure, deepEqual} from "../../helpers/objects.js";
import {stringify} from "../../helpers/json.js";

const check = (obj, method) => {
    if (typeof obj !== 'object' || obj === null) {
        throw new ExpectError(
            `Value is not an object`,
            method,
            obj,
        )
    }
}

export default {
    /**
     * Asserts that the actual object is equal to the expected object.
     * @param expected - The expected object.
     * @param msg - The message to display if the assertion fails.
     * @returns {this}.
     */
    toBeObject(expected, msg = null) {
        let received = this.received
        
        check(received, 'toBeObject')
        check(expected, 'toBeObject')
        
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

        this.assert(
            result,
            msg,
            'toBeObject',
            expected,
        )
        
        return this
    },
    
    /**
     * Asserts that the actual value is deeply equal to the expected value.
     * With this method you can compare objects with circular references.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns {this}.
     */
    toBeDeepEqual(expected, msg = null) {
        let received = this.received

        check(received, 'toBeDeepEqual')
        check(expected, 'toBeDeepEqual')
        
        let result = deepEqual(received, expected)

        this.assert(
            result,
            msg,
            'toBeDeepEqual',
            expected,
        )
        
        return this
    },

    /**
     * Asserts that the actual value is deeply equal to the expected value using a safe comparison.
     * With this method you can compare objects with circular references.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns {this}.
     */
    toBeDeepEqualSafe(expected, msg = null) {
        let received = this.received

        check(received, 'toBeDeepEqualSafe')
        check(expected, 'toBeDeepEqualSafe')

        let result = stringify(received) === stringify(expected)

        this.assert(
            result,
            msg,
            'toBeDeepEqualSafe',
            expected,
        )
        
        return this
    },

    /**
     * Asserts that the actual structure is equal to the expected structure.
     * @param expected - The expected structure.
     * @param msg - The message to display if the assertion fails.
     * @returns {this}.
     */
    toBeObjectStructureEqual(expected, msg = null) {
        let received = this.received

        check(received, 'toBeObjectStructureEqual')
        check(expected, 'toBeObjectStructureEqual')

        let result = compareStructure(received, expected)

        this.assert(
            result,
            msg,
            'toBeObjectStructureEqual',
            expected,
        )
        
        return this
    },

    /**
     * Asserts that the object has the specified property.
     * @param {string} property - The expected property name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {this}.
     */
    hasProperty(property, msg = null) {
        let received = this.received

        check(received, 'hasProperty')

        const parts = property.split('.');
        let currentValue = received;

        for (const part of parts) {
            if (currentValue === null || currentValue === undefined) break;
            currentValue = currentValue[part];
        }
        
        let result = currentValue !== undefined

        this.assert(
            result,
            msg,
            'hasProperty',
            property,
            currentValue
        )
        
        return this
    },

    /**
     * Asserts that the object has the specified property with value.
     * @param {string} property - The expected property name.
     * @param {any} value
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {this}.
     */
    hasPropertyValue(property, value, msg = null) {
        let received = this.received

        check(received, 'hasPropertyValue')

        const parts = property.split('.');
        let currentValue = received;

        for (const part of parts) {
            if (currentValue === null || currentValue === undefined) break;
            currentValue = currentValue[part];
        }
        
        let result = currentValue === value

        this.assert(
            result,
            msg,
            'hasProperty',
            `${property}: ${value}`,
            currentValue
        )
        
        return this
    },
}