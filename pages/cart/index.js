import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useShoppingCart } from "@/hooks/use-shopping-cart";
import axios from "axios";
import { formatCurrency } from "@/lib/utils";
import getStripe from "@/lib/get-stripe";
import { FiX, FiMinus, FiPlus } from "react-icons/fi";
import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Image,
} from "@chakra-ui/react";

const Cart = () => {
  const { cartDetails, totalPrice, cartCount, addItem, removeItem, clearCart } =
    useShoppingCart();
  const [redirecting, setRedirecting] = useState(false);

  const redirectToCheckout = async () => {
    // Create Stripe checkout
    const {
      data: { id },
    } = await axios.post("/api/checkout_sessions", {
      items: Object.entries(cartDetails).map(([_, { id, quantity }]) => ({
        price: id,
        quantity,
      })),
    });

    // Redirect to checkout
    const stripe = await getStripe();
    await stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <>
      <Head>
        <title>My Shopping Cart </title>
      </Head>
      <Container maxW="container.4xl">
        {cartCount > 0 ? (
          <>
            <h2 className="text-4xl font-semibold">Your shopping cart</h2>
            <p className="mt-1 text-xl">
              {cartCount} items{" "}
              <Button
                onClick={clearCart}
                className="opacity-50 hover:opacity-100 text-base capitalize"
              >
                (Clear all)
              </Button>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-4xl font-semibold">
              Your shopping cart is empty.
            </h2>
            <p className="mt-1 text-xl">
              uwu{" "}
              <Link href="/">
                <a className="text-red-500 underline">here!</a>
              </Link>
            </p>
          </>
        )}

        {cartCount > 0 ? (
          <Box mt={10}>
            {Object.entries(cartDetails).map(([key, product]) => (
              <HStack key={key}>
                {/* Image + Name */}
                <Link href={`/products/${product.id}`}>
                  <a className="flex items-center space-x-4 group">
                    <Box size="sm" h={20} w={20}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </Box>
                    <p className="font-semibold text-xl group-hover:underline">
                      {product.name}
                    </p>
                  </a>
                </Link>

                {/* Price + Actions */}
                <HStack>
                  {/* Quantity */}
                  <Center>
                    <Button
                      onClick={() => removeItem(product)}
                      disabled={product?.quantity <= 1}
                      className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current hover:bg-rose-100 hover:text-rose-500 rounded-md p-1"
                    >
                      <FiMinus className="w-6 h-6 flex-shrink-0" />
                    </Button>
                    <p className="font-semibold text-xl">{product.quantity}</p>
                    <Button
                      onClick={() => addItem(product)}
                      className="hover:bg-green-100 hover:text-green-500 rounded-md p-1"
                    >
                      <FiPlus className="w-6 h-6 flex-shrink-0 " />
                    </Button>
                  </Center>

                  {/* Price */}
                  <p className="font-semibold text-xl ml-16">
                    <FiX className="w-4 h-4 text-gray-500 inline-block" />
                    {formatCurrency(product.price)}
                  </p>

                  {/* Remove item */}
                  <Button
                    onClick={() => removeItem(product, product.quantity)}
                    className="ml-4 hover:text-rose-500"
                  >
                    <FiX className="w-6 h-6 flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity" />
                  </Button>
                </HStack>
              </HStack>
            ))}

            <div className="flex flex-col items-end border-t py-4 mt-8">
              <p className="text-xl">
                Total:{" "}
                <span className="font-semibold">
                  {formatCurrency(totalPrice)}
                </span>
              </p>

              <Button
                onClick={redirectToCheckout}
                disabled={redirecting}
                className="border rounded py-2 px-6 bg-rose-500 hover:bg-rose-600 border-rose-500 hover:border-rose-600 focus:ring-4 focus:ring-opacity-50 focus:ring-rose-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-rose-500 max-w-max mt-4"
              >
                {redirecting ? "Redirecting..." : "Go to Checkout"}
              </Button>
            </div>
          </Box>
        ) : null}
      </Container>
    </>
  );
};

export default Cart;
