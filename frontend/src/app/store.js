import { configureStore } from '@reduxjs/toolkit';

import loginSlice from '../features/loginSlice';
import chatSlice from '../features/chatSlice';
import validationSlice from '../features/validationSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice,
    chat: chatSlice,
    validation: validationSlice,
  },
  devTools: true,
});

export default store;
