import { createSlice } from "@reduxjs/toolkit";
import { addItemToShoppingCart } from "../../utils";
import { createStandaloneToast } from "@chakra-ui/react";

const initialState = {
  cartProducts: [],
};

const { toast } = createStandaloneToast();
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartProducts = addItemToShoppingCart(
        action.payload,
        state.cartProducts
      );
    },
    removeFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.id !== action.payload
      );
      toast({
        title: "Removed from your cart.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    clearCart: (state, action) => {
      state.cartProducts = [];
      toast({
        title: "Your cart is empty now.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
  },
});

export const { reducer: cartReducer } = cartSlice;
export const selectCart = ({ cart }) => cart;
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
