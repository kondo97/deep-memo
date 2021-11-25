import React, { useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "components/Header";
import { Container, Box, ThemeProvider } from "@mui/material";
import theme from "src/color/Theme";
import { Provider } from "next-auth/client";


function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <>
      <Provider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <Header />
          <Container maxWidth="xl">
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
