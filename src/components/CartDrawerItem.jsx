import { Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../app/features/cartSlice.js";

const CartDrawerItem = ({ id, attributes, quantity }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Flex alignItems={"center"} mb={3} py={2}>
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}${
            attributes?.thumbnail?.data?.attributes?.url
          }`}
          alt={attributes.title}
          w={"60px"}
          h={"60px"}
          rounded={"full"}
          objectFit={"cover"}
          mr={2}
        />
        <Stack>
          <Flex alignItems={"center"}>
            <Text fontSize={"sm"} mr={2}>
              {attributes.title}
            </Text>
            <Text fontSize={"sm"}>Price: ${attributes.price}</Text>
          </Flex>
          <Text fontSize={"sm"}>Quantity: {quantity}</Text>
          <Button
            variant={"solid"}
            colorScheme="red"
            size={"xs"}
            w={"fit-content"}
            onClick={() => dispatch(removeFromCart(id))}
          >
            Remove
          </Button>
        </Stack>
      </Flex>
    </>
  );
};

export default CartDrawerItem;
