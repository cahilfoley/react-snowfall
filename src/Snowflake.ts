import { random, lerp } from './utils'

export interface SnowflakeConfig {
  color?: string
  radius?: [number, number]
  speed?: [number, number]
  wind?: [number, number]
  changeFrequency?: number
}

interface SnowflakeProps {
  color: string
  radius: [number, number]
  speed: [number, number]
  wind: [number, number]
  changeFrequency: number
}

const defaultConfig: SnowflakeProps = {
  color: '#dee4fd',
  radius: [0.5, 3.0],
  speed: [1, 3],
  wind: [-0.5, 2],
  changeFrequency: 200
}

interface SnowflakeParams {
  color: string
  x: number
  y: number
  radius: number
  speed: number
  wind: number
  isResized: boolean
  nextSpeed: number
  nextWind: number
}

/**
 * An individual snowflake that will update it's location every call to `draw`
 */
class Snowflake {
  config: SnowflakeProps
  params: SnowflakeParams
  framesSinceLastUpdate: number

  constructor(canvas: HTMLCanvasElement, config?: SnowflakeConfig) {
    // Merging input config with default config
    this.config = {
      ...defaultConfig,
      ...config
    }

    // Setting initial parameters
    const { color, radius, wind, speed } = this.config
    this.params = {
      color,
      x: random(0, canvas.offsetWidth),
      y: random(-canvas.offsetHeight, 0),
      radius: random(...radius),
      speed: random(...speed),
      wind: random(...wind),
      isResized: false,
      nextSpeed: random(...wind),
      nextWind: random(...speed)
    }

    this.framesSinceLastUpdate = 0
  }

  resized = () => (this.params.isResized = true)

  draw = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.beginPath()
      ctx.arc(this.params.x, this.params.y, this.params.radius, 0, 2 * Math.PI)
      ctx.fillStyle = this.params.color
      ctx.fill()
      ctx.closePath()
    }
  }

  translate = (framesPassed: number = 1) => {
    this.params.y += this.params.speed * framesPassed
    this.params.x += this.params.wind * framesPassed

    this.params.speed = lerp(this.params.speed, this.params.nextSpeed, 0.01)
    this.params.wind = lerp(this.params.wind, this.params.nextWind, 0.01)

    if (this.framesSinceLastUpdate++ > this.config.changeFrequency) {
      this.updateTargetParams()
      this.framesSinceLastUpdate = 0
    }
  }

  updateTargetParams = () => {
    this.params.nextSpeed = random(...this.config.speed)
    this.params.nextWind = random(...this.config.wind)
  }

  handleOffScreen = (canvas: HTMLCanvasElement) => {
    if (this.params.x > canvas.offsetWidth) {
      this.params.x = 0
    }

    if (this.params.y > canvas.offsetHeight) {
      this.params.y = 0
    }
  }

  update = (canvas: HTMLCanvasElement, framesPassed?: number) => {
    this.translate(framesPassed)
    this.handleOffScreen(canvas)
  }
}

export default Snowflake
