import { useState } from "react";
import Head from "next/head";
import { useShoppingCart } from "@/hooks/use-shopping-cart";
import axios from "axios";
import { formatCurrency } from "@/lib/utils";
import getStripe from "@/lib/get-stripe";
import { FiX, FiMinus, FiPlus } from "react-icons/fi";

import {
  Box,
  Link,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  VStack,
  Image,
  Text,
  TableCaption,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  TableContainer,
  Td,
  Tfoot,
} from "@chakra-ui/react";

const Cart = () => {
  const { cartDetails, totalPrice, cartCount, addItem, removeItem, clearCart } =
    useShoppingCart();
  const [redirecting, setRedirecting] = useState(false);

  const redirectToCheckout = async () => {
    // Create Stripe checkout
    const {
      data: { id },
    } = await axios.post("/api/checkout_sessions", {
      items: Object.entries(cartDetails).map(([_, { id, quantity }]) => ({
        price: id,
        quantity,
      })),
    });

    // Redirect to checkout
    const stripe = await getStripe();
    await stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <Box mx="20">
      <Head>
        <title>My Order </title>
      </Head>
      <Container maxW="container.4xl" justify="center" align="center">
        {cartCount > 0 ? (
          <>
            <Heading>Your Order</Heading>
            <Text>
              {cartCount} items{" "}
              <Button onClick={clearCart} variant="link">
                (Clear all)
              </Button>
            </Text>
          </>
        ) : (
          <>
            <Heading>You didn't order anything!</Heading>

            <Text>
              Check out our menu{" "}
              <Link href="/menu" color="teal.500">
                here!
              </Link>
            </Text>
          </>
        )}

        {cartCount > 0 ? (
          <Container maxW="container.lg" gap="5" bg="white" py="20" mt="10">
            <TableContainer>
              <Table size="lg">
                <Thead>
                  <Tr>
                    <Th>Items</Th>
                    <Th>Quantity and Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Object.entries(cartDetails).map(([key, product]) => (
                    <Tr key={key}>
                      <Link href={`/products/${product.id}`}>
                        <Td>
                          {" "}
                          <Box size="sm" h={20} w={20}>
                            <Image
                              src={product.image}
                              alt={product.name}
                              layout="fill"
                              objectFit="cover"
                            />
                          </Box>
                          {product.name}
                        </Td>
                      </Link>
                      {/* Price + Actions */}
                      <Td>
                        {/* Quantity */}
                        <Center gap="5">
                          <Button
                            onClick={() => removeItem(product)}
                            disabled={product?.quantity <= 1}
                          >
                            <FiMinus />
                          </Button>
                          <Text p="5">{product.quantity}</Text>
                          <Button onClick={() => addItem(product)}>
                            <FiPlus />
                          </Button>

                          {/* Price */}
                          <p>x {formatCurrency(product.price)}</p>
                        </Center>
                      </Td>
                      <Td>
                        {/* Remove item */}
                        <Button
                          color="white"
                          bg="black"
                          _hover={{ bg: "alphaBlack.700" }}
                          onClick={() => removeItem(product, product.quantity)}
                        >
                          Remove
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot></Tfoot>
              </Table>
            </TableContainer>

            <Box py="5">
              <Heading fontSize="xl" mb="2">
                Total:
                {formatCurrency(totalPrice)}
              </Heading>

              <Button
                color="white"
                bg="black"
                _hover={{ bg: "alphaBlack.700" }}
                onClick={redirectToCheckout}
                disabled={redirecting}
              >
                {redirecting ? "Redirecting..." : "Checkout"}
              </Button>
            </Box>
            <Text>
              {" "}
              When testing, use the card number: 4242 4242 4242 4242.
            </Text>
          </Container>
        ) : null}
      </Container>
    </Box>
  );
};

export default Cart;
