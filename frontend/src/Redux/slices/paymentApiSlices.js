import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../Common/Constants";

// Define the API slice
export const paymentApi = createApi({
  reducerPath: "payment", // Unique key for the API
  baseQuery: fetchBaseQuery({ baseUrl: API_URL, credentials: "include" }), // Base URL for API requests
  endpoints: (builder) => ({
    // Endpoint for processing payment
    paymentProcess: builder.mutation({
      query: (paymentData) => ({
        url: "/payment",
        method: "POST",
        body: paymentData,
      }),
    }),

    // Endpoint for verifying payment
    paymentVerify: builder.mutation({
      query: ({
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      }) => ({
        url: "/paymentVerify",
        method: "POST",
        body: { razorpay_order_id, razorpay_payment_id },
        headers: {
          "x-razorpay-signature": razorpay_signature,
        },
      }),
    }),
  }),
});

// Export hooks for usage in components
export const { usePaymentProcessMutation, usePaymentVerifyMutation } =
  paymentApi;
