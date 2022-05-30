import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { useShoppingCart } from "@/hooks/use-shopping-cart";
import { FiMinus, FiPlus } from "react-icons/fi";
import Head from "next/head";
import { formatCurrency } from "@/lib/utils";

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  useToast,
  HStack,
  IconButton,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
} from "@chakra-ui/react";

import products from "products";

const Product = ({ prod, data }) => {
  console.log(data);
  const toast = useToast();
  const router = useRouter();
  const { cartCount, addItem } = useShoppingCart();
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);

  //const toastId = useRef();
  const firstRun = useRef(true);

  const handleOnAddToCart = () => {
    setAdding(true);
    /*toastId.current = toast.loading(
      `adding ${qty} item${qty > 1 ? "s" : ""}...`
    ); */
    toast({
      position: "top",
      title: `adding ${qty} item${qty > 1 ? "s" : ""}...`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    addItem(prod, qty);
  };

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    setAdding(false);
    toast({
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top",
      title: `${qty} ${prod.name} added`,
    });
    setQty(1);
  }, [cartCount]);

  return router.isFallback ? (
    <>
      <Head>
        <title>Loading...</title>
      </Head>
      <Text>Loading...</Text>
    </>
  ) : (
    <>
      <Head>
        <title>{prod.name}</title>
      </Head>
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
              src={prod.image}
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
                {prod.name}
              </Heading>
              <Text
                color={useColorModeValue("gray.900", "gray.400")}
                fontWeight={300}
                fontSize={"2xl"}
              >
                {formatCurrency(prod.price)}
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
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                {prod.more}
              </Text>
              <Box>
                <Text fontSize="lg">Quantity:</Text>
                <HStack>
                  <IconButton
                    onClick={() => setQty((prev) => prev - 1)}
                    disabled={qty <= 1}
                  >
                    <FiMinus />
                  </IconButton>
                  <Text fontSize={"lg"} p="3">
                    {qty}
                  </Text>
                  <IconButton onClick={() => setQty((prev) => prev + 1)}>
                    <FiPlus />
                  </IconButton>
                </HStack>
              </Box>
            </Stack>
            {/* Add to cart button */}
            <Button
              onClick={handleOnAddToCart}
              disabled={adding}
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
              Add to cart ({qty})
            </Button>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
};

export async function getStaticPaths() {
  return {
    // Existing posts are rendered to HTML at build time
    paths: Object.keys(products)?.map((id) => ({
      params: { id },
    })),
    // Enable statically generating additional pages
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  try {
    const prod = products?.find((product) => product.id === params.id) ?? {};
    console.log(prod);
    const res = await fetch(
      `https://www.starbucks.com/bff/ordering/${prod.num}/hot`
    );
    const data = await res.json();

    return {
      props: { data, prod },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every second
      revalidate: 1, // In seconds
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default Product;
