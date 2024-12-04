import { configureStore } from '@reduxjs/toolkit';

import loginSlice from '../features/loginSlice';
import chatSlice from '../features/chatSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice,
    chat: chatSlice,
  },
  devTools: true,
});

export default store;
