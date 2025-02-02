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
const networkMiddleware = createNetworkMiddleware();

// Separate persist configurations
const newsPersistConfig = {
  key: 'news',
  storage: AsyncStorage,
};

const weatherPersistConfig = {
  key: 'weather',
  storage: AsyncStorage,
};
const themePersistConfig = {
  key: 'theme',
  storage: AsyncStorage,
};

// Persisted reducers
const persistedNewsReducer = persistReducer(newsPersistConfig, newsReducer);
const persistedWeatherReducer = persistReducer(
  weatherPersistConfig,
  weatherReducer,
);
const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);

// Combined reducer
const rootReducer = combineReducers({
  news: persistedNewsReducer,
  weather: persistedWeatherReducer,
  theme: persistedThemeReducer,
  auth: authReducer,
  network,
  [apiSlice.reducerPath]: apiSlice.reducer, // Keep API slice for dynamic fetching
});

// Configure the store
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: true, // Enable immutable checks where necessary
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(apiSlice.middleware, networkMiddleware), // Add RTK Query middleware
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

// Persistor initialization
export const persistor = persistStore(store);
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>; // Type for root state
export type AppDispatch = typeof store.dispatch; // Type for dispatch

export default store;
