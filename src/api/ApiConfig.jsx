import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiKey } from "./config";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.omdbapi.com/",
  }),
  tagTypes: ["bySearch", "byTitle", "getDetail"],
  endpoints: (builder) => ({
    getBySearch: builder.query({
      query: (arg) => {
        const { search, page } = arg;
        return {
          url: `?apikey=${apiKey}`,
          params: {
            s: search,
            page: page,
          },
        };
      },
      providesTags: ["bySearch"],
    }),

    getByDetail: builder.query({
      query: (arg) => {
        const { imdbId } = arg;
        return {
          url: `?apikey=${apiKey}`,
          params: {
            i: imdbId,
          },
        };
      },
      providesTags: ["byDetail"],
    }),
  }),
});

export const { useGetBySearchQuery, useGetByDetailQuery } = moviesApi;
