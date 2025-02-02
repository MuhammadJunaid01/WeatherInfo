import {IGenericNewsResponse, INewsArticle} from '../../lib/shared.interface';
import {setNews} from '../features/newsSlice';
import {RootState} from '../store';
import {apiSlice} from './apiSlice';

const NEWS_API_URL = 'https://newsapi.org/v2/everything';

const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getNews: builder.query<
      IGenericNewsResponse<INewsArticle[]>,
      {query?: string; page: number; pageSize: number}
    >({
      queryFn: async (
        {query, page, pageSize},
        _queryApi,
        _extraOptions,
        baseQuery,
      ) => {
        const state = _queryApi.getState() as RootState;

        console.log('Network connected:', state.network.isConnected);

        // Handle offline state
        if (!state.network.isConnected) {
          const offlineData = state.news.articles;
          const totalResults = state.news.totalResults;
          const status = state.news.status;

          return {
            data: {
              articles: offlineData || [],
              totalResults: totalResults || 0,
              status: status || 'offline',
            } as unknown as IGenericNewsResponse<INewsArticle>,
          };
        }

        // Handle online state
        try {
          const response = await baseQuery({
            url: `${NEWS_API_URL}?q=${encodeURIComponent(
              query,
            )}&page=${page}&pageSize=${pageSize}&apiKey=${
              process.env.NEWS_API_KEY
            }`,
            method: 'GET',
          });

          if (response.error) {
            console.error('API Error:', response.error);
            return {error: response.error};
          }

          return {data: response.data as IGenericNewsResponse<INewsArticle>};
        } catch (error) {
          console.error('Error in queryFn:', error);
          return {error};
        }
      },
      async onQueryStarted(
        {query, page, pageSize},
        {dispatch, queryFulfilled},
      ) {
        try {
          const {data} = await queryFulfilled;

          if (Array.isArray(data.articles)) {
            dispatch(
              setNews({
                articles: data.articles,
                totalResults: data.totalResults,
                status: data.status,
              }),
            );
          } else {
            console.error('Expected data.articles to be an array');
          }
        } catch (error) {
          console.error('Error in onQueryStarted:', error);
        }
      },
    }),
  }),
});

export const {useGetNewsQuery, useLazyGetNewsQuery} = newsApiSlice;
