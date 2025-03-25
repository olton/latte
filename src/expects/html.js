import {ExpectError} from "./errors.js";

export default {
    /**
     * Asserts that the actual value is an HTML element.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeHtmlElement(msg = null) {
        let received = this.received
        let result = typeof HTMLElement !== "undefined" && received instanceof HTMLElement

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Received value is not a HTMLElement`, 'toBeHtmlElement', received, 'HTMLElement')
        }
    },

    /**
     * Asserts that the actual value is an HTML node.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeNode(msg = null) {
        let received = this.received
        let result = typeof Node !== "undefined" && received instanceof Node

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Received value is not a Node`, 'toBeHtmlNode', received, 'Node')
        }
    },

    /**
     * Asserts that the actual value is an HTML document.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeDocument(msg = null) {
        let received = this.received
        let result = typeof document !== "undefined" && received instanceof document

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Received value is not a Document`, 'toBeDocument', received, 'Document')
        }
    },

    /**
     * Asserts that the actual value is an HTML collection.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeHtmlCollection(msg = null) {
        let received = this.received
        let result = typeof HTMLCollection !== "undefined" && received instanceof HTMLCollection

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Received value is not a HTMLCollection`, 'toBeHtmlCollection', received, 'HTMLCollection')
        }
    },

    /**
     * Asserts that the actual value is a Window object.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeWindow(msg = null) {
        let received = this.received
        let result = typeof window !== "undefined" && received instanceof window

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Received value is not a Window object`, 'toBeWindow', received, 'Window')
        }
    },

    /**
     * Asserts that the actual value is a Text node.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeTextNode(msg = null) {
        let received = this.received
        let result = received instanceof Text

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Received value is not a Text node`, 'toBeTextNode', received, 'Text Node')
        }
    },

    /**
     * Asserts that the HTML element has the specified class.
     * @param {string} expected - The expected class name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasClass(expected, msg = null) {
        let received = this.received
        let result = received.classList && received.classList.contains(expected)

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Received HTMLElement has not class ${expected}`, 'hasClass', received.className, expected)
        }
    },

    /**
     * Asserts that the HTML element has the specified attribute.
     * @param {string} expected - The expected attribute name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasAttribute(expected, msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement && received.hasAttribute(expected)

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Received element has not attribute ${expected}`, 'hasAttribute', received, expected)
        }
    },

    /**
     * Asserts that the HTML element has children.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasChildren(msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement && received.children.length > 0

        result = result === this.control

        if (!result) {
            throw new ExpectError(msg || `Received element has no children`, 'hasChildren', received, 'Children')
        }
    },

    /**
     * Asserts that the HTML element has a parent.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasParent(msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement && received.parentElement !== null

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Received element has no parent`, 'hasParent', received, 'Parent')
        }
    },

    /**
     * Asserts that the HTML element has the specified computed style.
     * @param prop
     * @param val
     * @param msg
     */
    hasStyleProperty(prop, val, msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement
        let expected_val = window.getComputedStyle(received)[prop]

        result = result && expected_val === val        
        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Received element has style property ${prop} ${expected_val} instead of ${val}`, 'hasStyle', val, expected_val)
        }
    },

    /**
     * Asserts that the HTML element has the specified computed styles.
     * @param styles
     * @param msg
     */
    hasStyles(styles, msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement
        let expected_val = window.getComputedStyle(received)

        for (const prop in styles) {
            if (styles.hasOwnProperty(prop)) {
                const val = styles[prop]
                const expected_val = window.getComputedStyle(received)[prop]
                result = result && expected_val === val
                if (!result) {
                    break
                }
            }
        }

        result = result === this.control
        
        if (!result) {
            throw new ExpectError(msg || `Received element hasn't style properties`, 'hasStyles', styles, expected_val)
        }
    }
}