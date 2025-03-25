import {ExpectError} from "./errors.js";

export default {
    /**
     * Asserts that the actual value is resolved with the expected value.
     * @param expected
     * @param msg
     * @returns {Promise<void>}
     */
    async toBeResolvedWith(expected, msg = null) {
        let received = this.received
        let resolve
        try {
            resolve = await received
        } catch (e) {
            throw new ExpectError(msg || `Promise was rejected`, 'toBeResolvedWith', e, expected)
        }
        
        let result = Object.is(resolve, expected)

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Promise was resolved with different value`, 'toBeResolvedWith', promise, expected)
        }
    }

}