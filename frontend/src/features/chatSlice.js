import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  channels: {
    entities: {},
    ids: [],
  },
  messages: {
    entities: {},
    ids: [],
  },
  ui: {
    activeChannelIndex: 0,
  },
  error: null,
};

export const getChannels = createAsyncThunk('@@chat/get-channels', async (_, { getState }) => {
  const token = getState().login.entities.token;
  const res = await axios.get('/api/v1/channels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = res.data;

  return data;
});

export const getMessages = createAsyncThunk('@@chat/get-messages', async (_, { getState }) => {
  const token = getState().login.entities.token;
  const res = await axios.get('/api/v1/messages', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = res.data;
  return data;
});

export const postMessage = createAsyncThunk('@@chat/send-message', async (userMessage, { getState }) => {
  const loginState = getState().login;
  const chatState = getState().chat;
  const activeChannelIndex = chatState.ui.activeChannelIndex;
  const currentChannelId = chatState.channels.ids[activeChannelIndex];
  const { token, username } = loginState.entities;

  const newMessage = { body: userMessage, channelId: currentChannelId, username };

  const res = await axios.post('/api/v1/messages', newMessage, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = res.data;

  console.log('data', data);
  return data;
});

const chatSlice = createSlice({
  name: '@@channels',
  initialState,
  reducers: {
    setActiveChannel: (state, { payload }) => {
      state.ui.activeChannelIndex = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChannels.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(getChannels.fulfilled, (state, { payload }) => {
        payload.forEach((channel) => {
          state.channels.entities[channel.id] = channel;
          state.channels.ids.push(channel.id);
        });
        state.error = null;
      })
      .addCase(getMessages.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(getMessages.fulfilled, (state, { payload }) => {
        payload.forEach((message) => {
          state.messages.entities[message.id] = message;
          state.messages.ids.push(message.id);
        });
        state.error = null;
      })
      .addCase(postMessage.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(postMessage.fulfilled, (state, { payload }) => {
        state.messages.entities[payload.id] = payload;
        state.messages.ids.push(payload.id);
      });
  },
});

export default chatSlice.reducer;
export const { setActiveChannel } = chatSlice.actions;
