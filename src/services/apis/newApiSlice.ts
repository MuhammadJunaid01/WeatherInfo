import {IGenericNewsResponse, INewsArticle} from '../../lib/shared.interface';
import {setNews} from '../slices/newsSlice';
import {RootState} from '../store';
import {apiSlice} from './apiSlice';

const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`;

const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getNews: builder.query<IGenericNewsResponse<INewsArticle>, string>({
      queryFn: async (_arg, _queryApi, _extraOptions, baseQuery) => {
        const state = _queryApi.getState() as RootState;

        console.log('Network connected:', state.network.isConnected);

        // Handle offline state
        if (!state.network.isConnected) {
          const offlineData = state.news.articles;
          return {data: offlineData || []}; // Fallback to an empty array if no articles
        }

        // Handle online state
        try {
          const response = await baseQuery({
            url: NEWS_API_URL,
            method: 'GET',
          });

          if (response.error) {
            console.error('API Error:', response.error);
            return {error: response.error};
          }

          return {data: response.data as any[]};
        } catch (error) {
          console.error('Error in queryFn:', error);
          return {error};
        }
      },
      async onQueryStarted(_arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(setNews(data?.articles as unknown as INewsArticle[]));
        } catch (error) {
          console.error('Error in onQueryStarted:', error);
        }
      },
    }),
  }),
});

export const {useGetNewsQuery} = newsApiSlice;
