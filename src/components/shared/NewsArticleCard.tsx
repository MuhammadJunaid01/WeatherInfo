import React from 'react';
import {Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import {INewsArticle} from '../../lib/shared.interface';

interface NewsArticleCardProps {
  article: INewsArticle;
}

const NewsArticleCard: React.FC<NewsArticleCardProps> = ({article}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };

  const handlePress = async () => {
    const supported = await Linking.canOpenURL(article.url);
    if (supported) {
      await Linking.openURL(article.url);
    }
  };

  return (
    <View style={tw`bg-white rounded-lg shadow m-1 mb-4 overflow-hidden`}>
      <View style={tw`relative`}>
        <Image
          source={{uri: article?.urlToImage}}
          style={tw`w-full h-48`}
          resizeMode="cover"
        />
        <View style={tw`absolute top-4 left-4 bg-blue-600 px-2 py-1 rounded`}>
          <Text style={tw`text-white text-sm font-medium`}>
            {article?.source?.name}
          </Text>
        </View>
      </View>

      <View style={tw`p-4`}>
        <View style={tw`mb-2`}>
          <Text style={tw`text-xl font-bold text-gray-900 mb-2`}>
            {article?.title}
          </Text>
          <Text style={tw`text-base text-gray-600`} numberOfLines={3}>
            {article?.description}
          </Text>
        </View>

        <View style={tw`mt-4 flex-row justify-between items-center`}>
          <View style={tw`flex-row items-center`}>
            <View
              style={tw`h-8 w-8 rounded-full bg-gray-200 mr-2 items-center justify-center`}>
              <Text style={tw`text-sm font-medium text-gray-600`}>
                {article?.author?.[0]?.toUpperCase() || '?'}
              </Text>
            </View>
            <View>
              <Text style={tw`text-sm font-medium text-gray-900`}>
                {article?.author || 'Unknown Author'}
              </Text>
              <Text style={tw`text-sm text-gray-500`}>
                {formatDate(article?.publishedAt)}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={handlePress}
            style={tw`flex-row items-center`}>
            <Text style={tw`text-sm font-medium text-blue-600 mr-1`}>
              Read More
            </Text>
            {/* You can add an icon here using a React Native icon library if desired */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NewsArticleCard;
