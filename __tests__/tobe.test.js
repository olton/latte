describe('toBe tests', () => {
  it('toBe', () => {
    expect(1).toBe(1)
  })
  it('1 not.toBe 2', () => {
    expect(1).not.toBe(2)
  })
  it('toBeStrictEqual', () => {
    expect('123').toBeStrictEqual('123')
  })
  it('toBeNotStrictEqual', () => {
    expect('123').not.toBeStrictEqual(123)
  })
  it('toBeEqual', () => {
    expect('123').toBeEqual(123)
  })
  it('toBeNotEqual', () => {
    expect('123').not.toBeEqual(124)
  })
})
