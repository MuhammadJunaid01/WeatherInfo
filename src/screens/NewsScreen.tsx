/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-shadow */
import {useNetInfo} from '@react-native-community/netinfo'; // Import useNetInfo
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, FlatList, ListRenderItem, View} from 'react-native';
import tw from 'twrnc';
import {Loader, NewsArticleCard, ThemedView} from '../components';
import ApiError from '../components/shared/ApiError';
import {screenHeight} from '../config/constants';
import {useAppSelector} from '../hooks/useReduxHooks';
import {isMobile, TabParamList} from '../lib';
import {INewsArticle} from '../lib/shared.interface';
import {useLazyGetNewsQuery} from '../services/apis/newApiSlice';

const ITEM_HEIGHT = screenHeight * (isMobile() ? 0.5 : 0.37);

type Props = StackScreenProps<TabParamList, 'News'>;

const NewsScreen: React.FC<Props> = () => {
  const {theme} = useAppSelector(state => state.theme);
  const isDarkMode = useMemo(() => theme === 'dark', [theme]);
  const [articles, setArticles] = useState<INewsArticle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {isConnected} = useNetInfo(); // Get network connection state
  const {articles: articleSate} = useAppSelector(state => state.news); // Redux state for articles and totalResults

  const [triggerGetNews, {data, isFetching, isLoading, error}] =
    useLazyGetNewsQuery();

  useEffect(() => {
    if (isConnected) {
      // Only fetch if online
      if (currentPage === 1) {
        // If we are on the first page, fetch new data
        triggerGetNews({query: 'bitcoin', page: currentPage, pageSize: 10});
      } else {
        triggerGetNews({query: 'bitcoin', page: currentPage, pageSize: 10});
      }
    } else if (!isConnected && articleSate.length > 0) {
      // If offline, use Redux state
      setArticles(articleSate);
      setHasMore(true); // Ensure that offline pagination still works if there are multiple pages of cached articles
    }
  }, [isConnected, currentPage, triggerGetNews, articleSate]);

  useEffect(() => {
    if (data?.articles) {
      setArticles(prev => [...prev, ...data.articles]);
      setHasMore(data.articles.length < data?.totalResults); // Check if there's more based on totalResults
    }
  }, [data]);

  const loadMore = useCallback(() => {
    if (!isFetching && hasMore && !isRefreshing) {
      // Only load more if not fetching and there are more items
      if (isConnected) {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
      } else {
        // Handle offline scroll: If the user reaches the end, paginate over cached data
        if (articleSate.length > 0) {
          const nextPage = currentPage + 1;
          setCurrentPage(nextPage);
        }
      }
    }
  }, [
    currentPage,
    hasMore,
    isFetching,
    isRefreshing,
    isConnected,
    articleSate,
  ]);

  const renderItem: ListRenderItem<INewsArticle> = useCallback(
    ({item}) => (
      <NewsArticleCard
        isDarkMode={isDarkMode}
        item_height={ITEM_HEIGHT}
        article={item}
      />
    ),
    [isDarkMode],
  );

  const keyExtractor = useCallback(
    (item: INewsArticle, index: number) => `${item.title}-${index}`,
    [],
  );

  const getItemLayout = useCallback(
    (data: ArrayLike<INewsArticle> | null | undefined, index: number) => ({
      length: ITEM_HEIGHT, // approximate height of each item
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  const ListFooter = useCallback(
    () =>
      isFetching && hasMore ? (
        <View style={tw`py-14`}>
          <ActivityIndicator style={tw`my-4`} size="large" color="#0000ff" />
        </View>
      ) : null,
    [isFetching, hasMore],
  );

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setArticles([]); // Clear articles on refresh
    setCurrentPage(1); // Reset page to 1
    setHasMore(true); // Ensure more pages can be fetched
    if (isConnected) {
      triggerGetNews({query: 'bitcoin', page: 1, pageSize: 10});
    } else {
      setArticles(articleSate); // Use Redux state if offline
      setIsRefreshing(false); // End refresh immediately if offline
    }
    setIsRefreshing(false); // End refresh immediately if offline
  }, [isConnected, triggerGetNews, articleSate]);

  useEffect(() => {
    if (!isFetching && !isRefreshing) {
      setIsRefreshing(false); // Reset refreshing state when fetching is complete
    }
  }, [isFetching, isRefreshing]);

  if (isLoading && !articles.length) {
    return (
      <ThemedView style={tw`flex-1 items-center justify-center`}>
        <Loader size="large" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={tw`flex-1`}>
      {error && 'status' in error && error.status === 426 ? (
        <ApiError error={error} />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          contentContainerStyle={tw`p-2`}
          ListFooterComponent={ListFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          // removeClippedSubviews={true}
          updateCellsBatchingPeriod={100}
          scrollEventThrottle={16}
        />
      )}
    </ThemedView>
  );
};

export default React.memo(NewsScreen);
