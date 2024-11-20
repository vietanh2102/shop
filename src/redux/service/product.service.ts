import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductType } from "../../types";
interface GetProductType {
  products: ProductType[];
  totalPage: number;
}
interface GetProductCategory {
  page: number;
  category?: string;
  detail?: string;
}
export const ProductApi = createApi({
  reducerPath: "news",
  baseQuery: fetchBaseQuery({ baseUrl: `https://zrnvxy-8080.csb.app/` }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      GetProductType,
      { page: number; limit?: number }
    >({
      query: ({ page, limit = 4 }) => `products?_page=${page}&_limit=${limit}`,
      transformResponse: (products: ProductType[], meta) => {
        return {
          products,
          totalPage: Number(meta?.response?.headers.get("x-total-count")),
        };
      },
    }),
    getProduct: builder.query<ProductType, number>({
      query: (id) => `products/${id}`,
    }),
    searchProduct: builder.query<ProductType[], string>({
      query: (q) => `products?q=${q}`,
    }),
    getProductsCategory: builder.query<GetProductType, GetProductCategory>({
      query: ({ page, category }) =>
        `products?category=${category}&_page=${page}&_limit=8`,
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
      transformResponse: (products: ProductType[], meta) => {
        return {
          products,
          totalPage: Number(meta?.response?.headers.get("x-total-count")),
        };
      },
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductsCategoryQuery,
  useSearchProductQuery,
  useGetProductsDetailQuery,
} = ProductApi;
