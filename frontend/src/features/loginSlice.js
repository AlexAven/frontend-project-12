import axios from 'axios';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  entities: {
    token: '',
    username: '',
  },
  loginError: null,
  signupError: null,
};

export const loginUser = createAsyncThunk('@@login/login-user', async (userData) => {
  const res = await axios.post('/api/v1/login', {
    username: userData.username,
    password: userData.password,
  });
  const data = res.data;

  return data;
});

export const signupUser = createAsyncThunk('@@login/signup-user', async (newUserData) => {
  const res = await axios.post('/api/v1/signup', {
    username: newUserData.username,
    password: newUserData.password,
  });
  const data = res.data;

  return data;
});

const loginSlice = createSlice({
  name: '@@login',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.entities.token = payload.token;
      state.entities.username = payload.username;
    },
    logoutUser: (state) => {
      state.entities.token = '';
      state.entities.username = '';
      localStorage.removeItem('userData');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.rejected, (state, { error }) => {
        // state.loginError = error.message;
        if (error.message.includes('401')) {
          state.loginError = 'Неверные имя пользователя или пароль';
        }
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        localStorage.setItem('userData', JSON.stringify(payload));
        state.entities.token = payload.token;
        state.entities.username = payload.username;
        state.loginError = null;
      })
      .addCase(signupUser.rejected, (state, { error }) => {
        state.signupError = error.message;
      })
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        localStorage.setItem('userData', JSON.stringify(payload));
        state.entities.token = payload.token;
        state.entities.username = payload.username;
        state.signupError = null;
      });
  },
});

export default loginSlice.reducer;
export const { setUser, logoutUser } = loginSlice.actions;
