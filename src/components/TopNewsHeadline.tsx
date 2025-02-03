import React, {useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
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
  onPress,
  isDarkMode,
}) => {
  // Shared value for animation
  const animationProgress = useSharedValue(0);

  useEffect(() => {
    // Animate the component when it mounts
    animationProgress.value = withTiming(1, {duration: 500});
  }, [animationProgress]);

  // Animated styles for entrance and scaling
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            animationProgress.value,
            [0, 1],
            [0.8, 1],
            Extrapolation.CLAMP,
          ),
        },
      ],
      opacity: interpolate(
        animationProgress.value,
        [0, 1],
        [0, 1],
        Extrapolation.CLAMP,
      ),
    };
  });

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
      style={tw`flex-row ${
        isDarkMode ? ` border border-[${COLORS.primary}]` : 'shadow-md'
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
