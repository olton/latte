describe(`Array tests`, () => {
    it('toBeArray [] == []', () => {
        return expect([]).toBeArray()
    })
    it('not.toBeArray 1 == []', () => {
        return expect(1).not.toBeArray()
    })
    it(`toBeArraySorted [1, 2, 3]`, () => {
        return expect([1, 2, 3]).toBeArraySorted()
    })
    it(`toBeArrayNotSorted [4, 1, 2, 3]`, () => {
        return expect([4, 1, 2, 3]).not.toBeArraySorted()
    })
    it(`toBeArrayUnique [1, 2, 3]`, () => {
        return expect([1, 2, 3]).toBeArrayUnique()
    })
    it(`toBeArrayNotUnique [1, 2, 3, 3]`, () => {
        return expect([1, 2, 3, 3]).not.toBeArrayUnique()
    })
    it(`hasLength 3`, () => {
        return expect([1, 2, 3]).hasLength(3)
    })
    it(`contain 2`, () => {
        return expect([1, 2, 3]).toContain(2)
    })
})