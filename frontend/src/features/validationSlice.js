// import * as yup from 'yup';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addingChannel: {
    status: null,
    error: '',
  },
};

// export const addingChannelValidate = createAsyncThunk(
//   '@@validation/adding-channel-validate',
//   async (validationData, { getState }) => {
//     console.log('inside Thunk');
//     const channelIds = getState().chat.channels.ids;
//     const channels = getState().chat.channels.entities;
//     const channelNames = channelIds.map((id) => channels[id].name);

//     const schema = yup.object().shape({
//       name: yup.string().required().min(3).max(20).notOneOf(channelNames),
//     });

//     await schema.validate(validationData);
//     return validationData;
//   },
// );

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
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(addingChannelValidate.rejected, (state, { error }) => {
  //       console.log('rejected', error);
  //       state.addingChannel.status = 'failed';
  //       state.addingChannel.error = error.message;
  //     })
  //     .addCase(addingChannelValidate.fulfilled, (state) => {
  //       console.log('fulfilled');
  //       state.addingChannel.status = 'succeeded';
  //       state.addingChannel.error = '';
  //     });
  // },
});

export default validationSlice.reducer;
export const { addingChannelFailed, addingChannelSucceeded } = validationSlice.actions;
