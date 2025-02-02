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
  const result = await baseQuery(args, api, extraOptions);

  return result;
};

export const apiSlice = createApi({
  tagTypes: [],
  baseQuery: baseQueryWithNetworkCheck,
  endpoints: _builder => ({}),
});
