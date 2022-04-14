import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
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
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import products from "products";

const Product = (props) => {
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

  return router.isFallback ? (
    <>
      <Head>
        <title>Loading...</title>
      </Head>
      <p className="text-center text-lg py-12">Loading...</p>
    </>
  ) : (
    <>
      <Head>
        <title>{props.name}</title>
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
              <Text>Quantity:</Text>
              <HStack>
                <IconButton
                  onClick={() => setQty((prev) => prev - 1)}
                  disabled={qty <= 1}
                  className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current hover:bg-rose-100 hover:text-rose-500 rounded-md p-1"
                >
                  <FiMinus className="w-6 h-6 flex-shrink-0" />
                </IconButton>
                <p className="font-semibold text-xl">{qty}</p>
                <IconButton
                  onClick={() => setQty((prev) => prev + 1)}
                  className="hover:bg-green-100 hover:text-green-500 rounded-md p-1"
                >
                  <FiPlus className="w-6 h-6 flex-shrink-0 " />
                </IconButton>
              </HStack>

              {/* Add to cart button */}
            </div>
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
      {/*
      <div className="container lg:max-w-screen-lg mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-12">
          
          <div className="relative w-72 h-72 sm:w-96 sm:h-96">
            <Image
              src={props.image}
              alt={props.name}
              layout="fill"
              objectFit="contain"
            />
          </div>

    
          <div className="flex-1 max-w-md border border-opacity-50 rounded-md shadow-lg p-6">
            <h2 className="text-3xl font-semibold">{props.name}</h2>
            <p>
              <span className="text-gray-500">Availability:</span>{" "}
              <span className="font-semibold">In stock</span>
            </p>


            <div className="mt-8 border-t pt-4">
              <p className="text-gray-500">Price:</p>
              <p className="text-xl font-semibold">
                {formatCurrency(props.price)}
              </p>
            </div>

            <div className="mt-4 border-t pt-4">
         
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

      
              <button
                type="button"
                onClick={handleOnAddToCart}
                disabled={adding}
                className="mt-8 border rounded py-2 px-6 bg-rose-500 hover:bg-rose-600 border-rose-500 hover:border-rose-600 focus:ring-4 focus:ring-opacity-50 focus:ring-rose-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to cart ({qty})
              </button>
            </div>
          </div>
        </div>
      </div>*/}
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
    const props = products?.find((product) => product.id === params.id) ?? {};

    return {
      props,
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
