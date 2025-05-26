import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../axios/axiosBaseQuery';
import {MARKET_URLS} from './URLConstants';

export const MARKET_API_REDUCER_KEY = 'marketAPI';

export const marketAPI = createApi({
  reducerPath: MARKET_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    marketList: builder.mutation({
      query: params => ({
        url: MARKET_URLS.MARKET_LIST,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    tradingInfo: builder.mutation({
      query: params => ({
        url: MARKET_URLS.MARKET_INFO,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    checkInfo: builder.mutation({
      query: params => ({
        url: MARKET_URLS.CHECK_INFO,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    descriptionInfo: builder.mutation({
      query: params => ({
        url: MARKET_URLS.DESCRIPTION_INFO,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    transactionInfo: builder.mutation({
      query: params => ({
        url: MARKET_URLS.TRANSACTION_INFO,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    swap: builder.mutation({
      query: params => ({
        url: MARKET_URLS.SWAP,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    swapDetail: builder.mutation({
      query: params => ({
        url: MARKET_URLS.SWAP_DEATAIL,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    confirmSwap: builder.mutation({
      query: params => ({
        url: MARKET_URLS.CONFIRM_SWAP,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
  }),
});

export const {
  useMarketListMutation,
  useTradingInfoMutation,
  useCheckInfoMutation,
  useDescriptionInfoMutation,
  useTransactionInfoMutation,
  useSwapMutation,
  useSwapDetailMutation,
  useConfirmSwapMutation,
} = marketAPI;
