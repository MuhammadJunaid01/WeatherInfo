import React from 'react';
import {ScrollView, StatusBar, Text, View} from 'react-native';
import tw from '../../tailwind';
import {Loader} from '../components';
import NewsArticleCard from '../components/shared/NewsArticleCard';
import {useGetNewsQuery} from '../services/apis/newApiSlice';

const HomeScreen = () => {
  const {data, error, isLoading} = useGetNewsQuery('');
  console.log('data news ', data?.articles);
  // console.log('error', error);
  if (isLoading) {
    return <Loader size={'large'} />;
  }
  return (
    <View style={tw` flex-1 bg-white`}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <ScrollView contentContainerStyle={tw` flex-grow`}>
        <View style={tw` flex-1`}>
          {data?.articles?.map((article, i) => {
            return <NewsArticleCard article={article} key={i} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default React.memo(HomeScreen);
