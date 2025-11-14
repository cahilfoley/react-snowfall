import { SnowfallProps } from 'react-snowfall'
import { create } from 'zustand'

export interface SnowfallSettings extends SnowfallProps {
  update: (settings: Partial<SnowfallProps>) => void
  useImages: boolean
  setUseImages: (useImages: boolean) => void
}

export const useSettingsStore = create<SnowfallSettings>((set) => ({
  color: '#dee4fd',
  snowflakeCount: 200,
  radius: [0.5, 3.0],
  speed: [0.5, 3.0],
  wind: [-0.5, 2.0],
  rotationSpeed: [-1.0, 1.0],
  opacity: [0.1, 0.2],
  useImages: false,
  enable3DRotation: false,
  update: (changes) => set(changes),
  setUseImages: (useImages) => {
    if (useImages) {
      return set({ useImages, radius: [5, 20] })
    } else {
      return set({ useImages, radius: [0.5, 3] })
    }
  },
}))
