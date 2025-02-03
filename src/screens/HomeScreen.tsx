import React, {useEffect, useMemo} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import tw from '../../tailwind';
import {ThemedText, ThemedView} from '../components';
import {COLORS} from '../config/constants';
import {useAppDispatch, useAppSelector} from '../hooks/useReduxHooks';
import {setTheme} from '../services/features/themeSlice';

const HomeScreen = () => {
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
  return (
    <ThemedView style={tw` flex-1  p-3  gap-y-3`}>
      <ThemedText size="h2">Home</ThemedText>
    </ThemedView>
  );
};

export default React.memo(HomeScreen);
