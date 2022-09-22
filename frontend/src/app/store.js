import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice"
import gameListReducer from "../features/gameLists/gameListSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gameLists: gameListReducer,
  },
});
