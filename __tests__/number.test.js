describe(`Number tests`, () => {
    it(`toBeGreaterThan 2 > 1`, () => {
        expect(2).toBeGreaterThan(1)
    })
    it(`toBeGreaterThanOrEqual 2 >= 1`, () => {
        expect(2).toBeGreaterThanOrEqual(2)
    })
    it(`toBeLessThan 1 < 2`, () => {
        expect(1).toBeLessThan(2)
    })
    it(`toBeLessThanOrEqual 2 <= 2`, () => {
        expect(2).toBeLessThanOrEqual(2)
    })
    it(`toBetween 2 between 1 and 3`, () => {
        expect(2).toBetween(1, 3)
    })
    it(`toBeInteger 1 is integer`, () => {
        expect(1).toBeInteger()
    })
    it(`toBeNotInteger 1.0 is not integer`, () => {
        expect(1.01).not.toBeInteger()
    })
    it(`toBeSafeInteger 1 is integer`, () => {
        expect(Number.MAX_SAFE_INTEGER).toBeSafeInteger()
    })
    it(`toBeNotSafeInteger 1.0 is not integer`, () => {
        expect(Number.MAX_SAFE_INTEGER + 1).not.toBeSafeInteger()
    })
    it(`toBeFloat 1.01 is float`, () => {
        expect(1.01).toBeFloat()
    })
    it(`toBePositive 1 is positive`, () => {
        expect(1).toBePositive()
    })
    it(`toBeNegative -1 is negative`, () => {
        expect(-1).toBeNegative()
    })
    it(`toBeFinite 1 is finite`, () => {
        expect(1).toBeFinite()
    })
    it(`toBeNumber 1 is number`, () => {
        expect(1).toBeNumber()
    })
    it(`toBeNumber "1" is not a number`, () => {
        expect("1").toBeNumber()
    })
    it(`toBeNaN '~1' is NaN`, () => {
        expect('~1').toBeNaN()
    })
    it(`toBeCloseTo 0.3 + 0.6 = 0.9`, () => {
        expect(0.3 + 0.6).toBeCloseTo(0.9)
    })
})