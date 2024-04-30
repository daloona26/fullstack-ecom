import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./features/LoginSlice";
import { cartReducer } from "./features/cartSlice";
import { globalReducer } from "./features/globalSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { productsApiSlice } from "./services/products";
import { networkReducer } from "./features/networkSlice";

const persistCartConfig = {
  key: "cart",
  storage,
};

const persistedCart = persistReducer(persistCartConfig, cartReducer);

export const store = configureStore({
  reducer: {
    login: loginReducer,
    cart: persistedCart,
    global: globalReducer,
    network: networkReducer,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat([productsApiSlice.middleware]),
});

export const persister = persistStore(store);

export * from "./features/LoginSlice";
