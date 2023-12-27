import React, { useCallback, useEffect, useRef } from 'react'
import { targetFrameTime } from './config'
import { useComponentSize, useSnowfallStyle, useSnowflakes, useDeepMemo } from './hooks'
import { SnowflakeProps, defaultConfig } from './Snowflake'

export interface SnowfallProps extends Partial<SnowflakeProps> {
  /**
   * The number of snowflakes to be rendered.
   *
   * The default value is 150.
   */
  snowflakeCount?: number
  /**
   * Any style properties that will be passed to the canvas element.
   */
  style?: React.CSSProperties
}

const Snowfall = ({
  color = defaultConfig.color,
  changeFrequency = defaultConfig.changeFrequency,
  radius = defaultConfig.radius,
  speed = defaultConfig.speed,
  wind = defaultConfig.wind,
  rotationSpeed = defaultConfig.rotationSpeed,
  snowflakeCount = 150,
  images,
  style,
}: SnowfallProps = {}): JSX.Element => {
  const mergedStyle = useSnowfallStyle(style)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasSize = useComponentSize(canvasRef)
  const animationFrame = useRef(0)

  const lastUpdate = useRef(Date.now())
  const config = useDeepMemo<SnowflakeProps>({ color, changeFrequency, radius, speed, wind, rotationSpeed, images })
  const snowflakes = useSnowflakes(canvasRef, snowflakeCount, config)

  const render = useCallback(
    (framesPassed = 1) => {
      const canvas = canvasRef.current

      if (!canvas) {
        return
      }

      // Update the positions of the snowflakes
      for (const snowflake of snowflakes) {
        snowflake.update(canvas, framesPassed)
      }

      // Bail out if context is not available
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        return
      }

      // Render the snowflakes
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // If images are provided, use them to draw snowflakes
      if (images && images.length > 0) {
        for (const snowflake of snowflakes) {
          snowflake.drawImage(ctx)
        }
        return
      }

      // Otherwise, draw snowflakes as circles

      // Use single path to draw all snowflakes. This is faster than starting a new path for each snowflake.
      ctx.beginPath()
      for (const snowflake of snowflakes) {
        snowflake.drawCircle(ctx)
      }
      ctx.fillStyle = color
      ctx.fill()
      // We do not need to call ctx.closePath() because ctx.beginPath() empties the list
      // of sub-paths and starts a new path.
    },
    [snowflakes, color, images],
  )

  const loop = useCallback(() => {
    // Update based on time passed so that a slow frame rate won't slow down the snowflake
    const now = Date.now()
    const msPassed = Date.now() - lastUpdate.current
    lastUpdate.current = now

    // Frames that would have passed if running at 60 fps
    const framesPassed = msPassed / targetFrameTime

    render(framesPassed)

    animationFrame.current = requestAnimationFrame(loop)
  }, [render])

  useEffect(() => {
    loop()
    return () => cancelAnimationFrame(animationFrame.current)
  }, [loop])

  return (
    <canvas
      ref={canvasRef}
      height={canvasSize.height}
      width={canvasSize.width}
      style={mergedStyle}
      data-testid="SnowfallCanvas"
    />
  )
}

export default Snowfall
