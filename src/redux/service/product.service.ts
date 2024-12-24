import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrderInfo, ProductType } from "../../types";
interface GetProductType {
  products: ProductType[];
  totalPage: number;
}
interface GetProductCategory {
  page: number;
  category?: string;
  detail?: string;
  limit?: number;
}
export const ProductApi = createApi({
  reducerPath: "news",
  // https://zrnvxy-8080.csb.app/
  // https://yymyxn-8080.csb.app/
  baseQuery: fetchBaseQuery({ baseUrl: `https://yymyxn-8080.csb.app/` }),
  tagTypes: ["Cart", "Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductType, GetProductCategory>({
      query: ({ page, limit = 4 }) => `products?_page=${page}&_limit=${limit}`,
      providesTags: ["Products"],
      transformResponse: (products: ProductType[], meta) => {
        return {
          products,
          totalPage: Number(meta?.response?.headers.get("x-total-count")),
        };
      },
    }),
    getProduct: builder.query<ProductType, number>({
      query: (id) => `products/${id}`,
      providesTags: ["Products"],
    }),
    searchProduct: builder.query<ProductType[], string>({
      query: (q) => `products?q=${q}`,
      providesTags: ["Products"],
    }),
    getProductsCategory: builder.query<GetProductType, GetProductCategory>({
      query: ({ page, category }) =>
        `products?category=${category}&_page=${page}&_limit=8`,
      providesTags: ["Products"],
      transformResponse: (products: ProductType[], meta) => {
        return {
          products,
          totalPage: Number(meta?.response?.headers.get("x-total-count")),
        };
      },
    }),
    getProductsDetail: builder.query<GetProductType, GetProductCategory>({
      query: ({ page, detail }) =>
        `products?${
          detail !== "all" ? `detail=${detail}` : ""
        }&_page=${page}&_limit=8`,
      providesTags: ["Products"],
      transformResponse: (products: ProductType[], meta) => {
        return {
          products,
          totalPage: Number(meta?.response?.headers.get("x-total-count")),
        };
      },
    }),
    getCartUser: builder.query<OrderInfo[], string | number>({
      query: (id) => `orders?userId=${id}&_sort=status&_order=desc`,
      providesTags: ["Cart"],
    }),
    orders: builder.mutation<OrderInfo, OrderInfo>({
      query: (order) => ({
        url: "orders",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductsCategoryQuery,
  useSearchProductQuery,
  useGetProductsDetailQuery,
  useOrdersMutation,
  useGetCartUserQuery,
} = ProductApi;
