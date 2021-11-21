import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "components/Header";
import Container from "@mui/material/Container";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Container maxWidth="xl">
      <Component {...pageProps} />
      </Container>
    </>
  );
}

export default MyApp;
