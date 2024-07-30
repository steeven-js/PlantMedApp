import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../../types/UserType';

type UserState = { user: UserType | null; rememberMe: boolean };

const initialState: UserState = { user: null, rememberMe: false };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    logOut: state => {
      state.user = null;
      state.rememberMe = false;
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
    setPrenium: (state, action: PayloadAction<boolean>) => {
      if (state.user) {
        state.user.isPrenium = action.payload;
      }
    },
  },
});

export const {
  logOut,
  setUser,
  setPrenium,
  setRememberMe,
} = userSlice.actions;

export { userSlice };