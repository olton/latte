describe(`Objects tests suite`, () => {
    it(`Object is defined`, () => {
        let obj = {}
        expect(obj).toBeDefined()
    })
    it(`Object is equal to other object`, () => {
        let obj1 = {}
        let obj2 = {}
        expect(obj1).toBeEqualObject(obj2)
    })
    it(`Failed test`, () => {
        let obj1 = {a: 1}
        let obj2 = {b: 2}
        expect(obj1).toBeEqualObject(obj2)
    })
    it(`Deep Equal`, () => {
        let obj1 = {
            data: {
                get: "why",
                set: "ohh"
            },
            val: "test",
            prop: "hello",
            column: "test"
        }
        let obj2 = {
            data: {
                get: "why",
                set: "ohh"
            },
            val: "test",
            prop: "hello",
            column: "test"
        }
        expect(obj1).toBeDeepEqual(obj2)
    })
})