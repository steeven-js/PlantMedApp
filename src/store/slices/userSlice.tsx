import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../../types/UserType';
import { useSubscription } from '../../hooks/revenueCat';
import { useAppDispatch } from '../../hooks';
import { useEffect } from 'react';

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
    setPremium: (state, action: PayloadAction<boolean>) => {
      if (state.user) {
        state.user.isPrenium = action.payload;
      }
    },
    setCancelAtPeriodEnd: (state, action: PayloadAction<boolean>) => {
      if (state.user) {
        state.user.cancelAtPeriodEnd = action.payload;
      }
    },
  },
});

export const {
  setUser,
  logOut,
  setRememberMe,
  setPremium,
  setCancelAtPeriodEnd,
} = userSlice.actions;

export { userSlice };

// Créez un hook personnalisé pour gérer la mise à jour de l'abonnement
export function useUpdateSubscription() {
  const { isSubscribed, checkSubscriptionStatus } = useSubscription();
  const dispatch = useAppDispatch(); // Assurez-vous d'importer useAppDispatch de vos hooks

  useEffect(() => {
    dispatch(setPremium(isSubscribed));
  }, [isSubscribed, dispatch]);

  return { checkSubscriptionStatus };
}