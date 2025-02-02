import {setNews} from '../slices/newsSlice';
import {RootState} from '../store'; // Adjust the path as necessary
import {apiSlice} from './apiSlice'; // Ensure your base apiSlice is properly configured

const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`;

const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getNews: builder.query<any[], void>({
      query: () => ({
        url: NEWS_API_URL,
        method: 'GET',
      }),
      async onQueryStarted(_arg, {dispatch, queryFulfilled}) {
        try {
          // Fetch the latest data from the API
          const {data} = await queryFulfilled;

          // Update Redux state with new data
          dispatch(setNews(data));
        } catch (error) {
          console.error('Error fetching news:', error);
        }
      },
      // Select data from Redux if offline
      transformResponse(baseQueryReturnValue, meta) {
        const state = (meta as any).getState() as RootState;

        if (!state.network.isConnected) {
          // If offline, use Redux state
          return state.news.articles;
        }

        // Use the fetched data when online
        return baseQueryReturnValue as any[];
      },
    }),
  }),
});

export const {useGetNewsQuery} = newsApiSlice;
