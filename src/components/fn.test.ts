import { nextLoop } from './MyBox'

describe('Walk item array', function () {
  test('x', () => {
    const slotItem = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    ]
    const perPage = 4
    const startIndex = 0
    const x = nextLoop(slotItem, startIndex, perPage)
    console.log(x)
  })
})
