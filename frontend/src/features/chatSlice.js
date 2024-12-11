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
    modals: {
      addChannel: {
        isOpen: false,
      },
      deleteChannel: {
        isOpen: false,
        channelId: null,
      },
      renameChannel: {
        isOpen: false,
        channelId: null,
      },
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

export const postChannel = createAsyncThunk('@@chat/add-channel', async (channelName, { getState }) => {
  const token = getState().login.entities.token;
  const res = await axios.post('/api/v1/channels', channelName, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
});

export const deleteChannel = createAsyncThunk(
  '@@chat/delete-channel',
  async (channelId, { getState }) => {
    const token = getState().login.entities.token;
    const res = await axios.delete(`/api/v1/channels/${channelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  },
);

export const renameChannel = createAsyncThunk(
  '@@chat/rename-channel',
  async ({ id, channelName }, { getState }) => {
    const token = getState().login.entities.token;
    const res = await axios.patch(`/api/v1/channels/${id}`, channelName, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
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
    openAddChannelModal: (state) => {
      state.ui.modals.addChannel.isOpen = true;
    },
    closeAddChannelModal: (state) => {
      state.ui.modals.addChannel.isOpen = false;
    },
    openDeleteChannelModal: (state, { payload }) => {
      state.ui.modals.deleteChannel.isOpen = true;
      state.ui.modals.deleteChannel.channelId = payload;
    },
    closeDeleteChannelModal: (state) => {
      state.ui.modals.deleteChannel.isOpen = false;
    },
    openRenameChannelModal: (state, { payload }) => {
      state.ui.modals.renameChannel.isOpen = true;
      state.ui.modals.renameChannel.channelId = payload;
    },
    closeRenameChannelModal: (state) => {
      state.ui.modals.renameChannel.isOpen = false;
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
          state.messages.entities[message.id] = {
            ...message,
            removable: message.name !== 'general' && message.name !== 'random',
          };
          state.messages.ids.push(message.id);
        });
        state.error = null;
      })
      .addCase(postMessage.rejected, (state, { payload }) => {
        state.error = payload || 'Failed to send message due to unknown error.';
      })
      .addCase(postChannel.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(postChannel.fulfilled, (state, { payload }) => {
        state.channels.entities[payload.id] = payload;
        state.channels.ids.push(payload.id);
        state.ui.activeChannelIndex = state.channels.ids.indexOf(payload.id);
        state.error = null;
      })
      .addCase(deleteChannel.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(deleteChannel.fulfilled, (state, { payload }) => {
        const { id } = payload;
        delete state.channels.entities[id];
        state.channels.ids = state.channels.ids.filter((item) => item !== id);
        state.ui.activeChannelIndex = 0;
        state.error = null;
      })
      .addCase(renameChannel.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(renameChannel.fulfilled, (state, { payload }) => {
        const { id, name } = payload;
        state.channels.entities[id].name = name;
        state.error = null;
      });
  },
});
export default chatSlice.reducer;
export const {
  setActiveChannel,
  receiveMessage,
  openAddChannelModal,
  closeAddChannelModal,
  openDeleteChannelModal,
  closeDeleteChannelModal,
  openRenameChannelModal,
  closeRenameChannelModal,
} = chatSlice.actions;
