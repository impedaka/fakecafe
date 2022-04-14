import Head from "next/head";
import { CartProvider } from "@/hooks/use-shopping-cart";
import { Header, Footer } from "@/components/index";
import { Toaster } from "react-hot-toast";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </CartProvider>
      <Toaster />
    </ChakraProvider>
  );
}

export default MyApp;
