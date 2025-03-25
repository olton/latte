describe(`Match tests`, () => {
    it('toMatch 123 and 23', () => {
        expect("123").toMatch("23")
    })
    it('not.toMatch 123 and 24', () => {
        expect("123").not.toMatch("24")
    })
    it(`toBeIP 0.0.0.0`, () => {
        expect("0.0.0.0").toBeIP()
    })
    it(`toBeNotIP 0.0.0.300`, () => {
        expect("0.0.0.300").not.toBeIP()
    })
})