import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
  createNetworkMiddleware,
  reducer as network,
} from 'react-native-offline';
import {persistReducer, persistStore} from 'redux-persist';
import {apiSlice} from '../apis/apiSlice'; // Adjust the path as necessary
import authReducer from '../features/authSlice';
import newsReducer from '../features/newsSlice';
import themeReducer from '../features/themeSlice';
import weatherReducer from '../features/weatherSlice';

// Middleware for detecting network status
const networkMiddleware = createNetworkMiddleware();

// Persist configuration
const createPersistConfig = (key: string) => ({
  key,
  storage: AsyncStorage,
});

// Persisted reducers for specific slices
const persistedReducers = {
  news: persistReducer(createPersistConfig('news'), newsReducer),
  weather: persistReducer(createPersistConfig('weather'), weatherReducer),
  theme: persistReducer(createPersistConfig('theme'), themeReducer),
};

// Root reducer combining all slices
const rootReducer = combineReducers({
  ...persistedReducers,
  auth: authReducer, // Auth slice does not require persistence
  network, // Network state managed by react-native-offline
  [apiSlice.reducerPath]: apiSlice.reducer, // API slice for dynamic fetching
});

// Store configuration
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: true, // Helps detect state mutations
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Avoid issues with Redux Persist actions
      },
    }).concat(apiSlice.middleware, networkMiddleware),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

// Persistor for managing store persistence
export const persistor = persistStore(store, null, () => {
  console.log('Redux persist initialization complete.');
});

// Listeners setup for RTK Query features like refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

// Types for Redux state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
