import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  prenium: false,
};

export const premiumSlice = createSlice({
  name: 'premium',
  initialState,
  reducers: {
    setPremium: (state, action) => {
      state.prenium = action.payload;
    },
  },
});

export const {setPremium} = premiumSlice.actions;
