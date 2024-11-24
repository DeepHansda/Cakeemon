import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OrderServices } from "../Common/OrderServices";

// Async thunks for API calls
export const createOrder = createAsyncThunk(
  "orders/create",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await OrderServices.createOrder(orderData);
      if (data.success === 1) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMyOrders = createAsyncThunk(
  "orders/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await OrderServices.getMyOrders();
      if (data.success === 1) {
        return data.order;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await OrderServices.getAllOrders();
      if (data.success === 1) {
        return data.orders;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOrder = createAsyncThunk(
  "orders/getOrder",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await OrderServices.getOrder(id);
      if (data.success === 1) {
        return data.order;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ id, order }, { rejectWithValue }) => {
    try {
      const { data } = await OrderServices.updateOrder(id, order);
      if (data.success === 1) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await OrderServices.deleteOrder(id);
      if (data.success === 1) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Orders slice
const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    orders: [],
    order: {},
    error: null,
    isUpdated: false,
    isDeleted: false,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    resetUpdate: (state) => {
      state.isUpdated = false;
    },
    resetDelete: (state) => {
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.order = payload;
      })
      .addCase(createOrder.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Get My Orders
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = payload;
      })
      .addCase(getMyOrders.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Get All Orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = payload;
      })
      .addCase(getAllOrders.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Get Order Details
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.order = payload;
      })
      .addCase(getOrder.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Update Order
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isUpdated = true;
      })
      .addCase(updateOrder.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isDeleted = true;
      })
      .addCase(deleteOrder.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { clearErrors, resetUpdate, resetDelete } = ordersSlice.actions;

export const ordersReducers = ordersSlice.reducer;
