import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
} from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useShoppingCart } from "@/hooks/use-shopping-cart";
import Image from "next/image";
import Head from "next/head";
import { formatCurrency } from "@/lib/utils";

import products from "products";

export default function Simple(props) {
  const router = useRouter();
  const { cartCount, addItem } = useShoppingCart();
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);

  const toastId = useRef();
  const firstRun = useRef(true);

  const handleOnAddToCart = () => {
    setAdding(true);
    toastId.current = toast.loading(
      `Adding ${qty} item${qty > 1 ? "s" : ""}...`
    );
    addItem(props, qty);
  };

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    setAdding(false);
    toast.success(`${qty} ${props.name} added`, {
      id: toastId.current,
    });
    setQty(1);
  }, [cartCount]);
  return (
    <>
      <Navbar ree="black" />
      <Container maxW={"7xl"} pt={20}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <Image
              rounded={"md"}
              alt={"product image"}
              src={props.image}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {props.name}
              </Heading>
              <Text
                color={useColorModeValue("gray.900", "gray.400")}
                fontWeight={300}
                fontSize={"2xl"}
              >
                {props.price}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text
                  color={useColorModeValue("gray.500", "gray.400")}
                  fontSize={"2xl"}
                  fontWeight={"300"}
                >
                  Juicy, flame-grilled burger made with 100% Canadian beef,
                  placed on a fresh, lightly toasted bun and topped just the way
                  you want it.
                </Text>
              </VStack>
            </Stack>

            <div className="mt-4 border-t pt-4">
              {/* Quantity */}
              <p className="text-gray-500">Quantity:</p>
              <div className="mt-1 flex items-center space-x-3">
                <button
                  onClick={() => setQty((prev) => prev - 1)}
                  disabled={qty <= 1}
                  className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current hover:bg-rose-100 hover:text-rose-500 rounded-md p-1"
                >
                  <MinusSmIcon className="w-6 h-6 flex-shrink-0" />
                </button>
                <p className="font-semibold text-xl">{qty}</p>
                <button
                  onClick={() => setQty((prev) => prev + 1)}
                  className="hover:bg-green-100 hover:text-green-500 rounded-md p-1"
                >
                  <PlusSmIcon className="w-6 h-6 flex-shrink-0 " />
                </button>
              </div>

              {/* Add to cart button */}
              <button
                type="button"
                onClick={handleOnAddToCart}
                disabled={adding}
                className="mt-8 border rounded py-2 px-6 bg-rose-500 hover:bg-rose-600 border-rose-500 hover:border-rose-600 focus:ring-4 focus:ring-opacity-50 focus:ring-rose-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to cart ({qty})
              </button>
            </div>
            <Button
              rounded={"none"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              bg={useColorModeValue("gray.900", "gray.50")}
              color={useColorModeValue("white", "gray.900")}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
            >
              Add to cart
            </Button>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}
