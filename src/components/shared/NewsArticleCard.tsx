import React from 'react';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import tw from 'twrnc';
import {COLORS, moderateScale, screenHeight} from '../../config/constants';
import {isMobile} from '../../lib';
import {INewsArticle} from '../../lib/shared.interface';
import ThemedText from './ThemedText';

interface NewsArticleCardProps {
  article: INewsArticle;
  item_height?: number;
  isDarkMode: boolean;
}

const NewsArticleCard: React.FC<NewsArticleCardProps> = ({
  article,
  isDarkMode,
  item_height = screenHeight * 0.89,
}) => {
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
    <View
      style={tw` rounded-lg h-[${moderateScale(item_height)}px] ${
        isDarkMode ? `border border-[${COLORS.primary}]` : ' bg-white shadow'
      }  m-1 mb-4   `}>
      <View style={tw`relative`}>
        <FastImage
          source={{
            uri: article?.urlToImage,
            priority: FastImage.priority.high,
          }}
          style={tw`w-full h-[${moderateScale(
            isMobile() ? item_height / 2.4 : item_height / 1.7,
          )}px]`}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={tw`absolute top-4 left-4 bg-blue-600 px-2 py-1 rounded`}>
          <ThemedText size="h4" style={tw` ${isDarkMode ? '' : 'text-white'}`}>
            {article?.source?.name}
          </ThemedText>
        </View>
      </View>

      <View style={tw`px-3 py-1`}>
        <View style={tw`mb-2`}>
          <ThemedText numberOfLines={1} size="h3" style={tw` mb-1`}>
            {article?.title}
          </ThemedText>
          <ThemedText size="h5" style={tw` `} numberOfLines={3}>
            {article?.description}
          </ThemedText>
        </View>

        <View style={tw`mt-1 flex-row justify-between items-center`}>
          <View style={tw`flex-row items-center`}>
            <View
              style={tw`h-8 w-8 rounded-full bg-gray-200 mr-2 items-center justify-center`}>
              <Text style={tw`text-sm font-medium text-gray-600`}>
                {article?.author?.[0]?.toUpperCase() || '?'}
              </Text>
            </View>
            <View>
              <ThemedText numberOfLines={1} size="h5" style={tw` `}>
                {article?.author || 'Unknown Author'}
              </ThemedText>
              <ThemedText size="h5" style={tw``}>
                {formatDate(article?.publishedAt)}
              </ThemedText>
            </View>
          </View>

          <TouchableOpacity
            hitSlop={{top: 30, right: 30, bottom: 30, left: 30}}
            onPress={handlePress}
            style={tw`flex-row items-center`}>
            <ThemedText size="h4" style={tw`  mr-1`}>
              Read More
            </ThemedText>
            {/* You can add an icon here using a React Native icon library if desired */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NewsArticleCard;
