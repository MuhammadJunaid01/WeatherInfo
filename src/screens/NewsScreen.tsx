/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, FlatList, ListRenderItem} from 'react-native';
import tw from 'twrnc';
import {Loader, NewsArticleCard, ThemedView} from '../components';
import ApiError from '../components/shared/ApiError';
import {screenHeight} from '../config/constants';
import {useAppSelector} from '../hooks/useReduxHooks';
import {TabParamList} from '../lib';
import {INewsArticle} from '../lib/shared.interface';
import {useLazyGetNewsQuery} from '../services/apis/newApiSlice';
const ITEM_HEIGHT = screenHeight * 0.89;
type Props = StackScreenProps<TabParamList, 'News'>;
const NewsScreen: React.FC<Props> = () => {
  const {theme} = useAppSelector(state => state.theme);
  const isDarkMode = useMemo(() => theme === 'dark', [theme]);
  const [articles, setArticles] = useState<INewsArticle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [triggerGetNews, {data, isFetching, isLoading, error}] =
    useLazyGetNewsQuery();
  console.log('error', error);
  useEffect(() => {
    // Fetch the first page of articles when the component mounts
    triggerGetNews({query: 'bitcoin', page: 1, pageSize: 10});
  }, [triggerGetNews]);
  useEffect(() => {
    if (data?.articles) {
      setArticles(prev => [...prev, ...data.articles]);
      setHasMore(data.articles.length === 10); // If fewer than 10 items, no more pages
    }
  }, [data]);

  const loadMore = useCallback(() => {
    if (!isFetching && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      triggerGetNews({page: nextPage, pageSize: 10});
    }
  }, [currentPage, hasMore, isFetching, triggerGetNews]);

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

  const ListFooter = () =>
    isFetching && hasMore ? (
      <ActivityIndicator style={tw`my-4`} size="large" color="#0000ff" />
    ) : null;

  if (isLoading && !articles.length) {
    return (
      <ThemedView style={tw` flex-1 items-center justify-center`}>
        <Loader size="large" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={tw`flex-1 `}>
      {error && 'status' in error && error.status === 429 ? (
        <ApiError error={error} />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          contentContainerStyle={tw` p-2`}
          ListFooterComponent={ListFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshing={isFetching}
          onRefresh={() => {
            setArticles([]);
            setCurrentPage(1);
            setHasMore(true);
            triggerGetNews({query: 'bitcoin', page: 1, pageSize: 10});
          }}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={100}
          scrollEventThrottle={16}
        />
      )}
    </ThemedView>
  );
};

export default React.memo(NewsScreen);
