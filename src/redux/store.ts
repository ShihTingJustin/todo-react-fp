import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { listApi } from '@Services/listApi';
import { todoApi } from '@Services/todoApi';
import listReducer from '@Slices/listSlice';
import todoReducer from '@Slices/todoSlice';

export const store = configureStore({
  reducer: {
    list: listReducer,
    todo: todoReducer,
    // Add the generated reducer as a specific top-level slice
    [listApi.reducerPath]: listApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listApi.middleware, todoApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
