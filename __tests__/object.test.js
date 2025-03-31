describe('Objects tests', () => {
  it('toBeObject {} == {}', () => {
    return expect({}).toBeObject({})
  })
  it('toBeObject {a: 1} == {a: 1}', () => {
    return expect({ a: 1 }).toBeObject({ a: 1 })
  })
})
