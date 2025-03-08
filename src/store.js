import { configureStore } from '@reduxjs/toolkit';
import authReducer from './modules/auth/reducer';
import forumReducer from './modules/forums/reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    forumReducer: forumReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store; 
