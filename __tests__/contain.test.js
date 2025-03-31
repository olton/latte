describe('Contain tests', () => {
  it('[1, 2, 3] contain 1', () => {
    expect([1, 2, 3]).toContain(1)
  })
  it('[1, 2, 3] not contain 4', () => {
    expect([1, 2, 3]).not.toContain(4)
  })
  it('123 contain 23', () => {
    expect('123').toContain('23')
  })
  it('123 not contain 24', () => {
    expect('123').not.toContain('24')
  })
  it('{a: 1} contain prop a', () => {
    expect({ a: 1 }).toContain('a')
  })
  it('{a: 1} not contain prop b', () => {
    expect({ a: 1 }).not.toContain('b')
  })
})
