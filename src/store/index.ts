import { configureStore } from '@reduxjs/toolkit';
import { startConnectionWatcher } from 'hooks/useConnection';

import authReducer from './slices/auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type GlobalStore = typeof store;
