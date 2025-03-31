describe('DOM tests', () => {
  it('Create div', () => {
    const div = document.createElement('div')
    expect(div).toBeHtmlElement()
  })
})
