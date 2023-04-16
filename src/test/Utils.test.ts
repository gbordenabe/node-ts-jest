import { toUpperCase } from '../app/Utils'

describe('Utils test unite', () => {
  test('should return uppercase', () => {
    const result = toUpperCase('abc')
    expect(result).toBe('ABC')
  })
})
