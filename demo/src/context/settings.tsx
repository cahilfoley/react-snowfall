import React, { createContext, useState, FC } from 'react'
import { SnowfallProps } from 'react-snowfall'

export interface SnowfallSettings extends SnowfallProps {
  setColor: (color: string) => void
  setSnowflakeCount: (count: number) => void
}

export const SettingsContext = createContext<Partial<SnowfallSettings>>({})

export const StateProvider: FC = ({ children }) => {
  const [color, setColor] = useState('#dee4fd')
  const [snowflakeCount, setSnowflakeCount] = useState(200)

  return (
    <SettingsContext.Provider value={{ color, setColor, snowflakeCount, setSnowflakeCount }}>
      {children}
    </SettingsContext.Provider>
  )
}
