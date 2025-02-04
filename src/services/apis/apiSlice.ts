import NetInfo from '@react-native-community/netinfo';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {showToast} from '../../lib';
import {RootState} from '../store'; // Adjust the path to your store

const getCachedData = (state: RootState, endpoint: string): any => {
  const cachedDataMapping: Record<string, (state: RootState) => any> = {
    '/top-headlines': state => state.headline.articles,
    '/everything': state => state.news.articles,
    '/weather': state => state.weather.weather,
  };

  const matchEndpoint = Object.keys(cachedDataMapping).find(key =>
    endpoint.includes(key),
  );

  if (matchEndpoint) {
    return cachedDataMapping[matchEndpoint](state);
  }
  return null;
};

const handleError = (message: string) => {
  showToast(message);
  console.error(message);
  return {
    error: {
      status: 'NETWORK_ERROR',
      data: message,
    },
  };
};

export const apiSlice = createApi({
  tagTypes: ['newsSources', 'newsHeadlines', 'news'],
  baseQuery: async (args, api, extraOptions) => {
    // Check network status
    const netInfo = await NetInfo.fetch();
    const isConnected = netInfo.isConnected;

    const endpoint = typeof args === 'string' ? args : args.url;

    if (!isConnected) {
      const state = api.getState() as RootState;
      const cachedData = getCachedData(state, endpoint);

      if (cachedData) {
        showToast('Network unavailable. Returning cached data.');
        return {data: cachedData};
      }

      return handleError(
        'No internet connection and no cached data available for the requested endpoint.',
      );
    }

    // Proceed with online request
    return fetchBaseQuery()(args, api, extraOptions);
  },
  endpoints: _builder => ({}),
});

//
