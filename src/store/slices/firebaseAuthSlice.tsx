import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

type FirebaseAuthState = {
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: FirebaseAuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const firebaseAuthSlice = createSlice({
  name: 'firebaseAuth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<FirebaseAuthTypes.User | null>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    signOut: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<FirebaseAuthTypes.User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const {
  setUser,
  setLoading,
  setError,
  signOut,
  updateUserProfile,
} = firebaseAuthSlice.actions;

export { firebaseAuthSlice };