import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, StatusBar, useColorScheme, View} from 'react-native';
import tw from '../../tailwind';
import {ThemedText, ThemedView} from '../components';
import AnimatedLoader from '../components/shared/AnimatedLoader';
import ThemedButton from '../components/shared/ThemedButton';
import TopNewsHeadline from '../components/TopNewsHeadline';
import {COLORS, screenWidth} from '../config/constants';
import {useAppDispatch, useAppSelector} from '../hooks/useReduxHooks';
import {
  useGetNewsSourcesQuery,
  useLazyGetNewsHeadLineQuery,
} from '../services/apis/newApiSlice';
import {setTheme} from '../services/features/themeSlice';
interface IHeadlineQuery {
  country: string;
  page: number;
  pageSize: number;
}
const initialHeadlineQuery: IHeadlineQuery = {
  country: 'us', // Example country
  page: 1,
  pageSize: 5,
};
const HomeScreen = () => {
  const [headlineQuery, setHeadlineQuery] =
    useState<IHeadlineQuery>(initialHeadlineQuery);
  const [getHeadline, {data: headline, isLoading}] =
    useLazyGetNewsHeadLineQuery();
  const {data: sourcesData} = useGetNewsSourcesQuery({category: 'general'});
  const dispatch = useAppDispatch();
  const {activeTheme, theme} = useAppSelector(state => state.theme);
  const isDarkMode = useMemo(() => theme === 'dark', [theme]);
  const systemTheme = useColorScheme();
  useEffect(() => {
    if (!activeTheme) {
      dispatch(
        setTheme({
          theme: systemTheme === 'dark' ? 'dark' : 'light',
          activeTheme: systemTheme === 'dark' ? 'dark' : 'light',
        }),
      );
    }
  }, [activeTheme, dispatch, systemTheme]);
  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
    StatusBar.setBackgroundColor(
      isDarkMode ? COLORS.dark.primary : COLORS.light.primary,
    );
  }, [isDarkMode]);
  useEffect(() => {
    getHeadline({
      country: 'us', // Example country
      page: 1,
      pageSize: 5,
    });
  }, [getHeadline]);
  console.log('sources', sourcesData?.sources[0]);
  if (isLoading) {
    return (
      <ThemedView style={tw` flex-1`}>
        <AnimatedLoader
          height={6}
          backgroundColor="#F3F4F6"
          loaderColor="#10B981"
          duration={1000}
        />
      </ThemedView>
    );
  }
  return (
    <ThemedView style={tw` flex-1  p-3  gap-y-3`}>
      <ThemedText size="h2">Home</ThemedText>
      {headline && headline.articles.length > 0 && (
        <View style={tw`   w-full`}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {headline.articles.map((head, i) => {
              return (
                <View style={tw` w-[${screenWidth * 0.67}px] mr-3`} key={i}>
                  <TopNewsHeadline isDarkMode={isDarkMode} article={head} />
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
      <ThemedButton isDarkMode={isDarkMode} size="h2">
        hello
      </ThemedButton>
    </ThemedView>
  );
};

export default React.memo(HomeScreen);
