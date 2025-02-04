import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
  createNetworkMiddleware,
  reducer as network,
} from 'react-native-offline';
import {persistReducer, persistStore} from 'redux-persist';

import {customNetworkMiddleware} from '../../lib';
import {apiSlice} from '../apis/apiSlice';
import authReducer from '../features/authSlice';
import newsHeadLineReducer from '../features/newsHeadlineSlice';
import newsReducer from '../features/newsSlice';
import newsSourcesSliceReducer from '../features/newsSourcesSlice';
import themeReducer from '../features/themeSlice';
import weatherReducer from '../features/weatherSlice';

// Middleware
const networkMiddleware = createNetworkMiddleware();

// Persist Configurations
const persistConfig = (key: string) => ({
  key,
  storage: AsyncStorage,
});

// Combine Persisted Reducers
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig('auth'), authReducer),
  news: persistReducer(persistConfig('news'), newsReducer),
  theme: persistReducer(persistConfig('theme'), themeReducer),
  weather: persistReducer(persistConfig('weather'), weatherReducer),
  headline: persistReducer(persistConfig('headline'), newsHeadLineReducer),
  source: persistReducer(persistConfig('source'), newsSourcesSliceReducer),
  network,
  [apiSlice.reducerPath]: apiSlice.reducer, // Keep RTK Query dynamic fetching reducer
});

// Store Configuration
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore redux-persist actions
      },
    }).concat(apiSlice.middleware, networkMiddleware, customNetworkMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Persistor Initialization
export const persistor = persistStore(store);
setupListeners(store.dispatch);

// Export Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
