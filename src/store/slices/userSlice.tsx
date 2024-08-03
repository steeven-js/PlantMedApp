import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SerializableUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  // isPrenium: boolean;
};

type UserState = {
  user: SerializableUser | null;
  rememberMe: boolean;
  isPrenium: boolean;
};

const initialState: UserState = {
  user: null,
  rememberMe: false,
  isPrenium: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<SerializableUser | null>) {
      state.user = action.payload;
    },
    logOut(state) {
      state.user = null;
      state.rememberMe = false;
      state.isPrenium = false;
    },
    setRememberMe(state, action: PayloadAction<boolean>) {
      state.rememberMe = action.payload;
    },
  },
});

export const { setUser, logOut, setRememberMe } = userSlice.actions;

export {userSlice};
