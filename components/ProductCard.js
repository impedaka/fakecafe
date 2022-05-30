import { useState, useEffect, useRef } from "react";
import NextLink from "next/link";
//import { toast } from "react-hot-toast";
import { useShoppingCart } from "@/hooks/use-shopping-cart";
import { formatCurrency } from "@/lib/utils";
import { Rating } from "@/components/index";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  useToast,
  Text,
  Stack,
  Image,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";

const ProductCard = (props) => {
  const toast = useToast();
  const { cartCount, addItem } = useShoppingCart();
  const [adding, setAdding] = useState(false);
  //const toastId = useRef();
  const firstRun = useRef(true);

  const handleOnAddToCart = (event) => {
    event.preventDefault();

    setAdding(true);

    if (typeof props.onClickAdd === "function") {
      props.onClickAdd();
    }

    addItem(props);
  };

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    if (adding) {
      setAdding(false);
      toast({
        title: `${props.name} added`,
        position: "top",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }

    if (typeof props.onAddEnded === "function") {
      props.onAddEnded();
    }
  }, [cartCount]);

  return (
    <Box
      role={"group"}
      p={6}
      maxW={"330px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
    >
      <Box
        rounded={"lg"}
        mt={-12}
        pos={"relative"}
        height={"230px"}
        _after={{
          transition: "all .3s ease",
          content: '""',
          w: "full",
          h: "full",
          pos: "absolute",
          top: 5,
          left: 0,
          backgroundImage: props.img,
          filter: "blur(15px)",
          zIndex: -1,
        }}
        _groupHover={{
          _after: {
            filter: "blur(20px)",
          },
        }}
      >
        <Image
          rounded={"lg"}
          height={230}
          width={282}
          objectFit={"cover"}
          src={props.image}
          alt={props.name}
        />
      </Box>
      <Stack pt={10} align={"center"}>
        <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={700}>
          {props.name}
        </Heading>
        <Stack direction={"row"} align={"center"}>
          <Text mb="4">
            <Rating rate={props?.rating?.rate} count={props?.rating?.count} />
          </Text>
        </Stack>
      </Stack>
      <HStack justify="space-between">
        <Text fontWeight={500} fontSize={"xl"}>
          {formatCurrency(props.price, props.currency)}
        </Text>

        <Button
          color="white"
          bg="black"
          _hover={{ bg: "blackAlpha.700" }}
          onClick={handleOnAddToCart}
          disabled={adding || props.disabled}
          variant="outline"
        >
          {adding ? "Adding..." : "Add to cart"}
        </Button>
      </HStack>
    </Box>
  );
};

export default ProductCard;
