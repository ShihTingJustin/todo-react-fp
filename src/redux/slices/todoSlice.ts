import { createSlice } from '@reduxjs/toolkit';
import { TodoListMode } from '@Interfaces/I_todo';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ListState {
  mode: TodoListMode;
}

const initialState: ListState = {
  mode: TodoListMode.NORMAL,
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMode } = todoSlice.actions;
export default todoSlice.reducer;
