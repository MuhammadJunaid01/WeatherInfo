import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {apiSlice} from '../apis/apiSlice'; // Adjust the path as necessary
import newsReducer from '../slices/newsSlice';
import weatherReducer from '../slices/weatherSlice';

// Separate persist configurations

// Combined reducer
const rootReducer = combineReducers({
  news: newsReducer,
  weather: weatherReducer,
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
    }).concat(apiSlice.middleware), // Add RTK Query middleware
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

// Persistor initialization

export type RootState = ReturnType<typeof store.getState>; // Type for root state
export type AppDispatch = typeof store.dispatch; // Type for dispatch

export default store;
