import Snowflake, { SnowflakeConfig, defaultConfig } from './Snowflake.js'
import { targetFrameTime } from './config.js'

export interface SnowfallCanvasConfig extends SnowflakeConfig {
  /**
   * The number of snowflakes to be rendered.
   *
   * The default value is 150.
   */
  snowflakeCount: number
}

export class SnowfallCanvas {
  private lastUpdate = Date.now()
  private snowflakes: Snowflake[] = []
  private config: SnowfallCanvasConfig

  #ctx: CanvasRenderingContext2D | null
  get ctx() {
    return this.#ctx
  }

  #canvas: HTMLCanvasElement
  get canvas() {
    return this.#canvas
  }
  set canvas(canvas: HTMLCanvasElement) {
    this.#canvas = canvas
    this.#ctx = canvas.getContext('2d')
  }

  constructor(canvas: HTMLCanvasElement, config: Partial<SnowfallCanvasConfig>) {
    this.#canvas = canvas
    this.#ctx = canvas.getContext('2d')
    this.config = { snowflakeCount: 150, ...defaultConfig, ...config }
    this.snowflakes = []
    this.snowflakes = Snowflake.createSnowflakes(canvas, config.snowflakeCount || 150, config)
    this.play()
  }

  /**
   * Updates the config used for the snowfall animation, if the number of snowflakes
   * has changed then this will create new or remove existing snowflakes gracefully
   * to retain the position of as many existing snowflakes as possible.
   */
  updateConfig(config: Partial<SnowfallCanvasConfig>) {
    this.config = { ...this.config, ...config }

    const sizeDifference = this.config.snowflakeCount - this.snowflakes.length

    if (sizeDifference > 0) {
      this.snowflakes = [...this.snowflakes, ...Snowflake.createSnowflakes(this.canvas, sizeDifference, config)]
    }

    if (sizeDifference < 0) {
      this.snowflakes = this.snowflakes.slice(0, this.config.snowflakeCount)
    }

    for (const snowflake of this.snowflakes) {
      snowflake.updateConfig(this.config)
    }
  }

  /**
   * Updates the location of each snowflake based on the number of frames passed then
   * clears the canvas and draws each snowflake.
   */
  private render(framesPassed = 1) {
    const { ctx, canvas, snowflakes } = this

    if (!ctx || !canvas) return

    const { offsetWidth, offsetHeight } = canvas

    // Update the position of each snowflake
    for (const snowflake of snowflakes) {
      snowflake.update(offsetWidth, offsetHeight, framesPassed)
    }

    // Render the snowflakes
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, offsetWidth, offsetHeight)

    // If using images, draw each image individually
    if (this.config.images && this.config.images.length > 0) {
      for (const snowflake of snowflakes) {
        snowflake.drawImage(ctx)
      }
      return
    }

    // Not using images, draw circles in a single path
    ctx.beginPath()
    for (const snowflake of snowflakes) {
      snowflake.drawCircle(ctx)
    }
    ctx.fillStyle = this.config.color!
    ctx.fill()
  }

  private animationFrame: number | undefined

  /**
   * The animation loop, will calculate the time since the last render and update
   * the position of the snowflakes appropriately before queueing another frame.
   */
  private loop() {
    // Update based on time passed so that a slow frame rate won't slow down the snowflake
    const now = Date.now()
    const msPassed = Date.now() - this.lastUpdate
    this.lastUpdate = now

    // Frames that would have passed if running at 60 fps
    const framesPassed = msPassed / targetFrameTime

    this.render(framesPassed)

    this.animationFrame = requestAnimationFrame(() => this.loop())
  }

  /** Start the animation playing. */
  play() {
    this.loop()
  }

  /** Pause the animation. */
  pause() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
      this.animationFrame = undefined
    }
  }
}

export default SnowfallCanvas
