import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import tw from '../../tailwind';
import {ThemedText, ThemedView} from '../components';
import {useAppDispatch, useAppSelector} from '../hooks/useReduxHooks';
import {setTheme} from '../services/features/themeSlice';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const {activeTheme} = useAppSelector(state => state.theme);
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
  return (
    <ThemedView style={tw` flex-1  p-3  gap-y-3`}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <ThemedText size="h2">Home</ThemedText>
      {/* <Button title="Dark Mode" onPress={() => dispatch(setTheme('dark'))} />
      <Button title="Light Mode" onPress={() => dispatch(setTheme('light'))} />
      <Button title="Dark Mode" onPress={() => dispatch(setTheme('system'))} /> */}
    </ThemedView>
  );
};

export default React.memo(HomeScreen);
