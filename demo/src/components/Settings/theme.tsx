import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgba(33, 150, 243, 0.87)'
    }
  }
})

export const ThemeProvider: React.FC = ({ children }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
