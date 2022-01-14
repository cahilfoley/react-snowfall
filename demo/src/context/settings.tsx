import { createContext, useState, FC } from 'react'
import { SnowfallProps } from 'react-snowfall'

export interface SnowfallSettings extends SnowfallProps {
  setColor: (color: string) => void
  setSnowflakeCount: (count: number) => void
  setSpeed: (speed: [number, number]) => void
  setWind: (wind: [number, number]) => void
  setRadius: (radius: [number, number]) => void
}

export const SettingsContext = createContext<Partial<SnowfallSettings>>({})

export const StateProvider: FC = ({ children }) => {
  const [color, setColor] = useState('#dee4fd')
  const [snowflakeCount, setSnowflakeCount] = useState(200)
  const [radius, setRadius] = useState<[number, number]>([0.5, 3.0])
  const [speed, setSpeed] = useState<[number, number]>([0.5, 3.0])
  const [wind, setWind] = useState<[number, number]>([-0.5, 2.0])

  return (
    <SettingsContext.Provider
      value={{
        color,
        setColor,
        snowflakeCount,
        setSnowflakeCount,
        radius,
        setRadius,
        wind,
        setWind,
        speed,
        setSpeed
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
