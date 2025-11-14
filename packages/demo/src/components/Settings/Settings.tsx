import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Chip, { ChipProps } from '@mui/material/Chip'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { CirclePicker } from 'react-color'
import { useSettingsStore } from '../../settings'
import { ThemeProvider } from './theme'

import './Settings.css'

const ValueChip = (props: ChipProps) => {
  return <Chip {...props} sx={{ ml: 1 }} size="small" component="span" />
}

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
  const settings = useSettingsStore()

  return (
    <ThemeProvider>
      <Paper className="settings-container">
        <Stack spacing={1}>
          <div>
            <Typography gutterBottom>
              Snowflake Count <ValueChip label={settings.snowflakeCount} />
            </Typography>
            <Slider
              value={settings.snowflakeCount}
              min={0}
              max={750}
              step={1}
              onChange={(_, value) => settings.update({ snowflakeCount: value as number })}
            />
          </div>
          <div>
            <Typography gutterBottom>
              Speed <ValueChip label={`Min ${settings?.speed?.[0]}`} />
              <ValueChip label={`Max ${settings?.speed?.[1]}`} />
            </Typography>
            <Slider
              value={settings.speed}
              min={0}
              max={10}
              step={0.5}
              onChange={(_, value) => settings.update({ speed: value as [number, number] })}
            />
          </div>
          <div>
            <Typography gutterBottom>
              Wind <ValueChip label={`Min ${settings?.wind?.[0]}`} />{' '}
              <ValueChip label={`Max ${settings?.wind?.[1]}`} />
            </Typography>
            <Slider
              value={settings.wind}
              min={-1}
              max={10}
              step={0.5}
              onChange={(_, value) => settings.update({ wind: value as [number, number] })}
            />
          </div>
          <div>
            <Typography gutterBottom>
              Radius <ValueChip label={`Min ${settings?.radius?.[0]}`} />
              <ValueChip label={`Max ${settings?.radius?.[1]}`} />
            </Typography>
            <Slider
              value={settings.radius}
              min={0.5}
              max={30}
              step={0.5}
              onChange={(_, value) => settings.update({ radius: value as [number, number] })}
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={settings.useImages}
                  onChange={(event) => settings.setUseImages(event.target.checked)}
                />
              }
              label="Use Images"
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={settings.enable3DRotation || false}
                  onChange={(event) => settings.update({ enable3DRotation: event.target.checked })}
                />
              }
              label="Enable 3D Rotation"
            />
          </div>
          {settings.useImages ? (
            <>
              <div>
                <Typography gutterBottom>
                  Opacity <ValueChip label={`Min ${settings?.opacity?.[0]}`} />
                  <ValueChip label={`Max ${settings?.opacity?.[1]}`} />
                </Typography>
                <Slider
                  value={settings.opacity}
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={(_, value) => settings.update({ opacity: value as [number, number] })}
                />
              </div>
              <div>
                <Typography gutterBottom>
                  Rotation Speed <ValueChip label={`Min ${settings?.rotationSpeed?.[0]}`} />
                  <ValueChip label={`Max ${settings?.rotationSpeed?.[1]}`} />
                </Typography>
                <Slider
                  value={settings.rotationSpeed}
                  min={-5}
                  max={10}
                  step={0.5}
                  onChange={(_, value) =>
                    settings.update({ rotationSpeed: value as [number, number] })
                  }
                />
              </div>
            </>
          ) : (
            <Box my={2}>
              <Typography gutterBottom>
                Color <ValueChip label={settings.color} />
              </Typography>
              <CirclePicker
                colors={colors}
                width="100%"
                color={settings.color}
                onChangeComplete={(value) => settings.update({ color: value.hex })}
              />
            </Box>
          )}
        </Stack>
      </Paper>
    </ThemeProvider>
  )
}

export default Settings
