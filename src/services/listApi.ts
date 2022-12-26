import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Response<T = any> {
  data: T;
  status: string;
}

// 做一份與 server 相同的 Todo 格式提供 component 使用
export interface GetListRes {
  id: string;
  title: string;
}

// 這裡 createApi 會自動將 endpoints 的 name 去組成相對應的 query
// 以 getAll 為例，使用時會組成 useGetAllQuery 的 function
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
    getAll: builder.query<Response<GetListRes[]>, void>({
      // 這裡的 query 代表接續 base 要傳入的值，providesTags 就是記錄一下對應的 tagType 詳細 https://redux-toolkit.js.org/rtk-query/usage/automated-refetchin
      query: () => `list`,
      providesTags: [{ type: 'List', id: 'LIST' }],
    }),
  }),
});

// const getListApi = async () => {
//   try {
//     const res = await customAxios.get('/list');
//     return res.data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export { getListApi };
