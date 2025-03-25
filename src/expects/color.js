import {ExpectError} from "./errors.js";
import {testValue} from "../helpers/test-value.js";

export default {
    /**
     * Asserts that the actual value is a HEX color.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeHEXColor(msg = null) {
        let received = this.received
        let result = testValue(received, 'hex')

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not hex color`, 'toBeHEXColor', received, 'HEX Color')
        }
    },

    /**
     * Asserts that the actual value is an RGB color.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeRGBColor(msg = null) {
        let received = this.received
        let result = testValue(received, 'rgb')

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not rgb color`, 'toBeRGBColor', received, 'RGB Color')
        }
    },

    /**
     * Asserts that the actual value is an RGBA color.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeRGBAColor(msg = null) {
        let received = this.received
        let result = testValue(received, 'rgba')

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not rgba color`, 'toBeRGBAColor', received, 'RGBA Color')
        }
    },

    /**
     * Asserts that the actual value is an HSL color.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeHSVColor(msg = null) {
        let received = this.received
        let result = testValue(received, 'hsv')

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not hsv color`, 'toBeHSVColor', received, 'HSV Color')
        }
    },

    /**
     * Asserts that the actual value is an HSL color.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeHSLColor(msg = null) {
        let received = this.received
        let result = testValue(received, 'hsl')

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not hsl color`, 'toBeHSLColor', received, 'HSL Color')
        }
    },

    /**
     * Asserts that the actual value is an HSLA color.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeHSLAColor(msg = null) {
        let received = this.received
        let result = testValue(received, 'hsla')

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not hsla color`, 'toBeHSLAColor', received, 'HSLA Color')
        }
    },

    /**
     * Asserts that the actual value is a CMYK color.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeCMYKColor(msg = null) {
        let received = this.received
        let result = testValue(received, 'cmyk')

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Expected value is not cmyk color`, 'toBeCMYKColor', received, 'CMYK Color')
        }
    },

    /**
     * Asserts that the actual value is a valid color (HEX, RGB, RGBA, HSL, HSLA, or CMYK).
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeColor(msg = null) {
        let received = this.received
        const testHex = testValue(received, 'hex')
        const testRGB = testValue(received, 'rgb')
        const testRGBA = testValue(received, 'rgba')
        const testHSL = testValue(received, 'hsl')
        const testHSV = testValue(received, 'hsv')
        const testHSLA = testValue(received, 'hsla')
        const testCMYK = testValue(received, 'cmyk')

        let result = testHex || testRGB || testRGBA || testHSL || testHSLA || testCMYK || testHSV

        result = result === this.control

        if (!result) {
            throw new ExpectError(msg || `Expected value is not color`, 'toBeColor', received, 'Color')
        }
    },
}