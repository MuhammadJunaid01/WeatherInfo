import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

const baseQuery: BaseQueryFn = fetchBaseQuery({
  //include credentials
});

const baseQueryWithNetworkCheck: BaseQueryFn = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions);
  console.log('BaseQuery Result:', result);
  return result;
};

export const apiSlice = createApi({
  tagTypes: [],
  baseQuery: baseQueryWithNetworkCheck,
  endpoints: _builder => ({}),
});
