import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ITodo,
  CreateTodoReqBody,
  UpdateTodoReqBody,
  SearchTodoResponse,
} from '@Interfaces/I_todo';

export interface Response<T = any> {
  data: T;
  status: string;
}

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_ENDPOINT,
    mode: 'cors',
    headers: {
      origin: process.env.REACT_APP_DOMAIN || 'http://localhost:3001',
      'content-type': 'application/json',
    },
    timeout: 30000,
  }),
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
    search: builder.mutation<Response<SearchTodoResponse[]>, { keyword: string }>({
      query: (filter) => ({
        url: 'todo/search',
        method: 'POST',
        body: filter,
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
    }),
    createTodo: builder.mutation<Response<ITodo>, CreateTodoReqBody>({
      query: (todo) => ({
        url: 'todo',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
    }),
    updateTodo: builder.mutation<Response<ITodo>, UpdateTodoReqBody>({
      query: (todo) => ({
        url: 'todo',
        method: 'PUT',
        body: todo,
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
    }),
    deleteTodo: builder.mutation<Response<ITodo>, ITodo['id']>({
      query: (todoId) => ({
        url: `todo/${todoId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
    }),
  }),
});
