import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsServices } from "../Common/ProductsServices";

// Thunks for async actions

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ id, quantity }, { getState, rejectWithValue }) => {
    try {
      
        // Check if the product already exists in the cart
        const existingItem = getState().cart.cartItems.find((item) => item.id === id);
  
        let item;
  
        if (existingItem) {
          // If the product exists, update its quantity without fetching details
          item = {
            ...existingItem,
            quantity: quantity, // Update the quantity
          };
        } else {
          // If the product doesn't exist, fetch its details
          const { data } = await ProductsServices.getProductDetails(id);
          item = {
            id: data.product._id,
            img: data.product.images[0].img,
            name: data.product.name,
            price: data.product.price,
            stock: data.product.stock,
            quantity: quantity,
          };
        }
  
        // Update the cart with the new or updated item
        const updatedCartItems = [
          ...getState().cart.cartItems.filter((cartItem) => cartItem.id !== id), // Exclude the existing item (if any)
          item,
        ];
  
        // Save updated cart to localStorage
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  
        return item;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({id}, { getState, rejectWithValue }) => {
    try {
      const updatedCartItems = getState().cart.cartItems.filter(
        (item) => item.id !== id
      );

      // Save updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const saveShippingInfo = createAsyncThunk(
  "cart/saveShippingInfo",
  async (data, { rejectWithValue }) => {
    try {
      localStorage.setItem("shippingInfo", JSON.stringify(data));
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Slice for cart state

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    shippingInfo: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add to Cart
      .addCase(addToCart.fulfilled, (state, action) => {
        const item = action.payload;
        const isItemExist = state.cartItems.find((i) => i.id === item.id);

        if (isItemExist) {
          state.cartItems = state.cartItems.map((i) =>
            i.id === item.id ? item : i
          );
        } else {
          state.cartItems.push(item);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Remove from Cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (i) => i.id !== action.payload
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Save Shipping Info
      .addCase(saveShippingInfo.fulfilled, (state, action) => {
        state.shippingInfo = action.payload;
      })
      .addCase(saveShippingInfo.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Export reducer
export const cartReducers =  cartSlice.reducer;
