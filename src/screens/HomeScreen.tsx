import React from 'react';
import {StatusBar} from 'react-native';
import tw from '../../tailwind';
import {ThemedText, ThemedView} from '../components';

const HomeScreen = () => {
  return (
    <ThemedView style={tw` flex-1 bg-white p-3 `}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <ThemedText size="h2">Home</ThemedText>
    </ThemedView>
  );
};

export default React.memo(HomeScreen);
