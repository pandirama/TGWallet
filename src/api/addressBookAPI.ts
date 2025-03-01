import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../axios/axiosBaseQuery';
import {ADDRESS_BOOK_URLS} from './URLConstants';

export const ADDRESS_BOOK_API_REDUCER_KEY = 'addressBookAPI';

export const addressBookAPI = createApi({
  reducerPath: ADDRESS_BOOK_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    addressBook: builder.mutation({
      query: params => ({
        url: ADDRESS_BOOK_URLS.ADDRESS_BOOK,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    addAddressBook: builder.mutation({
      query: params => ({
        url: ADDRESS_BOOK_URLS.ADD_ADDRESS_BOOK,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    addressBookInfo: builder.mutation({
      query: params => ({
        url: ADDRESS_BOOK_URLS.ADDRESS_BOOK_INFO,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    updateAddressBook: builder.mutation({
      query: params => ({
        url: ADDRESS_BOOK_URLS.UPDATE_ADDRESS_BOOK,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
  }),
});

export const {
  useAddressBookMutation,
  useAddAddressBookMutation,
  useAddressBookInfoMutation,
  useUpdateAddressBookMutation,
} = addressBookAPI;
