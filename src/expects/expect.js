import {ExpectError} from "./error/errors.js";
import assertMessages from "./messages.js";
import BaseExpect from "./matchers/base.js";
import AsyncExpect from "./matchers/async.js";
import HtmlExpect from "./matchers/html.js";
import ObjectExpect from "./matchers/object.js";
import TypeExpect from "./matchers/type.js";
import ThrowExpect from "./matchers/throw.js";
import ColorExpect from "./matchers/color.js";
import ArrayExpect from "./matchers/array.js";
import MockExpect from "./matchers/mock.js";
import ValidatorExpect from "./matchers/validator.js";

class Expect {
    received = null
    control = true
    messages = null

    constructor(received, messages = assertMessages, control = true) {
        this.received = received
        this.control = control
        this.messages = messages
    }
    
    get not() {
        return new this.constructor(this.received, this.messages, !this.control)
    }
    
    assert(result, msg = null, method = null, expected = '', received = '') {
        const defPositiveMsg = this.messages[method] && this.messages[method]['positive'] ? this.messages[method]['positive'] : `Expected value not to match condition`
        const defNegativeMsg = this.messages[method] && this.messages[method]['negative'] ? this.messages[method]['negative'] : `Expected value to match condition`
        
        received = received || this.received
        if (received === null || received === undefined || typeof received.toString !== 'function') {
            received = ''
        }
        
        if (expected === null || expected === undefined || typeof expected.toString !== 'function') {
            expected = ''
        }
        
        msg = (msg || ( this.control ? defPositiveMsg : defNegativeMsg ))
            .replace(/{\s*(received)\s*}/, received)
            .replace(/{\s*(expected)\s*}/, expected)
        
        if (!(Boolean(result) === this.control)) {
            throw new ExpectError(
                msg, 
                method, 
                received !== '' ? received : this.received, 
                expected
            )
        }
    }
}

Object.assign(Expect.prototype, 
    BaseExpect, 
    AsyncExpect,
    HtmlExpect,
    ObjectExpect,
    TypeExpect,
    ThrowExpect,
    ColorExpect,
    ArrayExpect,
    MockExpect,
    ValidatorExpect,
)

/**
 * Function to create an expectation object for the given actual value,
 * providing methods to assert various conditions.
 *
 * @param received - The actual value to assert against.
 * @returns An object containing multiple assertion methods.
 */
function expect(received) {
    return  new Expect(received);
}

export { Expect, ExpectError, expect }