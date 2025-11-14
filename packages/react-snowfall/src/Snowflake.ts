import isEqual from 'react-fast-compare'
import { lerp, random, randomElement, twoPi } from './utils.js'

export interface SnowflakeProps {
  /** The color of the snowflake, can be any valid CSS color. */
  color: string
  /**
   * The minimum and maximum radius of the snowflake, will be
   * randomly selected within this range.
   *
   * The default value is `[0.5, 3.0]`.
   */
  radius: [number, number]
  /**
   * The minimum and maximum speed of the snowflake.
   *
   * The speed determines how quickly the snowflake moves
   * along the y axis (vertical speed).
   *
   * The values will be randomly selected within this range.
   *
   * The default value is `[1.0, 3.0]`.
   */
  speed: [number, number]
  /**
   * The minimum and maximum wind of the snowflake.
   *
   * The wind determines how quickly the snowflake moves
   * along the x axis (horizontal speed).
   *
   * The values will be randomly selected within this range.
   *
   * The default value is `[-0.5, 2.0]`.
   */
  wind: [number, number]
  /**
   * The frequency in frames that the wind and speed values
   * will update.
   *
   * The default value is 200.
   */
  changeFrequency: number
  /**
   * An array of images that will be rendered as the snowflakes instead
   * of the default circle shapes.
   */
  images?: CanvasImageSource[]
  /**
   * The minimum and maximum rotation speed of the snowflake (in degrees of
   * rotation per frame).
   *
   * The rotation speed determines how quickly the snowflake rotates when
   * an image is being rendered.
   *
   * The values will be randomly selected within this range.
   *
   * The default value is `[-1.0, 1.0]`.
   */
  rotationSpeed: [number, number]
  /**
   * The minimum and maximum opacity of the snowflake image.
   *
   * This value only applies to snowflakes that are using images.
   *
   * The values will be randomly selected within this range.
   *
   * The default value is `[1, 1]`.
   */
  opacity: [number, number]
  /**
   * Enable 3D rotation effect (like falling leaves).
   *
   * When enabled, snowflakes will rotate on X and Y axes in addition to Z axis,
   * creating a more realistic 3D tumbling effect.
   *
   * The default value is `false`.
   */
  enable3DRotation?: boolean
}

export type SnowflakeConfig = Partial<SnowflakeProps>

export const defaultConfig: SnowflakeProps = {
  color: '#dee4fd',
  radius: [0.5, 3.0],
  speed: [1.0, 3.0],
  wind: [-0.5, 2.0],
  changeFrequency: 200,
  rotationSpeed: [-1.0, 1.0],
  opacity: [1, 1],
  enable3DRotation: false,
}

interface SnowflakeParams {
  x: number
  y: number
  radius: number
  rotation: number
  rotationSpeed: number
  speed: number
  wind: number
  nextSpeed: number
  nextWind: number
  nextRotationSpeed: number
  opacity: number
  hasNextOpacity: boolean
  // 3D rotation parameters
  rotationX: number
  rotationY: number
  rotationSpeedX: number
  rotationSpeedY: number
  nextRotationSpeedX: number
  nextRotationSpeedY: number
}

/**
 * An individual snowflake that will update it's location every call to `update`
 * and draw itself to the canvas every call to `draw`.
 */
class Snowflake {
  private static offscreenCanvases = new WeakMap<CanvasImageSource, Record<number, HTMLCanvasElement>>()

  /**
   * A utility function to create a collection of snowflakes
   * @param canvas The canvas element
   * @param amount The number of snowflakes
   * @param config The configuration for each snowflake
   */
  static createSnowflakes(canvas: HTMLCanvasElement | null, amount: number, config: SnowflakeConfig): Snowflake[] {
    if (!canvas) return []

    const snowflakes: Snowflake[] = []

    for (let i = 0; i < amount; i++) {
      snowflakes.push(new Snowflake(canvas, config))
    }

    return snowflakes
  }

  private config!: SnowflakeProps
  private params: SnowflakeParams
  private framesSinceLastUpdate: number
  private image?: CanvasImageSource

