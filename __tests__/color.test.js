describe('Color tests', () => {
  it('toBeHEXColor #000000', () => {
    return expect('#000000').toBeHEXColor()
  })
  it('toBeHEXColor #000', () => {
    return expect('#000000').toBeHEXColor()
  })
  it('toBeRGBColor rgb(0, 0, 0)', () => {
    return expect('rgb(0, 0, 0)').toBeRGBColor()
  })
  it('toBeRGBAColor rgba(0, 0, 0, 0.5)', () => {
    return expect('rgba(0, 0, 0, 0.5)').toBeRGBAColor()
  })
  it('toBeHSVColor hsv(0, 0, 0)', () => {
    return expect('hsv(0, 0, 0)').toBeHSVColor()
  })
  it('toBeHSLColor hsl(0, 0, 0)', () => {
    return expect('hsl(0, 0, 0)').toBeHSLColor()
  })
  it('toBeHSLAColor hsla(0, 0, 0, 0.5)', () => {
    return expect('hsla(0, 0, 0, 0.5)').toBeHSLAColor()
  })
  it('toBeCMYKColor cmyk(0, 0, 0, 0)', () => {
    return expect('cmyk(0, 0, 0, 0)').toBeCMYKColor()
  })
  it('toBeColor #000000', () => {
    return expect('#000000').toBeColor()
  })
  it('toBeNotColor #000000', () => {
    return expect('#0000').not.toBeColor()
  })
})
