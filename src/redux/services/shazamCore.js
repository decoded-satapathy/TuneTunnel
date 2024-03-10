import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const shazamCoreApiKey = import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY;

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core7.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", shazamCoreApiKey);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => "charts/get-top-songs-in-world",
    }),
    getSongsByGenre: builder.query({
      query: (genre) =>
        `/charts/get-top-songs-in_world_by_genre?genre=${genre}`,
    }),
    searchGlobally: builder.query({
      query: (term) => `/search?term=${term}`,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode, limit) =>
        `/charts/country?country_code=${countryCode}&limit=${limit}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useSearchGloballyQuery,
  useGetSongsByCountryQuery,
} = shazamCoreApi;