  public constructor(canvas: HTMLCanvasElement, config: SnowflakeConfig = {}) {
    // Set custom config
    this.updateConfig(config)

    // Setting initial parameters
    const { radius, wind, speed, rotationSpeed, opacity, enable3DRotation } = this.config

    this.params = {
      x: random(0, canvas.offsetWidth),
      y: random(-canvas.offsetHeight, 0),
      rotation: random(0, 360),
      radius: random(...radius),
      speed: random(...speed),
      wind: random(...wind),
      rotationSpeed: random(...rotationSpeed),
      nextSpeed: random(...speed),
      nextWind: random(...wind),
      nextRotationSpeed: random(...rotationSpeed),
      opacity: random(...opacity),
      hasNextOpacity: false,
      // Initialize 3D rotation parameters
      rotationX: enable3DRotation ? random(0, 360) : 0,
      rotationY: enable3DRotation ? random(0, 360) : 0,
      rotationSpeedX: enable3DRotation ? random(-2.0, 2.0) : 0,
      rotationSpeedY: enable3DRotation ? random(-2.0, 2.0) : 0,
      nextRotationSpeedX: enable3DRotation ? random(-2.0, 2.0) : 0,
      nextRotationSpeedY: enable3DRotation ? random(-2.0, 2.0) : 0,
    }

    this.framesSinceLastUpdate = 0
  }

  private selectImage() {
    if (this.config.images && this.config.images.length > 0) {
      this.image = randomElement(this.config.images)
    } else {
      this.image = undefined
    }
  }

  public updateConfig(config: SnowflakeConfig): void {
    const previousConfig = this.config
    this.config = { ...defaultConfig, ...config }
    this.config.changeFrequency = random(this.config.changeFrequency, this.config.changeFrequency * 1.5)

    // Update the radius if the config has changed, it won't gradually update on it's own
    if (this.params && !isEqual(this.config.radius, previousConfig?.radius)) {
      this.params.radius = random(...this.config.radius)
    }

    if (!isEqual(this.config.images, previousConfig?.images)) {
      this.selectImage()
    }

    if (previousConfig?.opacity && !isEqual(this.config.opacity, previousConfig?.opacity)) {
      this.params.hasNextOpacity = true
    }
  }

  private updateTargetParams(): void {
    this.params.nextSpeed = random(...this.config.speed)
    this.params.nextWind = random(...this.config.wind)
    if (this.image) {
      this.params.nextRotationSpeed = random(...this.config.rotationSpeed)
    }
    if (this.config.enable3DRotation) {
      this.params.nextRotationSpeedX = random(-2.0, 2.0)
      this.params.nextRotationSpeedY = random(-2.0, 2.0)
    }
  }

  public update(offsetWidth: number, offsetHeight: number, framesPassed = 1): void {
    const { x, y, rotation, rotationSpeed, nextRotationSpeed, wind, speed, nextWind, nextSpeed, radius } = this.params

    // Update current location, wrapping around if going off the canvas
    this.params.x = (x + wind * framesPassed) % (offsetWidth + radius * 2)
    if (this.params.x > offsetWidth + radius) this.params.x = -radius
    this.params.y = (y + speed * framesPassed) % (offsetHeight + radius * 2)
    if (this.params.y > offsetHeight + radius) {
      if (this.params.hasNextOpacity) {
        this.params.opacity = random(...this.config.opacity)
        this.params.hasNextOpacity = false
      }
      this.params.y = -radius
    }

    // Apply rotation
    if (this.image || this.config.enable3DRotation) {
      this.params.rotation = (rotation + rotationSpeed) % 360
    }

    // Apply 3D rotation if enabled
    if (this.config.enable3DRotation) {
      this.params.rotationX = (this.params.rotationX + this.params.rotationSpeedX * framesPassed) % 360
      this.params.rotationY = (this.params.rotationY + this.params.rotationSpeedY * framesPassed) % 360
    }

    // Update the wind, speed and rotation towards the desired values
    this.params.speed = lerp(speed, nextSpeed, 0.01)
    this.params.wind = lerp(wind, nextWind, 0.01)
    this.params.rotationSpeed = lerp(rotationSpeed, nextRotationSpeed, 0.01)

    if (this.config.enable3DRotation) {
      this.params.rotationSpeedX = lerp(this.params.rotationSpeedX, this.params.nextRotationSpeedX, 0.01)
      this.params.rotationSpeedY = lerp(this.params.rotationSpeedY, this.params.nextRotationSpeedY, 0.01)
    }

    if (this.framesSinceLastUpdate++ > this.config.changeFrequency) {
      this.updateTargetParams()
      this.framesSinceLastUpdate = 0
    }
  }

  private getImageOffscreenCanvas(image: CanvasImageSource, size: number): CanvasImageSource {
    if (image instanceof HTMLImageElement && image.loading) return image
    let sizes = Snowflake.offscreenCanvases.get(image)

    if (!sizes) {
      sizes = {}
      Snowflake.offscreenCanvases.set(image, sizes)
    }

    if (!(size in sizes)) {
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      canvas.getContext('2d')?.drawImage(image, 0, 0, size, size)
      sizes[size] = canvas
    }

    return sizes[size] ?? image
  }

