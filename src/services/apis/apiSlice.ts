import NetInfo from '@react-native-community/netinfo';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {showToast} from '../../lib';
import {RootState} from '../store'; // Adjust the path to your store

// Define the API
export const apiSlice = createApi({
  tagTypes: ['newsSources', 'newsHeadlines', 'news'],
  baseQuery: async (args, api, extraOptions) => {
    // Check network status using NetInfo
    const netInfo = await NetInfo.fetch();
    const isConnected = netInfo.isConnected;

    const endpoint = typeof args === 'string' ? args : args.url;
    // If offline, return cached  data
    if (!isConnected) {
      const state = api.getState() as RootState;

      // Define cached data mapping
      const cachedDataMapping: Record<string, any> = {
        'https://newsapi.org/v2/top-headlines/sources?category=general&apiKey=45c7c5c6d2ac401b87bb679eaac59bfc':
          state.headline.articles,
        '/https://newsapi.org/v2/everything?page=58&pageSize=10&apiKey=45c7c5c6d2ac401b87bb679eaac59bfc':
          state.news.articles,
        'https://api.openweathermap.org/data/2.5/weather?lat=37.372996666666666&lon=-122.10320666666667&appid=15d3bf5add6ee893a41a7476cfa10ba6&units=metric':
          state.weather.weather,
      };

      const cachedData = cachedDataMapping[endpoint];

      if (cachedData) {
        showToast('Network unavailable. Returning cached data.');
        return {data: cachedData};
      }
      showToast('No cached data available.');
      console.error('No cached data available.');
      return {
        error: {
          status: 'NETWORK_ERROR',
          data: 'No internet connection and no cached data available for the requested endpoint.',
        },
      };
    }

    // Proceed with the actual request if online
    return fetchBaseQuery()(args, api, extraOptions);
  },
  endpoints: _builder => ({}),
});

// Export hooks for usage in components
