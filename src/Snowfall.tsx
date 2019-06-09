import React, { useCallback, useEffect, useRef } from 'react'
import { targetFrameTime } from './config'
import { useComponentSize, useSnowflakes, useSnowfallStyle, useRefMounted } from './hooks'

export interface SnowfallProps {
  color?: string
  snowflakeCount?: number
  style?: React.CSSProperties
}

const Snowfall = ({ color = '#dee4fd', snowflakeCount = 150, style }: SnowfallProps = {}) => {
  const mergedStyle = useSnowfallStyle(style)

  const canvasRef = useRef<HTMLCanvasElement>()
  const canvasSize = useComponentSize(canvasRef)
  const mounted = useRefMounted()

  const lastUpdate = useRef(Date.now())
  const snowflakes = useSnowflakes(canvasRef, snowflakeCount, {
    color,
  })

  const updateCanvasRef = (element: HTMLCanvasElement) => {
    canvasRef.current = element
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
        snowflakes.forEach(snowflake => snowflake.draw(canvas, ctx))
      }
    }
  }, [snowflakes])

  const update = useCallback(
    (framesPassed: number = 1) => {
      const canvas = canvasRef.current
      if (canvas) {
        snowflakes.forEach(snowflake => snowflake.update(canvas, framesPassed))
      }
    },
    [snowflakes],
  )

  const loop = useCallback(() => {
    if (mounted.current) {
      // Update based on time passed so that a slow frame rate won't slow down the snowflake
      const now = Date.now()
      const msPassed = Date.now() - lastUpdate.current
      lastUpdate.current = now

      // Frames that would have passed if running at 60 fps
      const framesPassed = msPassed / targetFrameTime

      update(framesPassed)
      draw()

      requestAnimationFrame(loop)
    }
  }, [draw, mounted, update])

  useEffect(() => loop(), [loop])

  return <canvas ref={updateCanvasRef} height={canvasSize.height} width={canvasSize.width} style={mergedStyle} />
}

export default Snowfall
