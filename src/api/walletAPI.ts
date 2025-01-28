import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../axios/axiosBaseQuery';
import {WALLET_URLS} from './URLConstants';

export const WALLET_API_REDUCER_KEY = 'walletAPI';

export const walletAPI = createApi({
  reducerPath: WALLET_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    walletList: builder.mutation({
      query: params => ({
        url: WALLET_URLS.WALLET_LIST,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    walletNameChange: builder.mutation({
      query: walletParams => ({
        url: WALLET_URLS.WALLET_NAME_CHANGE,
        method: 'POST',
        body: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    walletChangePwd: builder.mutation({
      query: walletParams => ({
        url: WALLET_URLS.WALLET_CHANGE_PWD,
        method: 'POST',
        body: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    walletResetPwd: builder.mutation({
      query: walletParams => ({
        url: WALLET_URLS.WALLET_RESET_PWD,
        method: 'POST',
        body: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    walletVerifyPwd: builder.mutation({
      query: walletParams => ({
        url: WALLET_URLS.WALLET_VERIFY_PWD,
        method: 'POST',
        body: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
  }),
});

export const {
  useWalletListMutation,
  useWalletNameChangeMutation,
  useWalletChangePwdMutation,
  useWalletResetPwdMutation,
  useWalletVerifyPwdMutation,
} = walletAPI;
