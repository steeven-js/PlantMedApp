import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import {apiSlice} from './slices/apiSlice';
import {tabSlice} from './slices/tabSlice';
import {tagSlice} from './slices/tagSlice';
import {userSlice} from './slices/userSlice';
import {cartSlice} from './slices/cartSlice';
import {startSlice} from './slices/startSlice';
import {filterSlice} from './slices/filterSlice';
import {premiumSlice} from './slices/preniumSlice';
import {paymentSlice} from './slices/paymentSlice';
import {versionSlice} from './slices/versionSlice';
import {wishlistSlice} from './slices/wishlistSlice';
import {promocodeSlice} from './slices/promocodeSlice';
import {plantmedWishlistSlice} from './slices/plantmedWishlistSlice';

// Combine all the slices into a root reducer
const rootReducer = combineReducers({
  tabSlice: tabSlice.reducer,
  tagSlice: tagSlice.reducer,
  apiSlice: apiSlice.reducer,
  userSlice: userSlice.reducer,
  cartSlice: cartSlice.reducer,
  startSlice: startSlice.reducer,
  filterSlice: filterSlice.reducer,
  premiumSlice: premiumSlice.reducer,
  versionSlice: versionSlice.reducer,
  paymentSlice: paymentSlice.reducer,
  wishlistSlice: wishlistSlice.reducer,
  promocodeSlice: promocodeSlice.reducer,
  plantmedWishlistSlice: plantmedWishlistSlice.reducer,
});

// Configure persistence with AsyncStorage
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'tabSlice',
    'userSlice',
    'cartSlice',
    'startSlice',
    'premiumSlice',
    'versionSlice',
    'paymentSlice',
    'wishlistSlice',
    'promocodeSlice',
    'plantmedWishlistSlice',
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
    }).concat(apiSlice.middleware),
});

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Configure the persistor
export const persistor = persistStore(store);
