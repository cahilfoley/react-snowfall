import React, { useEffect, useRef } from 'react'
import { SnowfallCanvas, SnowfallCanvasConfig } from './SnowfallCanvas.js'
import { defaultConfig } from './Snowflake.js'
import { useComponentSize, useDeepMemo, useSnowfallStyle } from './hooks.js'

export interface SnowfallProps extends Partial<SnowfallCanvasConfig> {
  /**
   * Any style properties that will be passed to the canvas element.
   */
  style?: React.CSSProperties
}

export const Snowfall = ({
  color = defaultConfig.color,
  changeFrequency = defaultConfig.changeFrequency,
  radius = defaultConfig.radius,
  speed = defaultConfig.speed,
  wind = defaultConfig.wind,
  rotationSpeed = defaultConfig.rotationSpeed,
  opacity = defaultConfig.opacity,
  snowflakeCount = 150,
  images,
  style,
}: SnowfallProps = {}): JSX.Element => {
  const mergedStyle = useSnowfallStyle(style)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasSize = useComponentSize(canvasRef)

  const config = useDeepMemo<SnowfallCanvasConfig>({
    color,
    changeFrequency,
    radius,
    speed,
    wind,
    rotationSpeed,
    images,
    snowflakeCount,
    opacity,
  })

  // A reference to the config used for creating the initial instance
  const configRef = useRef(config)

  const snowfallCanvasRef = useRef<SnowfallCanvas>()

  useEffect(() => {
    if (!snowfallCanvasRef.current && canvasRef.current) {
      snowfallCanvasRef.current = new SnowfallCanvas(canvasRef.current, configRef.current)
    }

    return () => {
      snowfallCanvasRef.current?.pause()
      snowfallCanvasRef.current = undefined
    }
  }, [])

  useEffect(() => {
    if (snowfallCanvasRef.current) {
      snowfallCanvasRef.current.updateConfig(config)
    }
  }, [config])

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
