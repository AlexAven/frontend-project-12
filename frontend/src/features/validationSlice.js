/* eslint arrow-body-style: "off" */
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
      return {
        ...state,
        addingChannel: {
          ...state.addingChannel,
          status: 'failed',
          error: payload.message,
        },
      };
    },
    addingChannelSucceeded: (state) => {
      return {
        ...state,
        addingChannel: {
          ...state.addingChannel,
          status: 'succeeded',
          error: '',
        },
      };
    },
  },
});

export default validationSlice.reducer;
export const { addingChannelFailed, addingChannelSucceeded } = validationSlice.actions;
