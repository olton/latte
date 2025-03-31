describe('Throw tests', () => {
  it('toThrow', () => {
    expect(() => { throw new Error('error') }).toThrow()
  })
  it('toThrowError', () => {
    expect(() => { throw new Error('error') }).toThrowError(/error/)
  })
})
