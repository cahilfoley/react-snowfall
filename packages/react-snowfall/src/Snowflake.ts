import isEqual from 'react-fast-compare'
import { lerp, random, randomElement } from './utils'

export type SnowflakeImageInput =
  | HTMLImageElement
  | SVGImageElement
  | HTMLVideoElement
  | HTMLCanvasElement
  | ImageBitmap

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
  images?: SnowflakeImageInput[]
}

export type SnowflakeConfig = Partial<SnowflakeProps>

export const defaultConfig: SnowflakeProps = {
  color: '#dee4fd',
  radius: [0.5, 3.0],
  speed: [1.0, 3.0],
  wind: [-0.5, 2.0],
  changeFrequency: 200,
}

interface SnowflakeParams {
  x: number
  y: number
  radius: number
  rotation: number
  speed: number
  wind: number
  nextSpeed: number
  nextWind: number
  nextRotation: number
}

/**
 * An individual snowflake that will update it's location every call to `update`
 * and draw itself to the canvas every call to `draw`.
 */
class Snowflake {
  private config!: SnowflakeProps
  private params: SnowflakeParams
  private framesSinceLastUpdate: number
  private image?: SnowflakeImageInput

  public constructor(canvas: HTMLCanvasElement, config: SnowflakeConfig = {}) {
    // Set custom config
    this.updateConfig(config)

    // Setting initial parameters
    const { radius, wind, speed, images } = this.config

    this.params = {
      x: random(0, canvas.offsetWidth),
      y: random(-canvas.offsetHeight, 0),
      rotation: random(0, 360),
      radius: random(...radius),
      speed: random(...speed),
      wind: random(...wind),
      nextSpeed: random(...wind),
      nextWind: random(...speed),
      nextRotation: random(0, 360),
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
    this.params.nextRotation = random(0, 360)
  }

  public update(canvas: HTMLCanvasElement, framesPassed = 1): void {
    const { x, y, rotation, nextRotation, wind, speed, nextWind, nextSpeed } = this.params

    // Update current location, wrapping around if going off the canvas
    this.params.x = (x + wind * framesPassed) % canvas.offsetWidth
    this.params.y = (y + speed * framesPassed) % canvas.offsetHeight

    // Update the wind and speed towards the desired values
    this.params.speed = lerp(speed, nextSpeed, 0.01)
    this.params.wind = lerp(wind, nextWind, 0.01)
    this.params.rotation = lerp(rotation, nextRotation, 0.01)

    if (this.framesSinceLastUpdate++ > this.config.changeFrequency) {
      this.updateTargetParams()
      this.framesSinceLastUpdate = 0
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save()
    ctx.translate(this.params.x, this.params.y)

    if (this.image) {
      ctx.rotate((this.params.rotation * Math.PI) / 180)
      ctx.drawImage(
        this.image,
        -this.params.radius / 2,
        -this.params.radius / 2,
        this.params.radius,
        this.params.radius,
      )
    } else {
      ctx.beginPath()
      ctx.arc(0, 0, this.params.radius, 0, 2 * Math.PI)
      ctx.fillStyle = this.config.color
      ctx.closePath()
      ctx.fill()
    }

    ctx.restore()
  }
}

export default Snowflake
