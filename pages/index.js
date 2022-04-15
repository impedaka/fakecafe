import NextLink from "next/link";

import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
} from "@chakra-ui/react";
import Section from "@/components/Section";

export default function Homepage() {
  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text as={"span"} position={"relative"}>
              FakeCafe
            </Text>
            <br />
            <Text as={"span"} color={"black"}>
              100% Not Real!
            </Text>
          </Heading>
          <Text color={"gray.800"}>
            A café is a type of restaurant which typically serves coffee and
            tea, in addition to light refreshments such as baked goods or
            snacks. However, fakecafe is a café that provides none of that.
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <NextLink href="/menu">
              <Button
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                bg="black"
                color="white"
                _hover={{ bg: "blackAlpha.700" }}
              >
                Order Now!
              </Button>
            </NextLink>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Box
            position={"relative"}
            height={"300px"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
          >
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={
                "https://static.dezeen.com/uploads/2018/06/hono-izakaya-charlene-bourgeois-interiors-restaurant-quebec-city-canada_dezeen_2364_col_0.jpg"
              }
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}
