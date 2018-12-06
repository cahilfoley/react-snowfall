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
  params: SnowflakeParams

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
      isResized: false
    }
  }

  updateData = (canvas: HTMLCanvasElement) => {
    this.params.x = random(0, canvas.offsetWidth)
    this.params.y = random(-canvas.offsetHeight, 0)
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

  translate = () => {
    this.params.y += this.params.speed
    this.params.x += this.params.wind
  }

  onDown = (canvas: HTMLCanvasElement) => {
    if (this.params.y < canvas.offsetHeight) {
      return
    }

    if (this.params.isResized) {
      this.updateData(canvas)
      this.params.isResized = false
    } else {
      this.params.y = 0
      this.params.x = random(0, canvas.offsetWidth)
    }
  }

  update = (canvas: HTMLCanvasElement) => {
    this.translate()
    this.onDown(canvas)
  }
}

export default Snowflake
