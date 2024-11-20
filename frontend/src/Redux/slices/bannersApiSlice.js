import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../Common/Constants";

// Define a service using a base URL and expected endpoints
export const bannersApi = createApi({
  reducerPath: "banners",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL, credentials: "include" }),
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: () => "/getBanners",
    }),
    createBanners: builder.mutation({
      query: (bannersData) => ({
        url: "/addBanners",
        method: "POST",
        body: bannersData,
      }),
    }),
    deleteBanners: builder.mutation({
      query: (id) => ({
        url: `/deleteBanner/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetBannersQuery,
  useCreateBannersMutation,
  useDeleteBannersMutation,
} = bannersApi;
