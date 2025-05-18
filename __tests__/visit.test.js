import { B } from '../src/index.js'

const url = 'http://example.com/'

beforeAll(async () => {
  await B.create()
})

afterAll(async () => {
  await B.bye()
})

describe('Browser tests', () => {
  it('Visit example.com', async () => {
    await B.visit(url)
    const title = await B.document.title()
    expect(title).toContain('Example Domain', 'Title test failed')
  })
  it('Check Metro object', async () => {
    await B.visit('https://metroui.org.ua')
    const metro = await B.window('Metro')
    expect(metro).toBeDefined('Metro is undefined')
  })
  it('Visit metroui.org.ua', async () => {
    await B.visit('https://metroui.org.ua')
    const window = await B.window('location')
    expect(window).toBeDefined('Window is undefined')
  })
})
