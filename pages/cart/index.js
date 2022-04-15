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
          <Container maxW="container.lg">
            {Object.entries(cartDetails).map(([key, product]) => (
              <HStack key={key} py={10} justify="space-between">
                {/* Image + Name */}
                <Link href={`/products/${product.id}`}>
                  <Text>
                    <HStack>
                      <Box size="sm" h={20} w={20}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </Box>
                      <Text>{product.name}</Text>
                    </HStack>
                  </Text>
                </Link>

                {/* Price + Actions */}
                <HStack>
                  {/* Quantity */}
                  <Center>
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
                  </Center>

                  {/* Price */}
                  <p>x {formatCurrency(product.price)}</p>

                  {/* Remove item */}
                  <Button
                    color="white"
                    bg="black"
                    _hover={{ bg: "alphaBlack.700" }}
                    onClick={() => removeItem(product, product.quantity)}
                  >
                    Remove
                  </Button>
                </HStack>
              </HStack>
            ))}

            <Box>
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
                {redirecting ? "Redirecting..." : "Go to Checkout"}
              </Button>
            </Box>
          </Container>
        ) : null}
      </Container>
    </Box>
  );
};

export default Cart;
