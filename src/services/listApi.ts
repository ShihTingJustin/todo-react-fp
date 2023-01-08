import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITodo } from '@Interfaces/I_todo';

export interface Response<T = any> {
  data: T;
  status: string;
}

export interface GetListRes {
  id: string;
  title: string;
  todos: Array<ITodo>;
}

export const listApi = createApi({
  reducerPath: 'listApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_ENDPOINT,
    mode: 'cors',
    headers: {
      origin: process.env.REACT_APP_DOMAIN || 'http://localhost:3001',
      'content-type': 'application/json',
    },
  }),
  tagTypes: ['List'],
  endpoints: (builder) => ({
    getListById: builder.query<Response<GetListRes>, string>({
      // 這裡的 query 代表接續 base 要傳入的值，providesTags 就是記錄一下對應的 tagType 詳細 https://redux-toolkit.js.org/rtk-query/usage/automated-refetchin
      query: (listId) => `list/${listId}`,
      providesTags: ['List'],
    }),
  }),
});
