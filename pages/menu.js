import { useState } from "react";
import { ProductCard } from "@/components/index";
import {
  Box,
  Center,
  Container,
  Grid,
  HStack,
  Image,
  SimpleGrid,
  useBreakpoint,
} from "@chakra-ui/react";
import products from "products";

export default function Home() {
  const [disabled, setDisabled] = useState(false);
  /*const size = useBreakpoint({
    base: "repeat(1, 1fr)",
    md: "repeat(3, 1fr)",
  }); */
  return (
    <>
      <Container maxW="container.4xl" gap={10}>
        <Container maxW="container.xl" pb="10">
          <SimpleGrid columns={[1, 2, 3]} gap={10} pt="20">
            {products.map((product) => (
              <Box>
                <ProductCard
                  key={product.id}
                  disabled={disabled}
                  onClickAdd={() => setDisabled(true)}
                  onAddEnded={() => setDisabled(false)}
                  {...product}
                />
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Container>
    </>
  );
}
