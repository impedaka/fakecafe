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
import productinfo from "products";
import Section from "@/components/Section";

export const getStaticProps = async () => {
  const res = await fetch("https://www.starbucks.com/bff/ordering/409/hot");
  const data = await res.json();
  return {
    props: { ninjas: data },
  };
};

export default function Home({ ninjas }) {
  const [disabled, setDisabled] = useState(false);
  console.log(ninjas.products[0].name);
  return (
    <>
      <Container maxW="container.4xl" gap={10}>
        <Container maxW="container.xl" pb="10">
          <SimpleGrid columns={[1, 2, 3]} gap={10} pt="20">
            {productinfo.map((product) => (
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
