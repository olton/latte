import {ExpectError} from "../error/errors.js";
import {testValue} from "../../helpers/test-value.js";

export default {
    /**
     * Asserts that the actual value is a boolean.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeBoolean(msg = null) {
        let received = this.received
        let result = typeof received === 'boolean'

        this.assert(
            result,
            msg,
            'toBeBoolean',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is defined.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDefined(msg = null) {
        let received = this.received
        let result = typeof received !== "undefined"

        this.assert(
            result,
            msg,
            'toBeDefined',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is undefined.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeUndefined(msg = null) {
        let received = this.received
        let result = typeof received === "undefined"

        this.assert(
            result,
            msg,
            'toBeUndefined',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is null.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNull(msg = null) {
        let received = this.received
        let result = received === null

        this.assert(
            result,
            msg,
            'toBeNull',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is an integer.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeInteger(msg = null) {
        let received = this.received
        let result = Number.isInteger(received)

        this.assert(
            result,
            msg,
            'toBeInteger',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is a safe integer.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeSafeInteger(msg = null) {
        let received = this.received
        let result = Number.isSafeInteger(received)

        this.assert(
            result,
            msg,
            'toBeSafeInteger',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is a float.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeFloat(msg = null) {
        let received = this.received
        let result = typeof received === 'number' && !Number.isInteger(received) && !isNaN(received)

        this.assert(
            result,
            msg,
            'toBeFloat',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is a number and not is NaN.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNumber(msg = null) {
        let received = Number(this.received)
        let result = typeof received === 'number' && !isNaN(received)

        this.assert(
            result,
            msg,
            'toBeNumber',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is NaN.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNaN(msg = null) {
        let received = this.received
        let result = isNaN(Number(received))

        this.assert(
            result,
            msg,
            'toBeNaN',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is a JSON string.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeJson(msg = null) {
        let received = this.received
        let result = /^[\],:{}\s]*$/.test(
            received
                .replace(/\\["\\\/bfnrtu]/g, '@')
                .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
        )

        this.assert(
            result,
            msg,
            'toBeJson',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is an XML string.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeXml(msg = null) {
        let received = this.received
        let result = testValue(received, 'xml')

        this.assert(
            result,
            msg,
            'toBeXml',
        )
        
        return this
    },


    /**
     * Asserts that the actual value is of the specified type.
     * @param type - The expected type.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeType(type, msg = null) {
        let received = this.received
        let result = typeof received === type

        this.assert(
            result,
            msg,
            'toBeType',
            type,   
            typeof received,
        )
        
        return this
    },

    /**
     * Asserts that the actual value is an instance of the specified type.
     * @param type - The expected type.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeInstanceOf(type, msg = null) {
        let received = this.received
        let result = received instanceof type

        this.assert(
            result,
            msg,
            'toBeInstanceOf',
            type,
            received.constructor.name,
        )
        
        return this
    },


    /**
     * Asserts that the actual value is a string.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeString(msg = null) {
        let received = this.received
        let result = typeof received === 'string'

        this.assert(
            result,
            msg,
            'toBeString',
        )
        
        return this
    },


    /**
     * Asserts that the actual value is a function.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeFunction(msg = null) {
        let received = this.received
        let result = typeof received === 'function'

        this.assert(
            result,
            msg,
            'toBeFunction',
            null,
            typeof received,
        )
        
        return this
    },

    /**
     * Asserts that the actual value is an async function.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeAsyncFunction(msg = null) {
        let received = this.received
        let result = received.constructor.name === 'AsyncFunction'

        this.assert(
            result,
            msg,
            'toBeAsyncFunction',
            null,
            received.constructor.name,
        )
        
        return this
    },

    /**
     * Asserts that the actual value is a date.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDate(msg = null) {
        let received = this.received
        let result = received instanceof Date || testValue(received, 'date') || testValue(received, 'datetime')

        this.assert(
            result,
            msg,
            'toBeDate',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is a date.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDateObject(msg = null) {
        let received = this.received
        let result = received instanceof Date

        this.assert(
            result,
            msg,
            'toBeDateObject',
            null,
            received.constructor.name,
        )
        
        return this
    },

    /**
     * Asserts that the actual value is a regular expression.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeRegExp(msg = null) {
        let received = this.received
        let result = received instanceof RegExp

        this.assert(
            result,
            msg,
            'toBeRegExp',
            null,
            received.constructor.name,
        )
        
        return this
    },

    /**
     * Asserts that the actual value is a symbol.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeSymbol(msg = null) {
        let received = this.received
        let result = typeof received === 'symbol'

        this.assert(
            result,
            msg,
            'toBeSymbol',
            null,
            typeof received,
        )
        
        return this
    },

    /**
     * Asserts that the actual value is a BigInt.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeBigInt(msg = null) {
        let received = this.received
        let result = typeof received === 'bigint'

        this.assert(
            result,
            msg,
            'toBeBigInt',
            null,
            typeof received,
        )
        
        return this
    },

    /**
     * Asserts that the actual value is a Map.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeMap(msg = null) {
        let received = this.received
        let result = received instanceof Map

        this.assert(
            result,
            msg,
            'toBeMap',
            null,
            received.constructor.name,
        )
        
        return this
    },

    /**
     * Asserts that the actual value is a Set.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeSet(msg = null) {
        let received = this.received
        let result = received instanceof Set

        this.assert(
            result,
            msg,
            'toBeSet',
            null,
            received.constructor.name,
        )
        
        return this
    },

    /**
     * Asserts that the actual value is a WeakMap.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeWeakMap(msg = null) {
        let received = this.received
        let result = received instanceof WeakMap

        this.assert(
            result,
            msg,
            'toBeWeakMap',
            null,
            received.constructor.name,
        )
        
        return this
    },

    /**
     * Asserts that the actual value is a WeakSet.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeWeakSet(msg = null) {
        let received = this.received
        let result = received instanceof WeakSet

        this.assert(
            result,
            msg,
            'toBeWeakSet',
            null,
            received.constructor.name,
        )
        
        return this
    },

    /**
     * Asserts that the actual value is an ArrayBuffer.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArrayBuffer(msg = null) {
        let received = this.received
        let result = received instanceof ArrayBuffer

        this.assert(
            result,
            msg,
            'toBeArrayBuffer',
            null,
            received.constructor.name,
        )
        
        return this
    },

    /**
     * Asserts that the actual value is a Promise.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBePromise(msg = null) {
        let received = this.received
        let result = received instanceof Promise

        this.assert(
            result,
            msg,
            'toBePromise',
            null,
            received.constructor.name,
        )
        
        return this
    },
}