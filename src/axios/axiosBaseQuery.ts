import axios from './axios';
import type {AxiosRequestConfig, AxiosError} from 'axios';
import type {BaseQueryFn} from '@reduxjs/toolkit/query';

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      body?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({url, method, body, params, headers}: any) => {
    try {
      const result = await axios({
        url: url,
        method,
        data: body,
        params,
        headers,
      });
      return {data: result.data};
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.code,
          data: err.response?.data || err.message,
          message: err.message,
        },
      };
    }
  };
