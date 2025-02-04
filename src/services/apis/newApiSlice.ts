import {showToast} from '../../lib';
import {setHeadline} from '../features/newsHeadlineSlice';
import {setNews} from '../features/newsSlice';
import {setSources} from '../features/newsSourcesSlice';
import {apiSlice} from './apiSlice';

const NEWS_API_URL = 'https://newsapi.org/v2';

const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getNews: builder.query({
      query: ({
        query,
        page,
        pageSize,
        searchIn,
        sources,
        domains,
        excludeDomains,
        from,
        to,
        language,
        sortBy,
      }) => {
        const params = new URLSearchParams({
          ...(query && {q: query}),
          ...(searchIn && {searchIn}),
          ...(sources && {sources}),
          ...(domains && {domains}),
          ...(excludeDomains && {excludeDomains}),
          ...(from && {from}),
          ...(to && {to}),
          ...(language && {language}),
          ...(sortBy && {sortBy}),
          page: page.toString(),
          pageSize: pageSize.toString(),
          apiKey: process.env.NEWS_API_KEY,
        }).toString();

        return `${NEWS_API_URL}/everything?${params}`;
      },
      providesTags: ['news'],
      onQueryStarted: async ({}, {dispatch, queryFulfilled}) => {
        // Access Redux state
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
            showToast('Expected data.articles to be an array');
          }
        } catch (error: any) {
          showToast(error?.message || 'Unexpected Error!');
        }
      },
    }),

    getNewsHeadLine: builder.query({
      query: ({country, page, pageSize}) =>
        `${NEWS_API_URL}/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`,
      providesTags: ['newsHeadlines'],
      onQueryStarted: async ({}, {dispatch, queryFulfilled}) => {
        const {data} = await queryFulfilled;
        dispatch(setHeadline(data));
      },
    }),

    getNewsSources: builder.query({
      query: ({category, language, country}) => {
        const params = new URLSearchParams({
          ...(category && {category}),
          ...(language && {language}),
          ...(country && {country}),
          apiKey: process.env.NEWS_API_KEY,
        }).toString();

        return `${NEWS_API_URL}/top-headlines/sources?${params}`;
      },
      providesTags: ['newsSources'],
      onQueryStarted: async ({}, {dispatch, queryFulfilled}) => {
        const {data} = await queryFulfilled;

        dispatch(setSources(data));
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetNewsQuery,
  useGetNewsHeadLineQuery,
  useGetNewsSourcesQuery,
  useLazyGetNewsHeadLineQuery,
  useLazyGetNewsQuery,
  useLazyGetNewsSourcesQuery,
} = newsApiSlice;
