import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export const addItemToShoppingCart = (
  cartItem = {},
  shoppingCartItems = []
) => {
  const existsItem = shoppingCartItems.find((item) => item.id === cartItem.id);
  if (existsItem) {
    toast({
      title: "Added to cart",
      description:
        "This item is already exists, the quantity will be increased",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    return shoppingCartItems.map((item) =>
      item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  toast({
    title: "Added to cart",
    status: "success",
    duration: 2000,
    isClosable: true,
  });
  return [...shoppingCartItems, { ...cartItem, quantity: 1 }];
};
