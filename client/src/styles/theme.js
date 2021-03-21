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
    type: 'light',
    primary: {
      light: '#84a59D',
      main: '#6C9998',
    },
    secondary: {
      main: '#f28482',
    },
    background: {
      paper: '#faf9f9',
    },
    warning: {
      main: '#f6bd60',
    },
  },
  typography: {
    h1: {
      fontFamily: 'Montserrat',
      fontSize: '3.6rem',
      fontWeight: 600,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontFamily: 'Montserrat',
      fontWeight: 600,
      lineHeight: 1.42,
      fontSize: '3.1rem',
    },
    body1: {
      fontFamily: 'Montserrat',
      fontSize: '1.2rem',
    },
    body2: {
      fontFamily: 'Lora',
      fontSize: '1rem',
    },
    button: {
      fontFamily: 'Montserrat',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Lora',
    },
    h4: {
      fontFamily: 'Montserrat',
    },
  },
  shape: {
    borderRadius: 4,
  },
})

export default theme;
