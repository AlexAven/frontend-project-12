import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addingChannel: {
    status: null,
    error: '',
  },
};

const validationSlice = createSlice({
  name: '@@validation',
  initialState,
  reducers: {
    addingChannelFailed: (state, { payload }) => {
      state.addingChannel.status = 'failed';
      state.addingChannel.error = payload.message;
    },
    addingChannelSucceeded: (state) => {
      state.addingChannel.status = 'succeeded';
      state.addingChannel.error = '';
    },
  },
});

export default validationSlice.reducer;
export const { addingChannelFailed, addingChannelSucceeded } = validationSlice.actions;
