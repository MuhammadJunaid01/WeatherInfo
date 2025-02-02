import React from 'react';
import {Button, StatusBar, View} from 'react-native';
import tw from '../../tailwind';
import {ThemedText} from '../components';
import {getCurrentUser} from '../hooks/useAuth';
import {useAppDispatch, useAppSelector} from '../hooks/useReduxHooks';
import {setTheme} from '../services/features/themeSlice';

const HomeScreen = () => {
  const {theme} = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();
  const user = getCurrentUser();
  console.log('user', user);
  return (
    <View style={tw` flex-1 bg-white p-3 gap-y-3`}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <ThemedText size="h1">Home {theme}</ThemedText>
      <Button
        title="Dark"
        onPress={() => {
          dispatch(setTheme('dark'));
        }}
      />
      <Button
        title="Light"
        onPress={() => {
          dispatch(setTheme('light'));
        }}
      />
      <Button
        title="System"
        onPress={() => {
          dispatch(setTheme('system'));
        }}
      />
    </View>
  );
};

export default React.memo(HomeScreen);
