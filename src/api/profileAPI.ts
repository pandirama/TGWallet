import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../axios/axiosBaseQuery';
import {PROFILE_URLS} from './URLConstants';

export const PROFILE_API_REDUCER_KEY = 'profileAPI';

export const profileAPI = createApi({
  reducerPath: PROFILE_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    basisList: builder.mutation<any, void>({
      query: () => ({
        url: PROFILE_URLS.CHANGE_BASIS_LIST,
        method: 'POST',
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    updateTimeZone: builder.mutation<any, any>({
      query: params => ({
        url: PROFILE_URLS.UPDATE_TIME_ZONE,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    languageList: builder.mutation<any, void>({
      query: () => ({
        url: PROFILE_URLS.CHANGE_LANGUAGE_LIST,
        method: 'POST',
      }),
      transformResponse: (response: {data: any}) => response,
    }),
    updateLanguage: builder.mutation<any, any>({
      query: params => ({
        url: PROFILE_URLS.UPDATE_LANGUAGE,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
  }),
});

export const {
  useBasisListMutation,
  useUpdateTimeZoneMutation,
  useLanguageListMutation,
  useUpdateLanguageMutation,
} = profileAPI;
