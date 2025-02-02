import NetInfo from '@react-native-community/netinfo';
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

const baseQuery: BaseQueryFn = fetchBaseQuery({
  prepareHeaders: headers => {
    return headers;
  },
  credentials: 'include',
});

const baseQueryWithNetworkCheck: BaseQueryFn = async (
  args,
  api,
  extraOptions,
) => {
  // Check network availability
  const networkState = await NetInfo.fetch();
  if (!networkState.isConnected) {
    // Return an error if the network is not available
    return {
      error: {status: 'NETWORK_ERROR', message: 'Network unavailable'},
    };
  }

  // Proceed with the API call if the network is available
  const result = await baseQuery(args, api, extraOptions);

  return result;
};

export const apiSlice = createApi({
  tagTypes: [],
  baseQuery: baseQueryWithNetworkCheck,
  endpoints: _builder => ({}),
});
