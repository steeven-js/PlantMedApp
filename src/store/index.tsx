import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';

import { tabSlice } from './slices/tabSlice';

import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from 'redux-persist';

// Combine all the slices into a root reducer
const rootReducer = combineReducers({
  tabSlice: tabSlice.reducer,
});

// Configure persistence with AsyncStorage
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'tabSlice',
  ],
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer and middlewares
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 100,
      },
      immutableCheck: {
        warnAfter: 100,
      },
    }),
});

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Configure the persistor
export const persistor = persistStore(store);
