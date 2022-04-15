import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useShoppingCart } from "@/hooks/use-shopping-cart";
import { fetcher, shootFireworks } from "@/lib/utils";

import {
  Heading,
  Box,
  Text,
  Center,
  Flex,
  Container,
  VStack,
} from "@chakra-ui/react";

const Success = () => {
  const {
    query: { session_id },
  } = useRouter();

  const { clearCart } = useShoppingCart();

  const { data, error } = useSWR(
    () => `/api/checkout_sessions/${session_id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      shootFireworks();
      clearCart();
    }
  }, [data]);

  return (
    <Container mt={20} align="center">
      {error ? (
        <Box>
          <Text>Sorry, something went wrong!</Text>
        </Box>
      ) : !data ? (
        <Box>
          <Text>Loading...</Text>
        </Box>
      ) : (
        <Box pt={20}>
          <Heading mt={20}>Thanks for your order!</Heading>
          <Text>Check your inbox for the receipt.</Text>
        </Box>
      )}
    </Container>
  );
};

export default Success;
