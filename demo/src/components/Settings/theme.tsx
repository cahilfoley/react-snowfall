import * as React from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: 'rgba(33, 150, 243, 0.87)'
    }
  }
})

export const ThemeProvider: React.FC = ({ children }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
