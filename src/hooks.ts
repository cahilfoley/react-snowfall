import {
  useCallback,
  useLayoutEffect,
  useEffect,
  useState,
  useRef,
  MutableRefObject,
  CSSProperties,
  useMemo,
} from 'react'
import Snowflake, { SnowflakeConfig } from './Snowflake'
import { snowfallBaseStyle } from './config'
import { getSize } from './utils'

const createSnowflakes = (
  canvas: React.MutableRefObject<HTMLCanvasElement | undefined>,
  amount: number,
  config: SnowflakeConfig,
) => {
  const snowflakes: Snowflake[] = []

  for (let i = 0; i < amount; i++) {
    snowflakes.push(new Snowflake(canvas.current as HTMLCanvasElement, config))
  }

  return snowflakes
}

export const useSnowflakes = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement | undefined>,
  amount: number,
  config: SnowflakeConfig,
) => {
  const [snowflakes, setSnowflakes] = useState(() => createSnowflakes(canvasRef, amount, config))

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

/** Lifecycle hook that tracks if component is mounted. Returns a ref, which has a boolean `.current` property */
export const useRefMounted = () => {
  const refMounted = useRef(false)

  useEffect(() => {
    refMounted.current = true

    return () => {
      refMounted.current = false
    }
  }, [])

  return refMounted
}
