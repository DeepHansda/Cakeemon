import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsServices } from "../Common/ProductsServices";

// Thunks for async actions

export const addToWishList = createAsyncThunk(
  "wishlist/addToWishList",
  async ({id}, { getState, rejectWithValue }) => {
    try {
      const { data } = await ProductsServices.getProductDetails(id);

      const item = {
        product: data.product._id,
        img: data.product.images[0].img,
        name: data.product.name,
        price: data.product.price,
        stock: data.product.stock,
      };

      const updatedWishItems = [...getState().wishList.wishItems, item];

      // Save updated wishlist to localStorage
      localStorage.setItem("wishItems", JSON.stringify(updatedWishItems));
      return item;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeFromWishList = createAsyncThunk(
  "wishlist/removeFromWishList",
  async ({id}, { getState, rejectWithValue }) => {
    try {
      const updatedWishItems = getState().wishList.wishItems.filter(
        (i) => i.product !== id
      );

      // Save updated wishlist to localStorage
      localStorage.setItem("wishItems", JSON.stringify(updatedWishItems));
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Wishlist slice

const wishListSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishItems: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add to Wishlist
      .addCase(addToWishList.fulfilled, (state, action) => {
        const item = action.payload;

        const isExists = state.wishItems.find(
          (i) => i.product === item.product
        );

        if (isExists) {
          state.wishItems = state.wishItems.map((i) =>
            i.product === isExists.product ? item : i
          );
        } else {
          state.wishItems.push(item);
        }
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Remove from Wishlist
      .addCase(removeFromWishList.fulfilled, (state, action) => {
        state.wishItems = state.wishItems.filter(
          (i) => i.product !== action.payload
        );
      })
      .addCase(removeFromWishList.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Export the reducer
export const wishListReducer = wishListSlice.reducer;
