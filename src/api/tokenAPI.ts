import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../axios/axiosBaseQuery';
import {NFTS_URLS} from './URLConstants';

export const TOKEN_API_REDUCER_KEY = 'tokenAPI';

export const tokenAPI = createApi({
  reducerPath: TOKEN_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    tokenList: builder.mutation({
      query: params => ({
        url: NFTS_URLS.TOKEN_LIST,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    addToken: builder.mutation({
      query: params => ({
        url: NFTS_URLS.ADD_TOKEN_LIST,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    removeToken: builder.mutation({
      query: params => ({
        url: NFTS_URLS.REMOVE_TOKEN_LIST,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    myToken: builder.mutation({
      query: params => ({
        url: NFTS_URLS.MY_TOKEN_LIST,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    homeToken: builder.mutation({
      query: params => ({
        url: NFTS_URLS.HOME_TOKEN_LIST,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    validateToken: builder.mutation({
      query: params => ({
        url: NFTS_URLS.VALIDATE_TOKEN,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    saveToken: builder.mutation({
      query: params => ({
        url: NFTS_URLS.SAVE_TOKEN,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
  }),
});

export const {
  useTokenListMutation,
  useAddTokenMutation,
  useRemoveTokenMutation,
  useMyTokenMutation,
  useHomeTokenMutation,
  useValidateTokenMutation,
  useSaveTokenMutation,
} = tokenAPI;
