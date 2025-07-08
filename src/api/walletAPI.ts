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
    walletMode: builder.mutation({
      query: walletParams => ({
        url: WALLET_URLS.WALLET_MODE,
        method: 'POST',
        body: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    walletDelete: builder.mutation({
      query: walletParams => ({
        url: WALLET_URLS.WALLET_DELETE,
        method: 'POST',
        body: walletParams,
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
    privateKey: builder.mutation({
      query: walletParams => ({
        url: WALLET_URLS.PRIVATE_KEY,
        method: 'POST',
        body: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    secretPhase: builder.mutation({
      query: walletParams => ({
        url: WALLET_URLS.SECRET_PHASE,
        method: 'POST',
        body: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    watchAddress: builder.mutation({
      query: walletParams => ({
        url: WALLET_URLS.WATCH_ADDRESS,
        method: 'POST',
        body: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    walletInfos: builder.mutation({
      query: walletParams => ({
        url: WALLET_URLS.WALLET_INFO,
        method: 'POST',
        body: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    tokenInfo: builder.mutation({
      query: walletParams => ({
        url: WALLET_URLS.TOKEN_INFO,
        method: 'POST',
        body: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    getSendWallet: builder.mutation({
      query: walletParams => ({
        url: WALLET_URLS.SEND_WALLET_INFO,
        method: 'POST',
        body: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    sendWallet: builder.mutation({
      query: walletParams => ({
        url: WALLET_URLS.SEND_WALLET,
        method: 'POST',
        body: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    receiveWallet: builder.mutation({
      query: walletParams => ({
        url: WALLET_URLS.RECEIVE_WALLET,
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
  usePrivateKeyMutation,
  useSecretPhaseMutation,
  useWatchAddressMutation,
  useWalletInfosMutation,
  useTokenInfoMutation,
  useGetSendWalletMutation,
  useSendWalletMutation,
  useReceiveWalletMutation,
  useWalletModeMutation,
  useWalletDeleteMutation,
} = walletAPI;
