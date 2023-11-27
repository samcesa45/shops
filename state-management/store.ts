import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PAUSE, PURGE, REGISTER, REHYDRATE, FLUSH, PERSIST} from 'redux-persist';
import userReducer from './features/usersSlice';
import categoryReducer from './features/categoriesSlice';
import productReducer from './features/productsSlice';
import persistReducer from 'redux-persist/lib/persistReducer';
import newestProductReducer from './features/newestProductSlice';
import brandReducer from './features/brandSlice';
import filterReducer from './features/filterSlice';
import cartItemReducer from './features/cartItemSlice';
// import {api} from './services/api';

const reducers = combineReducers({
  user: userReducer,
  category: categoryReducer,
  brand: brandReducer,
  product: productReducer,
  newestProduct: newestProductReducer,
  filter: filterReducer,
  cartItem: cartItemReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  Whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,

  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaulMiddleware =>
    getDefaulMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

//Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

//Inferred type: {posts:PostsState,comments:CommentsState}
export type AppDispatch = typeof store.dispatch;
