//
describe('Defined and Undefined tests', () => {
  it('toBeDefined', () => {
    expect(1).toBeDefined()
  })
  it('toBeNotDefined', () => {
    expect(undefined).toBeUndefined()
  })
})
