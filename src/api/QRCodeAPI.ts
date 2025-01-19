import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../axios/axiosBaseQuery';
import {QR_URLS} from './URLConstants';

export const QR_CODE_API_REDUCER_KEY = 'QRCodeAPI';

export const QRCodeAPI = createApi({
  reducerPath: QR_CODE_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    QRCode: builder.mutation({
      query: walletParams => ({
        url: QR_URLS.QR_CODE,
        method: 'POST',
        body: walletParams,
      }),
      transformResponse: (response: {data: any}) => response,
    }),
  }),
});

export const {useQRCodeMutation} = QRCodeAPI;
