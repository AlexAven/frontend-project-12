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
    modal: {
      isOpen: false,
    },
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

export const postMessage = createAsyncThunk(
  '@@chat/send-message',
  async (userMessage, { getState, rejectWithValue }) => {
    try {
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

      return res.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue('Network error. Please check your connection.');
      } else {
        return rejectWithValue('Unexpected error occurred.');
      }
    }
  },
);

const chatSlice = createSlice({
  name: '@@channels',
  initialState,
  reducers: {
    setActiveChannel: (state, { payload }) => {
      state.ui.activeChannelIndex = payload;
    },
    receiveMessage: (state, { payload }) => {
      state.messages.entities[payload.id] = payload;
      state.messages.ids.push(payload.id);
    },
    openModal: (state) => {
      state.ui.modal.isOpen = true;
    },
    closeModal: (state) => {
      state.ui.modal.isOpen = false;
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
      .addCase(postMessage.rejected, (state, { payload }) => {
        state.error = payload || 'Failed to send message due to unknown error.';
      });
  },
});
export default chatSlice.reducer;
export const { setActiveChannel, receiveMessage, openModal, closeModal } = chatSlice.actions;
