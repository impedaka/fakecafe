import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import Navbar from "../Components/Navbar";
import Cart from "./cart";
import { useState, useContext } from "react";
export default function WithBackgroundImage() {
  return (
    <Flex
      w={"full"}
      h={"100vh"}
      backgroundImage={
        "url(https://static.dezeen.com/uploads/2018/06/hono-izakaya-charlene-bourgeois-interiors-restaurant-quebec-city-canada_dezeen_2364_col_0.jpg)"
      }
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <Navbar ree="white" />
      <VStack
        w={"full"}
        justify={"center"}
        align={"flex-start"}
        px={useBreakpointValue({ base: 10, md: 20 })}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Stack maxW={"3xl"} align={"flex-start"} spacing={6}>
          <Text
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "5xl", md: "6xl" })}
          >
            Starbucks Coffee Company
          </Text>
          <Text color="white" fontSize={"2xl"}>
            Hot Coffees - Cold Drinks - Hot Drinks - Bakery - Hot Breakfast
          </Text>
          <Button
            size="lg"
            bg={"white"}
            color={"black"}
            _hover={{ bg: "grey.200" }}
          >
            <Link href="/menu">Order Now</Link>
          </Button>
        </Stack>
      </VStack>
    </Flex>
  );
}
