import React from 'react';
import {StatusBar, View} from 'react-native';
import tw from '../../tailwind';
import {ThemedText} from '../components';

const HomeScreen = () => {
  return (
    <View style={tw` flex-1 bg-white p-3 `}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <ThemedText size="h2">Home</ThemedText>
    </View>
  );
};

export default React.memo(HomeScreen);
