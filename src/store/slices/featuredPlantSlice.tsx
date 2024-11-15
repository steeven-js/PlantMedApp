import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    featuredPlants: [],
  };

const featuredPlantSlice = createSlice({
    name: 'featuredPlants',
    initialState,
    reducers: {
        setFeaturedPlants: (state, action) => {
            state.featuredPlants = action.payload;
        }
    },
  });

  export const {setFeaturedPlants} = featuredPlantSlice.actions;
