import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useShoppingCart } from "@/hooks/use-shopping-cart";
import { formatCurrency } from "@/lib/utils";
import { Rating } from "@/components/index";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
} from "@chakra-ui/react";

const ProductCard = (props) => {
  const { cartCount, addItem } = useShoppingCart();
  const [adding, setAdding] = useState(false);
  console.log(props.currency);
  const toastId = useRef();
  const firstRun = useRef(true);

  const handleOnAddToCart = (event) => {
    event.preventDefault();

    setAdding(true);
    toastId.current = toast.loading("Adding 1 item...");

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
      toast.success(`${props.name} added`, {
        id: toastId.current,
      });
    }

    if (typeof props.onAddEnded === "function") {
      props.onAddEnded();
    }
  }, [cartCount]);

  return (
    <Link href={`/products/${props.id}`}>
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
            <Text fontWeight={500} fontSize={"xl"}>
              {formatCurrency(props.price, props.currency)}
            </Text>
          </Stack>
        </Stack>

        {/*} <Rating rate={props?.rating?.rate} count={props?.rating?.count} /> */}

        <Button onClick={handleOnAddToCart} disabled={adding || props.disabled}>
          {adding ? "Adding..." : "Add to cart"}
        </Button>
      </Box>
    </Link>
  );
};

export default ProductCard;
