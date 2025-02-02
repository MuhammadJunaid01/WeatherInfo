import {setNews} from '../slices/newsSlice';
import {apiSlice} from './apiSlice'; // Ensure your base apiSlice is properly configured

const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`;

const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getNews: builder.query<any, void>({
      query: () => ({
        url: NEWS_API_URL,
        method: 'GET',
      }),
      onQueryStarted: async (_arg, api) => {
        const {data} = await api.queryFulfilled;
        api.dispatch(setNews(data?.data));
      },
    }),
  }),
});

export const {useGetNewsQuery} = newsApiSlice;
