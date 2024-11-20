import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../Common/Constants";

export const categoriesApiSlice = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL,credentials:"include" }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => "getCategories",
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoriesApiSlice;
