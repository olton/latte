import {ExpectError} from "./errors.js";
import BaseExpect from "./base.js";
import AsyncExpect from "./async.js";
import HtmlExpect from "./html.js";
import ObjectExpect from "./object.js";
import TypeExpect from "./type.js";
import ThrowExpect from "./throw.js";
import ColorExpect from "./color.js";
import ArrayExpect from "./array.js";
import MockExpect from "./mock.js";
import ValidatorExpect from "./validator.js";

class Expect {
    received = null
    control = true

    constructor(received, control = true) {
        this.received = received
        this.control = control
    }
    
    get not() {
        return new Expect(this.received, !this.control)
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