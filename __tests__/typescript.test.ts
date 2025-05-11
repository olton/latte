// @ts-ignore
import {describe, expect, it, suite} from "../src/index.js";

describe('123', () => {
    it('should run a simple test', () => {
        expect(1 + 1).toBe(2);
    });
})

suite('234', () => {
    it('should run a simple test', () => {
        expect(1 + 1).toBe(2);
    });
})

