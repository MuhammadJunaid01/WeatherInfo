import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  tagTypes: ['newsSources', 'newsHeadlines', 'news'],
  baseQuery: async (args, api, extraOptions) => {
    // Proceed with online request
    return fetchBaseQuery()(args, api, extraOptions);
  },
  endpoints: _builder => ({}),
});

//
