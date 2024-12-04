import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  entities: {},
  error: null,
};

export const loginUser = createAsyncThunk('@@login/login-user', async (userData) => {
  const res = await axios.post('/api/v1/login', {
    username: userData.username,
    password: userData.password,
  });
  const data = res.data;

  return data;
});

const loginSlice = createSlice({
  name: '@@login',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.entities.token = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        localStorage.setItem('token', payload.token);
        state.entities.token = payload.token;
        state.error = null;
      });
  },
});

export default loginSlice.reducer;
export const { setUser } = loginSlice.actions;
