import { createMuiTheme } from '@material-ui/core/styles';

const arcBlue = '#0f3057';
const arcOrange = '#FFBA60';

export default createMuiTheme({
  palette: {
    common: {
      arcBlue,
      arcOrange,
    },
    primary: {
      main: arcBlue,
    },
    secondary: {
      main: arcOrange,
    },
  },
  typography: {
    htmlFontSize: 10,
    tab: {
      fontFamily: 'Lato',
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '1rem',
      letterSpacing: '1px'
    },
  },
});
