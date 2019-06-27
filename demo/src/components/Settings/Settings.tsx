import React, { useContext } from 'react'
import { CirclePicker } from 'react-color'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/lab/Slider'
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
        <Box my={2}>
          <Typography gutterBottom>Color - {settings.color}</Typography>
          <CirclePicker
            colors={colors}
            width="100%"
            color={settings.color}
            onChangeComplete={value => settings.setColor(value.hex)}
          />
        </Box>
      </Paper>
    </ThemeProvider>
  )
}

export default Settings
