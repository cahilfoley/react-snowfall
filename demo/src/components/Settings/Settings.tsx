import { useContext } from 'react'
import { CirclePicker } from 'react-color'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import { SettingsContext, SnowfallSettings } from '../../context/settings'
import { ThemeProvider } from './theme'

import './Settings.css'

const colors = [
  '#dee4fd',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#607d8b'
]

const Settings = () => {
  const settings = useContext(SettingsContext) as SnowfallSettings

  return (
    <ThemeProvider>
      <Paper className="settings-container">
        <Typography gutterBottom>Snowflake Count - {settings.snowflakeCount}</Typography>
        <Slider
          value={settings.snowflakeCount}
          min={0}
          max={750}
          step={1}
          onChange={(_, value) => settings.setSnowflakeCount(value as number)}
        />
        <Typography gutterBottom>
          Speed - Min {settings?.speed?.[0]} Max {settings?.speed?.[1]}
        </Typography>
        <Slider
          value={settings.speed}
          min={0}
          max={10}
          step={0.5}
          onChange={(_, value) => settings.setSpeed(value as [number, number])}
        />
        <Typography gutterBottom>
          Wind - Min {settings?.wind?.[0]} Max {settings?.wind?.[1]}
        </Typography>
        <Slider
          value={settings.wind}
          min={-1}
          max={10}
          step={0.5}
          onChange={(_, value) => settings.setWind(value as [number, number])}
        />
        <Typography gutterBottom>
          Radius - Min {settings?.radius?.[0]} Max {settings?.radius?.[1]}
        </Typography>
        <Slider
          value={settings.radius}
          min={0.5}
          max={5}
          step={0.5}
          onChange={(_, value) => settings.setRadius(value as [number, number])}
        />
        <Box my={2}>
          <Typography gutterBottom>Color - {settings.color}</Typography>
          <CirclePicker
            colors={colors}
            width="100%"
            color={settings.color}
            onChangeComplete={(value) => settings.setColor(value.hex)}
          />
        </Box>
      </Paper>
    </ThemeProvider>
  )
}

export default Settings
