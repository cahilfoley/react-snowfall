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
    const { radius, wind, speed, rotationSpeed, opacity } = this.config

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
  }

  private updateTargetParams(): void {
    this.params.nextSpeed = random(...this.config.speed)
    this.params.nextWind = random(...this.config.wind)
    if (this.image) {
      this.params.nextRotationSpeed = random(...this.config.rotationSpeed)
    }
  }

  public update(offsetWidth: number, offsetHeight: number, framesPassed = 1): void {
    const { x, y, rotation, rotationSpeed, nextRotationSpeed, wind, speed, nextWind, nextSpeed, radius } = this.params

    // Update current location, wrapping around if going off the canvas
    this.params.x = (x + wind * framesPassed) % (offsetWidth + radius * 2)
    if (this.params.x > offsetWidth + radius) this.params.x = -radius
    this.params.y = (y + speed * framesPassed) % (offsetHeight + radius * 2)
    if (this.params.y > offsetHeight + radius) this.params.y = -radius

    // Apply rotation
    if (this.image) {
      this.params.rotation = (rotation + rotationSpeed) % 360
    }

    // Update the wind, speed and rotation towards the desired values
    this.params.speed = lerp(speed, nextSpeed, 0.01)
    this.params.wind = lerp(wind, nextWind, 0.01)
    this.params.rotationSpeed = lerp(rotationSpeed, nextRotationSpeed, 0.01)

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
    ctx.moveTo(this.params.x, this.params.y)
    ctx.arc(this.params.x, this.params.y, this.params.radius, 0, twoPi)
  }

  /**
   * Draws an image-based snowflake to the canvas.
   *
   * This method should only be called if our config has images.
   *
   * @param ctx The canvas context to draw to
   */
  public drawImage(ctx: CanvasRenderingContext2D): void {
    const { x, y, rotation, radius } = this.params

    const radian = (rotation * Math.PI) / 180
    const cos = Math.cos(radian)
    const sin = Math.sin(radian)

    // Save the current state to avoid affecting other drawings if changing the opacity
    if (this.params.opacity !== 1) {
      ctx.save()
      ctx.globalAlpha = this.params.opacity // Set the global alpha to the snowflake's opacity
    }

    // Translate to the location that we will be drawing the snowflake, including any rotation that needs to be applied
    // The arguments for setTransform are: a, b, c, d, e, f
    // a (scaleX), b (skewY), c (skewX), d (scaleY), e (translateX), f (translateY)
    ctx.setTransform(cos, sin, -sin, cos, x, y)

    // Draw the image with the center of the image at the center of the current location
    const image = this.getImageOffscreenCanvas(this.image!, radius)
    ctx.drawImage(image, -(radius / 2), -(radius / 2), radius, radius)

    // Reset the transform to avoid affecting other drawings if we were changing the opacity
    if (this.params.opacity !== 1) {
      ctx.restore()
    }
  }
}

export default Snowflake
