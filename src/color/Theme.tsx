import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#808080',
    },
  },
  typography: {
        button: {
            textTransform: "none"
        }
    }
});

export default theme