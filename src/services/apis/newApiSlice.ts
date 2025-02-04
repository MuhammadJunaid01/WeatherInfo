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
          apiKey: '45c7c5c6d2ac401b87bb679eaac59bfc',
        }).toString();

        return `${NEWS_API_URL}/everything?${params}`;
      },
      providesTags: ['news'],
    }),

    getNewsHeadLine: builder.query({
      query: ({country, page, pageSize}) =>
        `${NEWS_API_URL}/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=45c7c5c6d2ac401b87bb679eaac59bfc`,
      providesTags: ['newsHeadlines'],
    }),

    getNewsSources: builder.query({
      query: ({category, language, country}) => {
        const params = new URLSearchParams({
          ...(category && {category}),
          ...(language && {language}),
          ...(country && {country}),
          apiKey: '45c7c5c6d2ac401b87bb679eaac59bfc',
        }).toString();

        return `${NEWS_API_URL}/top-headlines/sources?${params}`;
      },
      providesTags: ['newsSources'],
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
