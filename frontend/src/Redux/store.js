import { configureStore } from "@reduxjs/toolkit";

import { authReducers } from "./slices/authSlice";
import { bannersApi } from "./slices/bannersApiSlice";
import { cartReducers } from "./slices/cartSlice";
import { categoriesApiSlice } from "./slices/categoriesApiSlice";
import { ordersApi } from "./slices/ordersApiSlices";
import { paymentApi } from "./slices/paymentApiSlices";
import { productsApiSlice } from "./slices/productsApiSlice";
import { wishListReducer } from "./slices/wishListSlice";

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
    [paymentApi.reducerPath]: paymentApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    user: authReducers,
    cart: cartReducers,
    wishList: wishListReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bannersApi.middleware)
      .concat(categoriesApiSlice.middleware)
      .concat(productsApiSlice.middleware)
      .concat(paymentApi.middleware)
      .concat(ordersApi.middleware),
});

export default store;
