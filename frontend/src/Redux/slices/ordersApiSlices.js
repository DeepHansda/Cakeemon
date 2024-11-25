import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../Common/Constants";

// Define the API slice
export const ordersApi = createApi({
  reducerPath: "orders", // Unique name for this slice
  baseQuery: fetchBaseQuery({ baseUrl: API_URL,credentials:"include" }), // Set the base API URL
  tagTypes: ["Orders"], // Tags for cache management
  endpoints: (builder) => ({
    // Create a new order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/createOrder",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders"], // Invalidate cache for orders after creation
    }),

    // Get orders of the logged-in user
    getMyOrders: builder.query({
      query: () => "/getOrders/me",
      providesTags: ["Orders"], // Cache orders data
    }),

    // Get all orders (admin use case)
    getAllOrders: builder.query({
      query: () => "/getOrders",
      providesTags: ["Orders"], // Cache all orders data
    }),

    // Get a single order by ID
    getOrder: builder.query({
      query: (id) => `/getOrder/${id}`,
      providesTags: (result, error, id) => [{ type: "Orders", id }], // Cache per order ID
    }),

    // Update an order by ID
    updateOrder: builder.mutation({
      query: ({ id, order }) => ({
        url: `/updateOrder/${id}`,
        method: "POST",
        body: order,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Orders", id }], // Invalidate specific order cache
    }),

    // Delete an order by ID
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/deleteOrder/${id}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Orders", id }], // Invalidate specific order cache
    }),
  }),
});

// Export hooks for the defined endpoints
export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useGetOrderQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;
