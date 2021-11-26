import { Container, Box, ThemeProvider } from '@mui/material';
import { Provider } from 'next-auth/client';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import 'src/styles/globals.css';
import theme from 'src/color/Theme';
import Header from 'src/components/Header';



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <Header />
          <Container maxWidth='xl'>
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
