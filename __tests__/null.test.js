describe(`Null tests`, () => {
    it('toBeNull', () => {
        expect(null).toBeNull()
    })
    it('toBeNotNull', () => {
        expect(undefined).not.toBeNull()
    })
})