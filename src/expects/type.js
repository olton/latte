import {ExpectError} from "./errors.js";
import {testValue} from "../helpers/test-value.js";

export default {
    /**
     * Asserts that the actual value is a boolean.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeBoolean(msg = null) {
        let received = this.received
        let result = typeof received === 'boolean'

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not boolean`, 'toBeBoolean', received, 'Boolean')
        }
    },

    /**
     * Asserts that the actual value is defined.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDefined(msg = null) {
        let received = this.received
        let result = typeof received !== "undefined"

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected defined value received ${received}`, 'toBeDefined', received, 'defined')
        }
    },

    /**
     * Asserts that the actual value is undefined.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeUndefined(msg = null) {
        let received = this.received
        let result = typeof received === "undefined"

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected undefined value received ${received}`, 'toBeUndefined', received, 'undefined')
        }
    },

    /**
     * Asserts that the actual value is null.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNull(msg = null) {
        let received = this.received
        let result = received === null

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected null received ${received}`, 'toBeNull', received, 'null')
        }
    },

    /**
     * Asserts that the actual value is an integer.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeInteger(msg = null) {
        let received = this.received
        let result = Number.isInteger(received)

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value not integer`, 'toBeInteger', received, 'Integer')
        }
    },

    /**
     * Asserts that the actual value is a safe integer.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeSafeInteger(msg = null) {
        let received = this.received
        let result = Number.isSafeInteger(received)

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value not safe integer`, 'toBeSafeInteger', received, 'Safe Integer')
        }
    },

    /**
     * Asserts that the actual value is a float.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeFloat(msg = null) {
        let received = this.received
        let result = typeof received === 'number' && !Number.isInteger(received) && !isNaN(received)

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value not float`, 'toBeFloat', received, 'Float')
        }
    },

    /**
     * Asserts that the actual value is a number and not is NaN.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNumber(msg = null) {
        let received = Number(this.received)
        let result = typeof received === 'number' && !isNaN(received)

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not number`, 'toBeNumber', received, 'Number')
        }
    },

    /**
     * Asserts that the actual value is NaN.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNaN(msg = null) {
        let received = this.received
        let result = isNaN(Number(received))

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not NaN`, 'toBeNaN', received, 'NaN')
        }
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

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not a json string`, 'toBeJson', received, 'Json')
        }
    },

    /**
     * Asserts that the actual value is an XML string.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeXml(msg = null) {
        let received = this.received
        let result = testValue(received, 'xml')

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not a valid xml string`, 'toBeXml', received, 'Xml')
        }
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

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not ${type}`, 'toBeType', received, type)
        }
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

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not instance of ${type}`, 'toBeInstanceOf', received, type)
        }
    },


    /**
     * Asserts that the actual value is a string.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeString(msg = null) {
        let received = this.received
        let result = typeof received === 'string'

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not string`, 'toBeString', received, 'String')
        }
    },


    /**
     * Asserts that the actual value is a function.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeFunction(msg = null) {
        let received = this.received
        let result = typeof received === 'function'

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not function`, 'toBeFunction', received, 'Function')
        }
    },

    /**
     * Asserts that the actual value is an async function.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeAsyncFunction(msg = null) {
        let received = this.received
        let result = received.constructor.name === 'AsyncFunction'

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not async function`, 'toBeAsyncFunction', received, 'Async Function')
        }
    },

    /**
     * Asserts that the actual value is a date.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDate(msg = null) {
        let received = this.received
        let result = received instanceof Date || testValue(received, 'date') || testValue(received, 'datetime')

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not date`, 'toBeDate', received, 'Date')
        }
    },

    /**
     * Asserts that the actual value is a date.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDateObject(msg = null) {
        let received = this.received
        let result = received instanceof Date

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not datetime object`, 'toBeDateObject', received, 'Date')
        }
    },

    /**
     * Asserts that the actual value is a regular expression.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeRegExp(msg = null) {
        let received = this.received
        let result = received instanceof RegExp

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not regular expression`, 'toBeRegExp', received, 'RegExp')
        }
    },

    /**
     * Asserts that the actual value is a symbol.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeSymbol(msg = null) {
        let received = this.received
        let result = typeof received === 'symbol'

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not symbol`, 'toBeSymbol', received, 'Symbol')
        }
    },

    /**
     * Asserts that the actual value is a BigInt.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeBigInt(msg = null) {
        let received = this.received
        let result = typeof received === 'bigint'

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not big int`, 'toBeBigInt', received, 'BigInt')
        }
    },

    /**
     * Asserts that the actual value is a Map.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeMap(msg = null) {
        let received = this.received
        let result = received instanceof Map

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not a Map`, 'toBeMap', received, 'Map')
        }
    },

    /**
     * Asserts that the actual value is a Set.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeSet(msg = null) {
        let received = this.received
        let result = received instanceof Set

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not a Set`, 'toBeSet', received, 'Set')
        }
    },

    /**
     * Asserts that the actual value is a WeakMap.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeWeakMap(msg = null) {
        let received = this.received
        let result = received instanceof WeakMap

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not a WeakMap`, 'toBeWeakMap', received, 'WeakMap')
        }
    },

    /**
     * Asserts that the actual value is a WeakSet.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeWeakSet(msg = null) {
        let received = this.received
        let result = received instanceof WeakSet

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not a WeakSet`, 'toBeWeakSet', received, 'WeakSet')
        }
    },

    /**
     * Asserts that the actual value is an ArrayBuffer.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArrayBuffer(msg = null) {
        let received = this.received
        let result = received instanceof ArrayBuffer

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not an ArrayBuffer`, 'toBeArrayBuffer', received, 'ArrayBuffer')
        }
    },

    /**
     * Asserts that the actual value is a Promise.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBePromise(msg = null) {
        let received = this.received
        let result = received instanceof Promise

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not a Promise`, 'toBePromise', received, 'Promise')
        }
    },
}