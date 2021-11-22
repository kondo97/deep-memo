import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "components/Header";
import { Container, Box, ThemeProvider } from "@mui/material";
import theme from "components/color/Theme"


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
      <Header />
      <Container maxWidth="xl">
        <Component {...pageProps} />
      </Container>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
