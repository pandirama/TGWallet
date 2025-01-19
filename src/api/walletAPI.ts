import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../axios/axiosBaseQuery';
import {WALLET_URLS} from './URLConstants';

export const WALLET_API_REDUCER_KEY = 'walletAPI';

export const walletAPI = createApi({
  reducerPath: WALLET_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    walletBalance: builder.mutation({
      query: walletParams => ({
        url: WALLET_URLS.WALLET_BALANCE,
        method: 'POST',
        body: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
  }),
});

export const {useWalletBalanceMutation} = walletAPI;
