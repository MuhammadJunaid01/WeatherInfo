import React from 'react';
import {Text, View} from 'react-native';
import {useGetNewsQuery} from '../services/apis/newApiSlice';

const HomeScreen = () => {
  const {data, error} = useGetNewsQuery();
  console.log('data news ', data);
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
