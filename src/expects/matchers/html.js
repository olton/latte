export default {
    /**
     * Asserts that the actual value is an HTML element.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {this} The result of the test.
     */
    toBeHtmlElement(msg = null) {
        let received = this.received
        let result = typeof HTMLElement !== "undefined" && received instanceof HTMLElement

        this.assert(
            result,
            msg,
            'toBeHtmlElement',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is an HTML node.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {this} The result of the test.
     */
    toBeNode(msg = null) {
        let received = this.received
        let result = typeof Node !== "undefined" && received instanceof Node

        this.assert(
            result,
            msg,
            'toBeNode',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is an HTML document.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {this} The result of the test.
     */
    toBeDocument(msg = null) {
        let received = this.received
        let result = typeof document !== "undefined" && received instanceof document

        this.assert(
            result,
            msg,
            'toBeDocument',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is an HTML collection.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {this} The result of the test.
     */
    toBeHtmlCollection(msg = null) {
        let received = this.received
        let result = typeof HTMLCollection !== "undefined" && received instanceof HTMLCollection

        this.assert(
            result,
            msg,
            'toBeHtmlCollection',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is a Window object.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {this} The result of the test.
     */
    toBeWindow(msg = null) {
        let received = this.received
        let result = typeof window !== "undefined" && received instanceof window

        this.assert(
            result,
            msg,
            'toBeWindow',
        )
        
        return this
    },

    /**
     * Asserts that the actual value is a Text node.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {this} The result of the test.
     */
    toBeTextNode(msg = null) {
        let received = this.received
        let result = received instanceof Text

        this.assert(
            result,
            msg,
            'toBeTextNode',
        )
        
        return this
    },

    /**
     * Asserts that the HTML element has the specified class.
     * @param {string} expected - The expected class name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {this} The result of the test.
     */
    hasClass(expected, msg = null) {
        let received = this.received
        let result = received.classList && received.classList.contains(expected)

        this.assert(
            result,
            msg,
            'hasClass',
            expected,
            received.className,
        )
        
        return this
    },

    /**
     * Asserts that the HTML element has the specified attribute.
     * @param {string} expected - The expected attribute name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {this} The result of the test.
     */
    hasAttribute(expected, msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement && received.hasAttribute(expected)

        this.assert(
            result,
            msg,
            'hasAttribute',
            expected,
            [...received.attributes],
        )
        
        return this
    },

    /**
     * Asserts that the HTML element has children.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {this} The result of the test.
     */
    hasChildren(msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement && received.children.length > 0

        this.assert(
            result,
            msg,
            'hasChildren',
        )
        
        return this
    },

    /**
     * Asserts that the HTML element has a parent.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {this} The result of the test.
     */
    hasParent(msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement && received.parentElement !== null

        this.assert(
            result,
            msg,
            'hasParent',
        )
        
        return this
    },

    /**
     * Asserts that the HTML element has the specified computed style.
     * @param prop
     * @param val
     * @param msg
     * @returns {this} The result of the test.
     */
    hasStyle(prop, val, msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement
        let expected_val = window.getComputedStyle(received)[prop]

        result = result && expected_val === val        

        this.assert(
            result,
            msg,
            'hasStyle',
            `${prop}: ${val}`,
        )
        
        return this
    },

    /**
     * Asserts that the HTML element has the specified style in style property.
     * @param expected
     * @param msg
     * @returns {this} The result of the test.
     */
    hasStyleProperty(expected, msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement && received.style[expected] !== null

        this.assert(
            result,
            msg,
            'hasStyleProperty',
            expected,
        )
        
        return this
    },
    
    /**
     * Asserts that the HTML element has the specified computed styles.
     * @param styles
     * @param msg
     * @returns {this} The result of the test.
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
            } else {
                result = false
                break
            }
        }

        this.assert(
            result,
            msg,
            'hasStyles',
            styles,
            expected_val,
        )
        
        return this
    },

    /**
     * Asserts that the HTML element has siblings.
     * @param msg
     * @returns {this} The result of the test.
     */
    hasSiblings(msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement && received.parentElement && received.parentElement.children.length > 1

        this.assert(
            result,
            msg,
            'hasSiblings',
        )
        
        return this
    },

    /**
     * Asserts that the HTML element has the specified sibling.
     * @param expected
     * @param msg
     * @returns {this} The result of the test.
     */
    hasSibling(expected, msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement 
            && received.parentElement 
            && [...received.parentElement.children].some(el => el !== received && el.matches(expected))

        this.assert(
            result,
            msg,
            'hasSibling',
            expected,
            received.parentElement.children,
        )
        
        return this
    },

    /**
     * Asserts that the HTML element has a prev siblings.
     * @param msg
     * @returns {this} The result of the test.
     */
    hasPrev(msg = null){
        let received = this.received
        let result = received instanceof HTMLElement && received.previousElementSibling !== null

        this.assert(
            result,
            msg,
            'hasPrev',
        )
        
        return this
    },
    
    /**
     * Asserts that the HTML element has a next siblings.
     * @param msg
     * @returns {this} The result of the test.
     */
    hasNext(msg = null){
        let received = this.received
        let result = received instanceof HTMLElement && received.nextElementSibling !== null

        this.assert(
            result,
            msg,
            'hasNext',
        )
        
        return this
    },

    /**
     * Asserts that the HTML element has the specified text.
     * @param expected
     * @param msg
     * @returns {this} The result of the test.
     */
    hasText(expected, msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement && received.textContent.includes( expected )

        this.assert(
            result,
            msg,
            'hasText',
            expected,
            received.textContent,
        )
        
        return this
    },

    /**
     * Asserts that the HTML element contains the specified element.
     * @param expected
     * @param msg
     * @returns {this} The result of the test.
     */
    containsElement(expected, msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement && [...received.children].some(el => el.matches(expected))

        this.assert(
            result,
            msg,
            'containElement',
            expected,
            received.children,
        )
        
        return this
    },

    /**
     * Asserts that the HTML element contains the specified element deeply.
     * @param expected
     * @param msg
     * @returns {this} The result of the test.
     */
    containsElementDeep(expected, msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement && [...received.querySelectorAll('*')].some(el => el.matches(expected))

        this.assert(
            result,
            msg,
            'containElementDeep',
            expected,
            received.querySelectorAll('*'),
        )

        return this
    },

    /**
     * Asserts that the HTML element has the specified ID.
     * @param expected
     * @param msg
     * @returns {this}
     */
    hasId(expected, msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement && received.id === expected

        this.assert(
            result,
            msg,
            'hasId',
            expected,
            received.id,
        )
        
        return this
    },

    /**
     * Asserts that the HTML element has the specified name.
     * @param expected
     * @param msg
     * @returns {this}
     */
    hasHref(expected, msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement && received.href === expected

        this.assert(
            result,
            msg,
            'hasHref',
            expected,
            received.href,
        )
        
        return this
    },

    /**
     * Asserts that the HTML element has the specified name.
     * @param expected
     * @param msg
     * @returns {this}
     */
    hasName(expected, msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement && received.name === expected

        this.assert(
            result,
            msg,
            'hasName',
            expected,
            received.name,
        )
        
        return this
    },

    /**
     * Asserts that the HTML element has the specified src.
     * @param expected
     * @param msg
     * @returns {this}
     */
    hasSrc(expected, msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement && received.src === expected

        this.assert(
            result,
            msg,
            'hasSrc',
            expected,
            received.src,
        )
        
        return this
    },
}