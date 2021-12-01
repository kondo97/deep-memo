import  { createTheme } from '@mui/material/styles';

// declare module '@mui/material' {
//   interface Theme {
//     status: {
//       danger: string;
//     };
//   }
//   // allow configuration using `createTheme`
//   interface ThemeOptions {
//     status?: {
//       danger?: string;
//     };
//   }
// }

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#808080',
    },
    postThemeA:{
      main: '#69cc6F',
    },
    postThemeB:{
      main: '#69cc6F',
    },
    postThemeC:{
      main: '#69cc6F',
    },
    postThemeD:{
      main: '#69cc6F',
    },
    postThemeE:{
      main: '#69cc6F',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
