import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../Common/API";

// Async thunk for processing payment
export const paymentProcess = createAsyncThunk(
  "payment/process",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await API.post("/payment", paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for verifying payment
export const paymentVerify = createAsyncThunk(
  "payment/verify",
  async (paymentData, { rejectWithValue }) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      paymentData;
    try {
      const response = await API.post(
        "/paymentVerify",
        { razorpay_order_id, razorpay_payment_id },
        { headers: { "x-razorpay-signature": razorpay_signature } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice for payment handling
const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    payment: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Payment process reducers
    builder
      .addCase(paymentProcess.pending, (state,action) => {
        state.loading = true;
        state.error = null;
        // state.payment = action.payload
      })
      .addCase(paymentProcess.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(paymentProcess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Payment verify reducers
    builder
      .addCase(paymentVerify.pending, (state,action) => {
        state.loading = true;
        state.error = null;
        state.payment = action.payload;

      })
      .addCase(paymentVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(paymentVerify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const paymentReducers = paymentSlice.reducer;
