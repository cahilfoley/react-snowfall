import { lerp, random } from './utils'

export interface SnowflakeProps {
  /** The color of the snowflake, can be any valid CSS color. */
  color: string
  /**
   * The minimum and maximum radius of the snowflake, will be
   * randomly selected within this range.
   * 
   * The default value is `[0.5, 3.0]`.
   */
  radius: [minimumRadius: number, maximumRadius: number]
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
  speed: [minimumSpeed: number, maximumSpeed: number]
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
  wind: [minimumWind: number, maximumWind: number]
  /** 
   * The frequency in frames that the wind and speed values
   * will update.
   * 
   * The default value is 200.
   */
  changeFrequency: number
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
  speed: number
  wind: number
  nextSpeed: number
  nextWind: number
}

/** An individual snowflake that will update it's location every call to `draw` */
class Snowflake {
  public config: SnowflakeConfig
  private params: SnowflakeParams
  private framesSinceLastUpdate: number

  public constructor(canvas: HTMLCanvasElement, config: SnowflakeConfig = {}) {
    // Set custom config
    this.config = config

    // Setting initial parameters
    const { radius, wind, speed } = this.fullConfig

    this.params = {
      x: random(0, canvas.offsetWidth),
      y: random(-canvas.offsetHeight, 0),
      radius: random(...radius),
      speed: random(...speed),
      wind: random(...wind),
      nextSpeed: random(...wind),
      nextWind: random(...speed),
    }

    this.framesSinceLastUpdate = 0
  }

  private get fullConfig() {
    return {
      ...defaultConfig,
      ...this.config,
    }
  }

  public draw = (canvas: HTMLCanvasElement, inputCtx?: CanvasRenderingContext2D) => {
    const ctx = inputCtx || canvas.getContext('2d')
    if (ctx) {
      ctx.beginPath()
      ctx.arc(this.params.x, this.params.y, this.params.radius, 0, 2 * Math.PI)
      ctx.fillStyle = this.fullConfig.color
      ctx.closePath()
      ctx.fill()
    }
  }

  private translate = (canvas: HTMLCanvasElement, framesPassed: number = 1) => {
    const { x, y, wind, speed, nextWind, nextSpeed } = this.params

    // Update current location, wrapping around if going off the canvas
    this.params.x = (x + wind * framesPassed) % canvas.offsetWidth
    this.params.y = (y + speed * framesPassed) % canvas.offsetHeight

    // Update the wind and speed towards the desired values
    this.params.speed = lerp(speed, nextSpeed, 0.01)
    this.params.wind = lerp(wind, nextWind, 0.01)

    if (this.framesSinceLastUpdate++ > this.fullConfig.changeFrequency) {
      this.updateTargetParams()
      this.framesSinceLastUpdate = 0
    }
  }

  private updateTargetParams = () => {
    this.params.nextSpeed = random(...this.fullConfig.speed)
    this.params.nextWind = random(...this.fullConfig.wind)
  }

  public update = (canvas: HTMLCanvasElement, framesPassed?: number) => {
    this.translate(canvas, framesPassed)
  }
}

export default Snowflake
