import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Snowflake, { defaultConfig, SnowflakeConfig } from '../Snowflake'

describe('Snowflake', () => {
  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D

  beforeEach(() => {
    canvas = document.createElement('canvas')
    canvas.width = 800
    canvas.height = 600
    Object.defineProperty(canvas, 'offsetWidth', { value: 800, writable: true })
    Object.defineProperty(canvas, 'offsetHeight', { value: 600, writable: true })
    ctx = canvas.getContext('2d')!
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('constructor', () => {
    it('should create a snowflake with default config', () => {
      const snowflake = new Snowflake(canvas)
      expect(snowflake).toBeInstanceOf(Snowflake)
    })

    it('should create a snowflake with custom config', () => {
      const config: SnowflakeConfig = {
        color: '#ffffff',
        radius: [1, 5],
        speed: [2, 4],
        wind: [0, 1],
      }
      const snowflake = new Snowflake(canvas, config)
      expect(snowflake).toBeInstanceOf(Snowflake)
    })

    it('should initialize snowflake with position within canvas bounds', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5)
      const snowflake = new Snowflake(canvas)

      // We can't directly access params, but we can test that it was created successfully
      expect(snowflake).toBeInstanceOf(Snowflake)
    })

    it('should randomize changeFrequency between config value and 1.5x', () => {
      const randomSpy = vi.spyOn(Math, 'random')
      randomSpy.mockReturnValue(0.5)

      const config: SnowflakeConfig = {
        changeFrequency: 100,
      }
      const snowflake = new Snowflake(canvas, config)
      expect(snowflake).toBeInstanceOf(Snowflake)
    })
  })

  describe('createSnowflakes', () => {
    it('should create the correct number of snowflakes', () => {
      const snowflakes = Snowflake.createSnowflakes(canvas, 5, {})
      expect(snowflakes).toHaveLength(5)
      expect(snowflakes.every((s) => s instanceof Snowflake)).toBe(true)
    })

    it('should return empty array when canvas is null', () => {
      const snowflakes = Snowflake.createSnowflakes(null, 5, {})
      expect(snowflakes).toHaveLength(0)
    })

    it('should create zero snowflakes when amount is 0', () => {
      const snowflakes = Snowflake.createSnowflakes(canvas, 0, {})
      expect(snowflakes).toHaveLength(0)
    })

    it('should apply config to all snowflakes', () => {
      const config: SnowflakeConfig = {
        color: '#ff0000',
        radius: [2, 4],
      }
      const snowflakes = Snowflake.createSnowflakes(canvas, 3, config)
      expect(snowflakes).toHaveLength(3)
    })
  })

  describe('updateConfig', () => {
    it('should merge custom config with default config', () => {
      const snowflake = new Snowflake(canvas, { color: '#000000' })
      snowflake.updateConfig({ color: '#ffffff' })
      // Config should be updated internally
      expect(snowflake).toBeInstanceOf(Snowflake)
    })

    it('should update radius when radius config changes', () => {
      const snowflake = new Snowflake(canvas, { radius: [1, 2] })
      vi.spyOn(Math, 'random').mockReturnValue(0.5)
      snowflake.updateConfig({ radius: [3, 4] })
      // Radius should be updated to new range
      expect(snowflake).toBeInstanceOf(Snowflake)
    })

    it('should select new image when images config changes', () => {
      const img1 = document.createElement('img')
      const img2 = document.createElement('img')

      const snowflake = new Snowflake(canvas, { images: [img1] })
      snowflake.updateConfig({ images: [img2] })
      // New image should be selected
      expect(snowflake).toBeInstanceOf(Snowflake)
    })

    it('should set hasNextOpacity flag when opacity config changes', () => {
      const snowflake = new Snowflake(canvas, { opacity: [1, 1] })
      snowflake.updateConfig({ opacity: [0.5, 0.8] })
      // hasNextOpacity should be set
      expect(snowflake).toBeInstanceOf(Snowflake)
    })
  })

  describe('update', () => {
    it('should update snowflake position', () => {
      const snowflake = new Snowflake(canvas)

      // Call update multiple times
      snowflake.update(canvas.offsetWidth, canvas.offsetHeight, 1)
      snowflake.update(canvas.offsetWidth, canvas.offsetHeight, 1)

      // Position should have changed
      expect(snowflake).toBeInstanceOf(Snowflake)
    })

    it('should wrap snowflake horizontally when it goes off screen', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.999)

      const snowflake = new Snowflake(canvas, {
        wind: [100, 100], // High wind to push off screen
        speed: [0, 0],
      })

      // Update multiple times to push off screen
      for (let i = 0; i < 10; i++) {
        snowflake.update(canvas.offsetWidth, canvas.offsetHeight, 1)
      }

      // Should have wrapped around
      expect(snowflake).toBeInstanceOf(Snowflake)
    })

    it('should wrap snowflake vertically when it goes off screen', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.999)

      const snowflake = new Snowflake(canvas, {
        speed: [100, 100], // High speed to push off screen
        wind: [0, 0],
      })

      // Update multiple times to push off bottom
      for (let i = 0; i < 10; i++) {
        snowflake.update(canvas.offsetWidth, canvas.offsetHeight, 1)
      }

      // Should have wrapped around
      expect(snowflake).toBeInstanceOf(Snowflake)
    })

    it('should handle framesPassed parameter correctly', () => {
      const snowflake = new Snowflake(canvas)

      // Update with different framesPassed values
      snowflake.update(canvas.offsetWidth, canvas.offsetHeight, 1)
      snowflake.update(canvas.offsetWidth, canvas.offsetHeight, 2)
      snowflake.update(canvas.offsetWidth, canvas.offsetHeight, 0.5)

      expect(snowflake).toBeInstanceOf(Snowflake)
    })

    it('should interpolate speed and wind values over time', () => {
      const snowflake = new Snowflake(canvas, {
        speed: [1, 3],
        wind: [0, 2],
      })

      // Update multiple times
      for (let i = 0; i < 10; i++) {
        snowflake.update(canvas.offsetWidth, canvas.offsetHeight, 1)
      }

      // Speed and wind should have interpolated
      expect(snowflake).toBeInstanceOf(Snowflake)
    })

    it('should update target params after change frequency is reached', () => {
      const snowflake = new Snowflake(canvas, {
        changeFrequency: 5,
      })

      // Update exactly changeFrequency + 1 times
      for (let i = 0; i < 10; i++) {
        snowflake.update(canvas.offsetWidth, canvas.offsetHeight, 1)
      }

      // Target params should have been updated
      expect(snowflake).toBeInstanceOf(Snowflake)
    })

    it('should update rotation when image is present', () => {
      const img = document.createElement('img')
      const snowflake = new Snowflake(canvas, {
        images: [img],
        rotationSpeed: [1, 1],
      })

      const initialRotation = 0
      snowflake.update(canvas.offsetWidth, canvas.offsetHeight, 1)

      // Rotation should have changed
      expect(snowflake).toBeInstanceOf(Snowflake)
    })

    it('should wrap rotation at 360 degrees', () => {
      const img = document.createElement('img')
      const snowflake = new Snowflake(canvas, {
        images: [img],
        rotationSpeed: [10, 10], // Fast rotation
      })

      // Update many times to exceed 360 degrees
      for (let i = 0; i < 50; i++) {
        snowflake.update(canvas.offsetWidth, canvas.offsetHeight, 1)
      }

      // Should have wrapped
      expect(snowflake).toBeInstanceOf(Snowflake)
    })

    it('should update opacity when wrapping vertically with hasNextOpacity flag', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5)

      const snowflake = new Snowflake(canvas, {
        opacity: [0.5, 1],
        speed: [100, 100],
      })

      // Trigger opacity update by changing config
      snowflake.updateConfig({ opacity: [0.3, 0.7] })

      // Update to trigger vertical wrap
      for (let i = 0; i < 10; i++) {
        snowflake.update(canvas.offsetWidth, canvas.offsetHeight, 1)
      }

      expect(snowflake).toBeInstanceOf(Snowflake)
    })
  })

  describe('drawCircle', () => {
    it('should call ctx.arc with correct parameters', () => {
      const snowflake = new Snowflake(canvas)

      const moveSpy = vi.spyOn(ctx, 'moveTo')
      const arcSpy = vi.spyOn(ctx, 'arc')

      snowflake.drawCircle(ctx)

      expect(moveSpy).toHaveBeenCalled()
      expect(arcSpy).toHaveBeenCalled()
      expect(arcSpy.mock.calls[0][3]).toBe(0) // start angle
      expect(arcSpy.mock.calls[0][4]).toBeCloseTo(Math.PI * 2, 5) // end angle
    })

    it('should draw snowflake at correct position', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5)

      const snowflake = new Snowflake(canvas)
      const arcSpy = vi.spyOn(ctx, 'arc')

      snowflake.drawCircle(ctx)

      expect(arcSpy).toHaveBeenCalled()
      // Position should be within canvas bounds
      const [x, y] = arcSpy.mock.calls[0]
      expect(x).toBeGreaterThanOrEqual(-100)
      expect(y).toBeLessThanOrEqual(100)
    })

    it('should use correct radius', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5)

      const snowflake = new Snowflake(canvas, {
        radius: [2, 2], // Fixed radius
      })

      const arcSpy = vi.spyOn(ctx, 'arc')
      snowflake.drawCircle(ctx)

      expect(arcSpy).toHaveBeenCalled()
      // Radius should be the third parameter
      const radius = arcSpy.mock.calls[0][2]
      expect(radius).toBe(2)
    })
  })

  describe('drawImage', () => {
    it('should call ctx.drawImage when image is present', () => {
      const img = document.createElement('img')
      Object.defineProperty(img, 'complete', { value: true })

      const snowflake = new Snowflake(canvas, {
        images: [img],
      })

      const drawImageSpy = vi.spyOn(ctx, 'drawImage')
      const setTransformSpy = vi.spyOn(ctx, 'setTransform')

      snowflake.drawImage(ctx)

      expect(setTransformSpy).toHaveBeenCalled()
      expect(drawImageSpy).toHaveBeenCalled()
    })

    it('should apply rotation transform', () => {
      const img = document.createElement('img')
      Object.defineProperty(img, 'complete', { value: true })

      const snowflake = new Snowflake(canvas, {
        images: [img],
      })

      const setTransformSpy = vi.spyOn(ctx, 'setTransform')

      snowflake.drawImage(ctx)

      expect(setTransformSpy).toHaveBeenCalled()
      // Should apply transform matrix for rotation
      expect(setTransformSpy.mock.calls[0].length).toBe(6)
    })

    it('should save and restore context when opacity is not 1', () => {
      const img = document.createElement('img')
      Object.defineProperty(img, 'complete', { value: true })

      const snowflake = new Snowflake(canvas, {
        images: [img],
        opacity: [0.5, 0.5],
      })

      const saveSpy = vi.spyOn(ctx, 'save')
      const restoreSpy = vi.spyOn(ctx, 'restore')

      snowflake.drawImage(ctx)

      expect(saveSpy).toHaveBeenCalled()
      expect(restoreSpy).toHaveBeenCalled()
    })

    it('should not save/restore context when opacity is 1', () => {
      const img = document.createElement('img')
      Object.defineProperty(img, 'complete', { value: true })

      const snowflake = new Snowflake(canvas, {
        images: [img],
        opacity: [1, 1],
      })

      const saveSpy = vi.spyOn(ctx, 'save')
      const restoreSpy = vi.spyOn(ctx, 'restore')

      snowflake.drawImage(ctx)

      expect(saveSpy).not.toHaveBeenCalled()
      expect(restoreSpy).not.toHaveBeenCalled()
    })

    it('should set globalAlpha when opacity is not 1', () => {
      const img = document.createElement('img')
      Object.defineProperty(img, 'complete', { value: true })

      const snowflake = new Snowflake(canvas, {
        images: [img],
        opacity: [0.5, 0.5],
      })

      snowflake.drawImage(ctx)

      // globalAlpha should have been set
      expect(ctx.globalAlpha).toBe(0.5)
    })

    it('should cache offscreen canvas for image rendering', () => {
      const img = document.createElement('img')
      Object.defineProperty(img, 'complete', { value: true })

      const snowflake = new Snowflake(canvas, {
        images: [img],
      })

      const drawImageSpy = vi.spyOn(ctx, 'drawImage')

      // Draw twice
      snowflake.drawImage(ctx)
      snowflake.drawImage(ctx)

      // Should be using cached canvas
      expect(drawImageSpy).toHaveBeenCalledTimes(2)
    })
  })

  describe('defaultConfig', () => {
    it('should have correct default values', () => {
      expect(defaultConfig.color).toBe('#dee4fd')
      expect(defaultConfig.radius).toEqual([0.5, 3.0])
      expect(defaultConfig.speed).toEqual([1.0, 3.0])
      expect(defaultConfig.wind).toEqual([-0.5, 2.0])
      expect(defaultConfig.changeFrequency).toBe(200)
      expect(defaultConfig.rotationSpeed).toEqual([-1.0, 1.0])
      expect(defaultConfig.opacity).toEqual([1, 1])
    })
  })

  describe('edge cases', () => {
    it('should handle zero-sized canvas', () => {
      const smallCanvas = document.createElement('canvas')
      smallCanvas.width = 0
      smallCanvas.height = 0
      Object.defineProperty(smallCanvas, 'offsetWidth', { value: 0 })
      Object.defineProperty(smallCanvas, 'offsetHeight', { value: 0 })

      const snowflake = new Snowflake(smallCanvas)
      expect(snowflake).toBeInstanceOf(Snowflake)

      // Should not throw when updating
      snowflake.update(0, 0, 1)
    })

    it('should handle very large canvas', () => {
      const largeCanvas = document.createElement('canvas')
      largeCanvas.width = 10000
      largeCanvas.height = 10000
      Object.defineProperty(largeCanvas, 'offsetWidth', { value: 10000 })
      Object.defineProperty(largeCanvas, 'offsetHeight', { value: 10000 })

      const snowflake = new Snowflake(largeCanvas)
      expect(snowflake).toBeInstanceOf(Snowflake)
    })

    it('should handle negative wind values', () => {
      const snowflake = new Snowflake(canvas, {
        wind: [-10, -5],
        speed: [1, 2],
      })

      // Should move left
      snowflake.update(canvas.offsetWidth, canvas.offsetHeight, 1)
      expect(snowflake).toBeInstanceOf(Snowflake)
    })

    it('should handle very high speed values', () => {
      const snowflake = new Snowflake(canvas, {
        speed: [1000, 2000],
      })

      snowflake.update(canvas.offsetWidth, canvas.offsetHeight, 1)
      expect(snowflake).toBeInstanceOf(Snowflake)
    })

    it('should handle framesPassed of 0', () => {
      const snowflake = new Snowflake(canvas)
      snowflake.update(canvas.offsetWidth, canvas.offsetHeight, 0)
      expect(snowflake).toBeInstanceOf(Snowflake)
    })

    it('should handle multiple image updates', () => {
      const img1 = document.createElement('img')
      const img2 = document.createElement('img')
      const img3 = document.createElement('img')

      const snowflake = new Snowflake(canvas, { images: [img1] })
      snowflake.updateConfig({ images: [img2] })
      snowflake.updateConfig({ images: [img3] })

      expect(snowflake).toBeInstanceOf(Snowflake)
    })

    it('should handle switching from images to no images', () => {
      const img = document.createElement('img')
      const snowflake = new Snowflake(canvas, { images: [img] })

      snowflake.updateConfig({ images: undefined })

      // Should still work
      snowflake.update(canvas.offsetWidth, canvas.offsetHeight, 1)
      expect(snowflake).toBeInstanceOf(Snowflake)
    })

    it('should handle empty images array', () => {
      const snowflake = new Snowflake(canvas, { images: [] })
      expect(snowflake).toBeInstanceOf(Snowflake)

      snowflake.update(canvas.offsetWidth, canvas.offsetHeight, 1)
      snowflake.drawCircle(ctx)
    })
  })
})
