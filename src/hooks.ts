import { useCallback, useLayoutEffect, useEffect, useState, MutableRefObject, CSSProperties, useMemo } from 'react'
import Snowflake, { SnowflakeConfig } from './Snowflake'
import { snowfallBaseStyle } from './config'
import { getSize } from './utils'

/**
 * A utility function to create a collection of snowflakes
 * @param canvasRef A ref to the canvas element
 * @param amount The number of snowflakes
 * @param config The configuration for each snowflake
 */
const createSnowflakes = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement | undefined>,
  amount: number,
  config: SnowflakeConfig,
) => {
  const snowflakes: Snowflake[] = []

  for (let i = 0; i < amount; i++) {
    snowflakes.push(new Snowflake(canvasRef.current as HTMLCanvasElement, config))
  }

  return snowflakes
}

/**
 * A utility hook to manage creating and updating a collection of snowflakes
 * @param canvasRef A ref to the canvas element
 * @param amount The number of snowflakes
 * @param config The configuration for each snowflake
 */
export const useSnowflakes = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement | undefined>,
  amount: number,
  config: SnowflakeConfig,
) => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])

  // Handle change of amount
  useEffect(() => {
    setSnowflakes(snowflakes => {
      const sizeDifference = amount - snowflakes.length

      if (sizeDifference > 0) {
        return [...snowflakes, ...createSnowflakes(canvasRef, sizeDifference, config)]
      }

      if (sizeDifference < 0) {
        return snowflakes.slice(0, amount)
      }

      return snowflakes
    })
  }, [amount, canvasRef, config])

  // Handle change of config
  useEffect(() => {
    setSnowflakes(snowflakes =>
      snowflakes.map(snowflake => {
        snowflake.config = config
        return snowflake
      }),
    )
  }, [config])

  return snowflakes
}

/**
 * Returns the height and width of a HTML element, uses the `ResizeObserver` api if available to detect changes to the
 * size. Falls back to listening for resize events on the window.
 * @param ref A ref to the HTML element to be measured
 */
export const useComponentSize = (ref: MutableRefObject<HTMLElement | undefined>) => {
  const [size, setSize] = useState(getSize(ref.current))

  const resizeHandler = useCallback(() => {
    if (ref.current) {
      setSize(getSize(ref.current))
    }
  }, [ref])

  useLayoutEffect(() => {
    const { ResizeObserver } = window

    if (!ref.current) return
    resizeHandler()

    if (typeof ResizeObserver === 'function') {
      const resizeObserver = new ResizeObserver(resizeHandler)
      resizeObserver.observe(ref.current)

      return () => resizeObserver.disconnect()
    } else {
      window.addEventListener('resize', resizeHandler)

      return () => window.removeEventListener('resize', resizeHandler)
    }
  }, [ref, resizeHandler])

  return size
}

/**
 * Utility hook that merges any provided styles with the default styles
 * @param overrides The style prop passed into the component
 */
export const useSnowfallStyle = (overrides?: CSSProperties) => {
  const styles = useMemo(
    () => ({
      ...snowfallBaseStyle,
      ...(overrides || {}),
    }),
    [overrides],
  )

  return styles
}
