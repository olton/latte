import {Expect, messages} from "../src/index.js";

const customMessages = {
    toBeEven: {
        positive: 'Expected value {received} not to be even',
        negative: 'Expected value {received} to be even'
    }
}

class MyExpect extends Expect {
    toBeEven(msg) {
        let received = this.received
        let result = received % 2 === 0
        
        this.assert(
            result,
            msg,
            'toBeEven',
        )

        return this
    }
}

const expect = (received) => new MyExpect(received,{...messages, ...customMessages})

test(`Custom expect`, () => {
    expect(2).toBeEven()
    expect(3).not.toBeEven()
})
