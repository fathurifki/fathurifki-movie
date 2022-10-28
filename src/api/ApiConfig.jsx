import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://www.omdbapi.com/",
  }),
  tagTypes: ["bySearch", "byTitle", "getDetail"],
  endpoints: (builder) => ({
    getBySearch: builder.query({
      query: (arg) => {
        const { search, page } = arg;
        return {
          url: "?apikey=2d2cc0c3",
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
          url: "?apikey=2d2cc0c3",
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
