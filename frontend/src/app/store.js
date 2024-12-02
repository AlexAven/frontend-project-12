import { configureStore } from '@reduxjs/toolkit';

import loginSlice from '../features/loginSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice,
  },
  devTools: true,
});

export default store;
