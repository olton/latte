export class ExpectError extends Error {
    constructor(message, matcher, received = null, expected = null) {
        super(message)
        this.name = matcher
        this.received = received
        this.expected = expected
    }
}
