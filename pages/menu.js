import { useState } from "react";
import { ProductCard } from "@/components/index";
import NextLink from "next/link";

import { Box, Container, Link, SimpleGrid } from "@chakra-ui/react";
import productinfo from "products";

export default function Home({ ninjas }) {
  const [disabled, setDisabled] = useState(false);
  return (
    <>
      <Container maxW="container.4xl" gap={10}>
        <Container maxW="container.xl" pb="10">
          <SimpleGrid columns={[1, 2, 3]} gap={10} pt="20">
            {productinfo.map((product) => (
              <NextLink href={`/products/${product.id}`} passHref>
                <Link>
                  <Box>
                    <ProductCard
                      key={product.id}
                      disabled={disabled}
                      onClickAdd={() => setDisabled(true)}
                      onAddEnded={() => setDisabled(false)}
                      {...product}
                    />
                  </Box>
                </Link>
              </NextLink>
            ))}
          </SimpleGrid>
        </Container>
      </Container>
    </>
  );
}
