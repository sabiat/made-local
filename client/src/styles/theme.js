import { createMuiTheme } from '@material-ui/core'

// Maximum Yellow Red F6BD60
// Linen F7EDE2
// Baby Pink F5CAC3
// Teal
    // main: Steel Teal 588B8B
    // light: Morning Blue 84A59D
// Light Coral F28482
// White FFFFFF    

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#84A59D' // Morning Blue
    },
    secondary: {
      main: '#F28482' // Light Coral
    },
    warning: {
      main: '#F6BD60' // Maximum Yellow Red
    },
  },
  typography: {
    fontFamily: "Montserrat",
    body1: {
      fontSize: "1.5rem",
      color: '#F6BD60'
    },
    body2: {
      fontFamily: "Lora",
      fontSize: "1rem"
    }
  }
})

export default theme;