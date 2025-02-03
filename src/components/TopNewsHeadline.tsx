import React from 'react';
import {Image, View} from 'react-native';
import tw from 'twrnc';
import {COLORS} from '../config/constants';
import {INewsArticle} from '../lib';
import {ThemedText} from './shared';

// News Article Interface

interface TopNewsHeadlineProps {
  article: INewsArticle;
  onPress?: () => void;
  isDarkMode: boolean;
}

const TopNewsHeadline: React.FC<TopNewsHeadlineProps> = ({
  article,
  isDarkMode,
}) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <View
      style={tw`flex-row m-1 ${
        isDarkMode
          ? ` border border-[${COLORS.primary}]`
          : 'bg-white  shadow-md'
      } p-2 rounded-lg `}>
      <Image
        source={{uri: article.urlToImage}}
        style={tw`w-24 h-24 rounded-lg mr-4`}
        resizeMode="cover"
      />
      <View style={tw`flex-1`}>
        <ThemedText numberOfLines={1} size="h4" style={tw` mb-1`}>
          {article.title}
        </ThemedText>
        <ThemedText size="h5" style={tw` mb-1`}>
          {article.source.name}
        </ThemedText>
        <ThemedText size="h5" style={tw` mb-1`}>
          {formatDate(article.publishedAt)}
        </ThemedText>
        <ThemedText size="h5" numberOfLines={2} style={tw` mb-1`}>
          {article.description}
        </ThemedText>
      </View>
    </View>
  );
};

export default TopNewsHeadline;
