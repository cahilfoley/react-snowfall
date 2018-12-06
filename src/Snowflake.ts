import { random } from './utils'

export interface SnowflakeConfig {
  color?: string
  radius?: [number, number]
  speed?: [number, number]
  wind?: [number, number]
}

interface SnowflakeProps {
  color: string
  radius: [number, number]
  speed: [number, number]
  wind: [number, number]
}

const defaultConfig: SnowflakeProps = {
  color: '#dee4fd',
  radius: [0.5, 3.0],
  speed: [1, 3],
  wind: [-0.5, 3.0]
}

interface SnowflakeParams {
  color: string
  x: number
  y: number
  radius: number
  speed: number
  wind: number
  isResized: boolean
}

class Snowflake {
  config: SnowflakeProps
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  params: SnowflakeParams

  constructor(canvas: HTMLCanvasElement, config?: SnowflakeConfig) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    // Merging input config with default config
    this.config = {
      ...defaultConfig,
      ...config
    }

    // Setting initial parameters
    const { color, radius, wind, speed } = this.config
    this.params = {
      color,
      x: random(0, this.canvas.offsetWidth),
      y: random(-this.canvas.offsetHeight, 0),
      radius: random(...radius),
      speed: random(...speed),
      wind: random(...wind),
      isResized: false
    }
  }

  updateData = () => {
    this.params.x = random(0, this.canvas.offsetWidth)
    this.params.y = random(-this.canvas.offsetHeight, 0)
  }

  resized = () => (this.params.isResized = true)

  draw = () => {
    this.ctx.beginPath()
    this.ctx.arc(
      this.params.x,
      this.params.y,
      this.params.radius,
      0,
      2 * Math.PI
    )
    this.ctx.fillStyle = this.params.color
    this.ctx.fill()
    this.ctx.closePath()
  }

  translate = () => {
    this.params.y += this.params.speed
    this.params.x += this.params.wind
  }

  onDown = () => {
    if (this.params.y < this.canvas.offsetHeight) {
      return
    }

    if (this.params.isResized) {
      this.updateData()
      this.params.isResized = false
    } else {
      this.params.y = 0
      this.params.x = random(0, this.canvas.offsetWidth)
    }
  }

  update = () => {
    this.translate()
    this.onDown()
  }
}

export default Snowflake
