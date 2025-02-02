/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, ListRenderItem, View} from 'react-native';
import tw from 'twrnc';
import {Loader, NewsArticleCard} from '../components';
import {screenHeight} from '../config/constants';
import {INewsArticle} from '../lib/shared.interface';
import {useLazyGetNewsQuery} from '../services/apis/newApiSlice';
const ITEM_HEIGHT = screenHeight * 0.89;
const NewsScreen = () => {
  const [articles, setArticles] = useState<INewsArticle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [triggerGetNews, {data, isFetching, isLoading}] = useLazyGetNewsQuery();

  useEffect(() => {
    // Fetch the first page of articles when the component mounts
    triggerGetNews({query: 'bitcoin', page: 1, pageSize: 10});
  }, [triggerGetNews]);
  console.log('data?.articles.length', data?.articles.length);
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
    ({item}) => <NewsArticleCard item_height={ITEM_HEIGHT} article={item} />,
    [],
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
    return <Loader size="large" />;
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={articles}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        contentContainerStyle={tw`bg-white p-2`}
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
    </View>
  );
};

export default React.memo(NewsScreen);
