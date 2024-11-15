import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  premium: false,
};

export const premiumSlice = createSlice({
  name: 'premium',
  initialState,
  reducers: {
    setPremium: (state, action) => {
      state.premium = action.payload;
    },
  },
});

export const {setPremium} = premiumSlice.actions;
