import React from 'react';
import {Text, View} from 'react-native';
import {useGetNewsQuery} from '../services/apis/newApiSlice';

const HomeScreen = () => {
  const {data, error, isLoading} = useGetNewsQuery('');
  console.log('data news ', data);
  console.log('error', error);
  if (isLoading) {
  }
  return (
    <View>
      <Text>HomeScrenbmnben</Text>
    </View>
  );
};

export default React.memo(HomeScreen);
