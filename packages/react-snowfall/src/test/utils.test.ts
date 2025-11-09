import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { random, lerp, randomElement, getSize, twoPi } from '../utils'

describe('utils', () => {
  describe('random', () => {
    beforeEach(() => {
      vi.spyOn(Math, 'random')
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('should return a decimal value between min and max when given decimal inputs', () => {
      vi.mocked(Math.random).mockReturnValue(0.5)
      const result = random(1.5, 3.5)
      expect(result).toBe(2.5)
      expect(Number.isInteger(result)).toBe(false)
    })

    it('should return an integer value between min and max when given integer inputs', () => {
      vi.mocked(Math.random).mockReturnValue(0.5)
      const result = random(1, 5)
      expect(result).toBe(3)
      expect(Number.isInteger(result)).toBe(true)
    })

    it('should handle integer range correctly at edge cases', () => {
      // Test minimum value (Math.random returns 0)
      vi.mocked(Math.random).mockReturnValue(0)
      expect(random(1, 5)).toBe(1)

      // Test maximum value (Math.random returns 0.9999...)
      vi.mocked(Math.random).mockReturnValue(0.9999)
      expect(random(1, 5)).toBe(5)
    })

    it('should handle decimal range correctly at edge cases', () => {
      // Test minimum value
      vi.mocked(Math.random).mockReturnValue(0)
      expect(random(1.5, 3.5)).toBe(1.5)

      // Test maximum value
      vi.mocked(Math.random).mockReturnValue(1)
      expect(random(1.5, 3.5)).toBe(3.5)
    })

    it('should return decimal when one input is not an integer', () => {
      vi.mocked(Math.random).mockReturnValue(0.5)
      const result = random(1.5, 5.5)
      // Should return decimal since inputs are decimals
      expect(Number.isInteger(result)).toBe(false)
    })

    it('should handle negative numbers correctly', () => {
      vi.mocked(Math.random).mockReturnValue(0.5)
      expect(random(-5, -1)).toBe(-3)
      expect(random(-5.5, -1.5)).toBe(-3.5)
    })

    it('should handle zero in range', () => {
      vi.mocked(Math.random).mockReturnValue(0.5)
      expect(random(-2, 2)).toBe(0)
      expect(random(0, 10)).toBe(5)
    })

    it('should handle same min and max values', () => {
      const result = random(5, 5)
      expect(result).toBe(5)
    })
  })

  describe('lerp', () => {
    it('should return start value when normal is 0', () => {
      expect(lerp(10, 20, 0)).toBe(10)
    })

    it('should return end value when normal is 1', () => {
      expect(lerp(10, 20, 1)).toBe(20)
    })

    it('should return middle value when normal is 0.5', () => {
      expect(lerp(10, 20, 0.5)).toBe(15)
    })

    it('should handle decimal values correctly', () => {
      expect(lerp(0, 100, 0.25)).toBe(25)
      expect(lerp(0, 100, 0.75)).toBe(75)
    })

    it('should handle negative numbers', () => {
      expect(lerp(-10, 10, 0.5)).toBe(0)
      expect(lerp(-20, -10, 0.5)).toBe(-15)
    })

    it('should handle very small interpolation values', () => {
      const result = lerp(100, 200, 0.01)
      expect(result).toBe(101)
    })

    it('should allow extrapolation beyond 0-1 range', () => {
      expect(lerp(10, 20, 2)).toBe(30) // Extrapolate beyond end
      expect(lerp(10, 20, -1)).toBe(0) // Extrapolate before start
    })

    it('should handle zero start value', () => {
      expect(lerp(0, 100, 0.3)).toBe(30)
    })

    it('should handle zero end value', () => {
      expect(lerp(100, 0, 0.3)).toBe(70)
    })
  })

  describe('randomElement', () => {
    beforeEach(() => {
      vi.spyOn(Math, 'random')
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('should return first element when Math.random returns 0', () => {
      vi.mocked(Math.random).mockReturnValue(0)
      const items = ['a', 'b', 'c']
      expect(randomElement(items)).toBe('a')
    })

    it('should return last element when Math.random returns near 1', () => {
      vi.mocked(Math.random).mockReturnValue(0.9999)
      const items = ['a', 'b', 'c']
      expect(randomElement(items)).toBe('c')
    })

    it('should return middle element for middle random value', () => {
      vi.mocked(Math.random).mockReturnValue(0.5)
      const items = ['a', 'b', 'c']
      expect(randomElement(items)).toBe('b')
    })

    it('should work with single element array', () => {
      const items = ['only']
      expect(randomElement(items)).toBe('only')
    })

    it('should work with different types', () => {
      vi.mocked(Math.random).mockReturnValue(0)

      const numbers = [1, 2, 3]
      expect(randomElement(numbers)).toBe(1)

      const objects = [{ id: 1 }, { id: 2 }]
      expect(randomElement(objects)).toEqual({ id: 1 })
    })

    it('should handle array of different types via generics', () => {
      vi.mocked(Math.random).mockReturnValue(0.5)

      type Mixed = string | number
      const items: Mixed[] = ['a', 1, 'b', 2]
      const result = randomElement(items)
      expect(['a', 1, 'b', 2]).toContain(result)
    })
  })

  describe('getSize', () => {
    it('should return zero dimensions for null element', () => {
      const result = getSize(null)
      expect(result).toEqual({ height: 0, width: 0 })
    })

    it('should return zero dimensions for undefined element', () => {
      const result = getSize(undefined)
      expect(result).toEqual({ height: 0, width: 0 })
    })

    it('should return offsetHeight and offsetWidth for valid element', () => {
      const mockElement = {
        offsetHeight: 100,
        offsetWidth: 200,
      } as HTMLElement

      const result = getSize(mockElement)
      expect(result).toEqual({ height: 100, width: 200 })
    })

    it('should handle zero-sized elements', () => {
      const mockElement = {
        offsetHeight: 0,
        offsetWidth: 0,
      } as HTMLElement

      const result = getSize(mockElement)
      expect(result).toEqual({ height: 0, width: 0 })
    })

    it('should handle very large elements', () => {
      const mockElement = {
        offsetHeight: 99999,
        offsetWidth: 88888,
      } as HTMLElement

      const result = getSize(mockElement)
      expect(result).toEqual({ height: 99999, width: 88888 })
    })
  })

  describe('twoPi', () => {
    it('should equal 2 * Math.PI', () => {
      expect(twoPi).toBe(Math.PI * 2)
    })

    it('should be approximately 6.283185307179586', () => {
      expect(twoPi).toBeCloseTo(6.283185307179586, 10)
    })

    it('should be a constant value', () => {
      const value1 = twoPi
      const value2 = twoPi
      expect(value1).toBe(value2)
    })
  })
})
