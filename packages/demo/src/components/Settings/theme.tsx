import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ReactNode } from 'react'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgba(33, 150, 243, 0.87)'
    }
  }
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
