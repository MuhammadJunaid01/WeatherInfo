import React from 'react';
import {StatusBar} from 'react-native';
import tw from '../../tailwind';
import {ThemedText, ThemedView, WeatherInfo} from '../components';
import {useAppDispatch} from '../hooks/useReduxHooks';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  return (
    <ThemedView style={tw` flex-1  p-3  gap-y-3`}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <ThemedText size="h2">Home</ThemedText>
      {/* <Button title="Dark Mode" onPress={() => dispatch(setTheme('dark'))} />
      <Button title="Light Mode" onPress={() => dispatch(setTheme('light'))} />
      <Button title="Dark Mode" onPress={() => dispatch(setTheme('system'))} /> */}
      <WeatherInfo />
    </ThemedView>
  );
};

export default React.memo(HomeScreen);
