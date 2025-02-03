import React, {useEffect, useMemo} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import tw from '../../tailwind';
import {Loader, ThemedText, ThemedView} from '../components';
import AnimatedLoader from '../components/shared/AnimatedLoader';
import TopNewsHeadline from '../components/TopNewsHeadline';
import {COLORS} from '../config/constants';
import {useAppDispatch, useAppSelector} from '../hooks/useReduxHooks';
import {
  useGetNewsHeadLineQuery,
  useGetNewsSourcesQuery,
} from '../services/apis/newApiSlice';
import {setTheme} from '../services/features/themeSlice';

const HomeScreen = () => {
  const {data, isLoading} = useGetNewsHeadLineQuery({
    country: 'us', // Example country
    page: 1,
    pageSize: 5,
  });
  const {data: sources} = useGetNewsSourcesQuery({category: 'general'});
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
      {data && data.articles.length > 0 && (
        <TopNewsHeadline isDarkMode={isDarkMode} article={data.articles[0]} />
      )}
    </ThemedView>
  );
};

export default React.memo(HomeScreen);
