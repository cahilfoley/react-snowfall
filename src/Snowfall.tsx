import * as React from 'react'
import Snowflake, { SnowflakeConfig } from './Snowflake'

export interface Props {
  color?: string
  snowflakeCount?: number
  style?: React.CSSProperties
}

export interface State {
  width: number
  height: number
}

const requestAnimationFrame =
  window.requestAnimationFrame || window.webkitRequestAnimationFrame

export default class Snowfall extends React.Component<Props, State> {
  canvasRef: React.RefObject<HTMLCanvasElement>
  snowflakes: Array<Snowflake> = []
  snowflakeCount: number
  snowflakeConfig: SnowflakeConfig

  state = {
    width: document.body.clientWidth,
    height: document.body.clientHeight
  }

  constructor(props: Props) {
    super(props)
    this.snowflakeCount = props.snowflakeCount || 150
    this.snowflakeConfig = {}
    if (props.color) {
      this.snowflakeConfig.color = props.color
    }
    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    /** Create snowflakes */
    for (let i = 0; i < this.snowflakeCount; i++) {
      this.snowflakes.push(new Snowflake(this.canvas, this.snowflakeConfig))
    }

    /** Setup resize listeners */
    this.resize()
    window.addEventListener('resize', this.resize)
    document.addEventListener('resize', this.resize)

    this.loop()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
    document.removeEventListener('resize', this.resize)
  }

  resize = () => {
    this.setState({
      height: document.body.clientHeight,
      width: document.body.clientWidth
    })
  }

  get canvas() {
    return this.canvasRef.current as HTMLCanvasElement
  }

  draw = () => {
    const canvas = this.canvas
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
        this.snowflakes.forEach(snowflake => snowflake.draw(canvas))
      }
    }
  }

  update = () => {
    const canvas = this.canvas
    if (canvas) {
      this.snowflakes.forEach(snowflake => snowflake.update(canvas))
    }
  }

  loop = () => {
    if (this) {
      this.draw()
      this.update()
      requestAnimationFrame(this.loop)
    }
  }

  render() {
    const { style } = this.props
    const { height, width } = this.state

    return (
      <canvas
        ref={this.canvasRef}
        height={height}
        width={width}
        style={{
          pointerEvents: 'none',
          backgroundColor: 'transparent',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          ...style
        }}
      />
    )
  }
}
