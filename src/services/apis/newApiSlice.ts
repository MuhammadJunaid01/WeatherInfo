import {showToast} from '../../lib';
import {
  IGenericNewsResponse,
  INewsArticle,
  INewsSource,
} from '../../lib/shared.interface';
import {setHeadline} from '../features/newsHeadlineSlice';
import {RootState} from '../store';
import {apiSlice} from './apiSlice';

const NEWS_API_URL = 'https://newsapi.org/v2';

const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getNews: builder.query<
      IGenericNewsResponse<INewsArticle[]>,
      {
        query?: string;
        page: number;
        pageSize: number;
        searchIn?: string;
        sources?: string;
        domains?: string;
        excludeDomains?: string;
        from?: string;
        to?: string;
        language?: string;
        sortBy?: 'relevancy' | 'popularity' | 'publishedAt'; // Sorting order
      }
    >({
      queryFn: async (
        {
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
        },
        _queryApi,
        _extraOptions,
        baseQuery,
      ) => {
        const state = _queryApi.getState() as RootState;

        if (!state.network.isConnected) {
          const offlineData = state.news.articles;
          const totalResults = state.news.totalResults;
          const status = state.news.status;
          return {
            data: {
              articles: offlineData || [],
              totalResults: totalResults || 0,
              status: status || 'offline',
            },
          };
        }

        try {
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

          const response = await baseQuery({
            url: `${NEWS_API_URL}/everything?${params}`,
            method: 'GET',
          });

          if (response.error) {
            return {error: response.error};
          }

          return {data: response.data as IGenericNewsResponse<INewsArticle>};
        } catch (error) {
          return {error};
        }
      },
      async onQueryStarted({}, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;

          if (Array.isArray(data.articles)) {
            dispatch(
              setHeadline({
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

    // Top Headlines Endpoint
    getNewsHeadLine: builder.query<
      IGenericNewsResponse<INewsArticle[]>,
      {country: string; page: number; pageSize: number}
    >({
      queryFn: async (
        {country, page, pageSize},
        _queryApi,
        _extraOptions,
        baseQuery,
      ) => {
        const state = _queryApi.getState() as RootState;

        if (!state.network.isConnected) {
          const offlineData = state.headline.articles;
          const totalResults = state.headline.totalResults;
          const status = state.headline.status;
          return {
            data: {
              articles: offlineData || [],
              totalResults: totalResults || 0,
              status: status || 'offline',
            },
          };
        }

        try {
          const response = await baseQuery({
            url: `${NEWS_API_URL}/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=45c7c5c6d2ac401b87bb679eaac59bfc`,
            method: 'GET',
          });

          if (response.error) {
            return {error: response.error};
          }

          return {data: response.data as IGenericNewsResponse<INewsArticle>};
        } catch (error) {
          return {error};
        }
      },
      async onQueryStarted({}, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          if (Array.isArray(data.articles)) {
            dispatch(
              setHeadline({
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
    getNewsSources: builder.query<
      {status: string; sources: INewsSource[]},
      {category?: string; language?: string; country?: string}
    >({
      queryFn: async (
        {category, language, country},
        _queryApi,
        _extraOptions,
        baseQuery,
      ) => {
        const state = _queryApi.getState() as RootState;

        if (!state.network.isConnected) {
          const offlineSources = state.source.sources;
          const status = state.source.status;
          return {
            data: {
              sources: offlineSources || [],
              status: status || 'offline',
            },
          };
        }

        try {
          const params = new URLSearchParams({
            ...(category && {category}),
            ...(language && {language}),
            ...(country && {country}),
            apiKey: '45c7c5c6d2ac401b87bb679eaac59bfc',
          }).toString();

          const response = await baseQuery({
            url: `${NEWS_API_URL}/top-headlines/sources?${params}`,
            method: 'GET',
          });

          if (response.error) {
            return {error: response.error};
          }

          return {data: response.data as IGenericNewsResponse<INewsSource[]>};
        } catch (error) {
          return {error};
        }
      },
      async onQueryStarted({}, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          // if (Array.isArray(data.sources)) {
          //   dispatch({
          //     type: 'sources/setSources',
          //     payload: {
          //       sources: data.sources,
          //       status: data.status,
          //     },
          //   });
          // } else {
          //   showToast('Expected data.sources to be an array');
          // }
        } catch (error: any) {
          showToast(error?.message || 'Unexpected Error!');
        }
      },
    }),
  }),
});

export const {
  useGetNewsQuery,
  useLazyGetNewsQuery,
  useGetNewsHeadLineQuery,
  useGetNewsSourcesQuery,
  useLazyGetNewsHeadLineQuery,
  useLazyGetNewsSourcesQuery,
} = newsApiSlice;
