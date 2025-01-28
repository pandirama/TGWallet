import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../../axios/axiosBaseQuery';
import {NEW_WALLET_URLS} from '../URLConstants';

export const AUTH_API_REDUCER_KEY = 'authAPI';

export const authAPI = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    register: builder.mutation({
      query: registerParams => ({
        url: NEW_WALLET_URLS.REGISTER,
        method: 'POST',
        body: registerParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    getNetworks: builder.query<any, void>({
      query: () => ({
        url: NEW_WALLET_URLS.NETWORKS,
        method: 'GET',
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    walletCreate: builder.mutation({
      query: registerParams => ({
        url: NEW_WALLET_URLS.WALLET_CREATION,
        method: 'POST',
        body: registerParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    walletApprove: builder.mutation({
      query: registerParams => ({
        url: NEW_WALLET_URLS.WALLET_APPROVE,
        method: 'POST',
        body: registerParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    generateMnemonic: builder.mutation({
      query: registerParams => ({
        url: NEW_WALLET_URLS.GENERATE_MNEMONIC,
        method: 'POST',
        body: registerParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    verifyMnemonic: builder.mutation({
      query: registerParams => ({
        url: NEW_WALLET_URLS.VERIFY_MNEMONIC,
        method: 'POST',
        body: registerParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetNetworksQuery,
  useWalletCreateMutation,
  useWalletApproveMutation,
  useGenerateMnemonicMutation,
  useVerifyMnemonicMutation,
} = authAPI;
