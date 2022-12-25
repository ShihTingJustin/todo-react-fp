import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export interface ListState {
  selectedListId: string;
}

const initialState: ListState = {
  selectedListId: '',
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setSelectedListId: (state, action) => {
      state.selectedListId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedListId } = listSlice.actions;
export default listSlice.reducer;
