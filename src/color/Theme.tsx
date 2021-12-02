import  { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#808080',
    },
    postThemeA:{
      main: '#757575',
    },
    postThemeB:{
      main: '#43a047',
    },
    postThemeC:{
      main: '#00acc1',
    },
    postThemeD:{
      main: '#fdd835',
    },
    postThemeE:{
      main: '#e53935',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
