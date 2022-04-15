import Head from "next/head";
import { CartProvider } from "@/hooks/use-shopping-cart";
import { Header, Footer } from "@/components/index";
import { Toaster } from "react-hot-toast";
import { Box, ChakraProvider, Container } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import Section from "@/components/Section";
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
      </Head>
      <CartProvider>
        <Box minH="100vh">
          <Container maxW="container.xl">
            <AnimatePresence exitBeforeEnter initial={true}>
              <Header />
              <Section delay={0.1}>
                <Component {...pageProps} />
              </Section>
              <Footer />
            </AnimatePresence>
          </Container>
        </Box>
      </CartProvider>
    </ChakraProvider>
  );
}

export default MyApp;
