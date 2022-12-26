import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ITodo from '@Interfaces/I_todo';

export interface Response<T = any> {
  data: T;
  status: string;
}

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_ENDPOINT }),
  tagTypes: ['Todo'],
  // refetchOnFocus: true,
  // refetchOnReconnect: true,
  // refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getAll: builder.query<Response<ITodo[]>, string>({
      query: (listId) => {
        if (!listId) console.log('invalid listId');
        return `todo/${listId}`;
      },
      providesTags: (result, error, id) => [{ type: 'Todo', id }],
    }),
  }),
});