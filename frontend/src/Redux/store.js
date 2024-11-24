import { configureStore } from "@reduxjs/toolkit";

import { bannersApi } from "./slices/bannersApiSlice";
import { categoriesApiSlice } from "./slices/categoriesApiSlice";
import { cartReducers } from "./slices/cartSlice";
import { wishListReducer } from "./slices/wishListSlice";
import { productsApiSlice } from "./slices/productsApiSlice";
import { authReducers } from "./slices/authSlice";
import { ordersReducers } from "./slices/ordersSlice";
import {paymentReducers} from './slices/paymentSlice'

const persistedWishItems = localStorage.getItem("wishItems")
  ? JSON.parse(localStorage.getItem("wishItems"))
  : [];

const persistedCartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const persistedShippingInfo = localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : {};

// Preloaded state for the store
const preloadedState = {
  wishList: {
    wishItems: persistedWishItems,
  },
  cart: {
    cartItems: persistedCartItems,
    shippingInfo: persistedShippingInfo,
  },
};

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    [bannersApi.reducerPath]: bannersApi.reducer,
    [categoriesApiSlice.reducerPath]: categoriesApiSlice.reducer,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    orders: ordersReducers,
    user: authReducers,
    cart: cartReducers,
    wishList: wishListReducer,
    payment:paymentReducers
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bannersApi.middleware)
      .concat(categoriesApiSlice.middleware)
      .concat(productsApiSlice.middleware),
});

export default store;