  /**
   * Applies 3D rotation transform to the canvas context.
   * This method calculates and applies the transformation matrix for 3D rotation effects.
   *
   * @param ctx The canvas context to apply the transform to
   * @param x The x position to translate to
   * @param y The y position to translate to
   */
  private apply3DTransform(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    if (this.config.enable3DRotation) {
      const { rotationX, rotationY } = this.params
      const rotation = this.params.rotation || 0

      // Convert degrees to radians
      const radX = (rotationX * Math.PI) / 180
      const radY = (rotationY * Math.PI) / 180
      const radZ = (rotation * Math.PI) / 180

      // Calculate 3D rotation matrices
      const cosX = Math.cos(radX)
      const sinX = Math.sin(radX)
      const cosY = Math.cos(radY)
      const sinY = Math.sin(radY)
      const cosZ = Math.cos(radZ)
      const sinZ = Math.sin(radZ)

      // Combined rotation matrix (Z * Y * X)
      // This creates a 3D tumbling effect
      const a = cosZ * cosY
      const b = cosZ * sinY * sinX - sinZ * cosX
      const c = cosZ * sinY * cosX + sinZ * sinX
      const d = sinZ * cosY

      // Apply perspective scaling based on rotation (simulates depth)
      const perspectiveScale = 0.5 + 0.5 * cosX * cosY
      const scaleX = perspectiveScale
      const scaleY = perspectiveScale

      // Apply the transform
      // The arguments for setTransform are: a, b, c, d, e, f
      // a (scaleX), b (skewY), c (skewX), d (scaleY), e (translateX), f (translateY)
      ctx.setTransform(a * scaleX, b * scaleX, c * scaleY, d * scaleY, x, y)
    } else {
      // Original 2D rotation (only for images)
      const rotation = this.params.rotation || 0
      const radian = (rotation * Math.PI) / 180
      const cos = Math.cos(radian)
      const sin = Math.sin(radian)

      // The arguments for setTransform are: a, b, c, d, e, f
      // a (scaleX), b (skewY), c (skewX), d (scaleY), e (translateX), f (translateY)
      ctx.setTransform(cos, sin, -sin, cos, x, y)
    }
  }

  /**
   * Draws a circular snowflake to the canvas.
   *
   * This method should only be called if our config does not have images.
   *
   * This method assumes that a path has already been started on the canvas.
   * `ctx.beginPath()` should be called before calling this method.
   *
   * After calling this method, the fillStyle should be set to the snowflake's
   * color and `ctx.fill()` should be called to fill the snowflake.
   *
   * Calling `ctx.fill()` after multiple snowflakes have had `drawCircle` called
   * will render all of the snowflakes since the last call to `ctx.beginPath()`.
   *
   * @param ctx The canvas context to draw to
   */
  public drawCircle(ctx: CanvasRenderingContext2D): void {
    // If 3D rotation is enabled, we need to draw individually with transform
    // This method is called when 3D rotation is disabled (for performance)
    ctx.moveTo(this.params.x, this.params.y)
    ctx.arc(this.params.x, this.params.y, this.params.radius, 0, twoPi)
  }

  /**
   * Draws a circular snowflake with 3D rotation effect to the canvas.
   *
   * This method is used when 3D rotation is enabled and images are not being used.
   *
   * @param ctx The canvas context to draw to
   * @param color The color to fill the circle with
   */
  public drawCircle3D(ctx: CanvasRenderingContext2D, color: string): void {
    const { x, y, radius } = this.params

    ctx.save()

    // Apply 3D rotation transform
    if (this.config.enable3DRotation) {
      this.apply3DTransform(ctx, x, y)
    } else {
      // No transform needed for circles without 3D rotation
      ctx.translate(x, y)
    }

    // Draw the circle
    ctx.beginPath()
    ctx.arc(0, 0, radius, 0, twoPi)
    ctx.fillStyle = color
    ctx.fill()

    ctx.restore()
  }

  /**
   * Draws an image-based snowflake to the canvas.
   *
   * This method should only be called if our config has images.
   *
   * @param ctx The canvas context to draw to
   */
  public drawImage(ctx: CanvasRenderingContext2D): void {
    const { x, y, radius } = this.params

    // Save the current state to avoid affecting other drawings
    ctx.save()

    // Set opacity if needed
    if (this.params.opacity !== 1) {
      ctx.globalAlpha = this.params.opacity
    }

    // Apply 3D or 2D rotation transform
    this.apply3DTransform(ctx, x, y)

    // Draw the image with the center of the image at the center of the current location
    const image = this.getImageOffscreenCanvas(this.image!, radius)
    ctx.drawImage(image, -(radius / 2), -(radius / 2), radius, radius)

    // Restore the transform
    ctx.restore()
  }
}

export default Snowflake
