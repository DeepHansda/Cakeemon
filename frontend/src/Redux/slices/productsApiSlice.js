import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../Common/Constants';

export const productsApiSlice = createApi({
    reducerPath: 'products',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL, // Update this to your API's base URL
        credentials:"include"
    }),
    endpoints: (builder) => ({
        getProductsClient: builder.query({
            query: ({ keyword, currentPage, category, occasion, ratings }) => ({
                url: `/getProducts/?keyword=${keyword}&category=${category}&page=${currentPage}&occasion=${occasion}&ratings=${ratings}`,
                method: 'GET',
            }),
        }),
        getAllProducts: builder.query({
            query: () => ({
                url: `/getAllProducts`,
                method: 'GET',
            }),
        }),
        getProductDetails: builder.query({
            query: (id) => ({
                url: `/getProduct/${id}`,
                method: 'GET',
            }),
        }),
        addReview: builder.mutation({
            query: (reviewData) => ({
                url: `/createReview`,
                method: 'POST',
                body: reviewData,
            }),
        }),
        newProduct: builder.mutation({
            query: (productData) => ({
                url: `/createProduct`,
                method: 'POST',
                body: productData,
            }),
        }),
    }),
});

export const {
    useGetProductsClientQuery,
    useGetAllProductsQuery,
    useGetProductDetailsQuery,
    useAddReviewMutation,
    useNewProductMutation,
} = productsApiSlice;
