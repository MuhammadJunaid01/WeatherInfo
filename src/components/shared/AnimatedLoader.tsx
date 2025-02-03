/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Dimensions, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import tw from 'twrnc';

interface AnimatedLoaderProps {
  height?: number;
  backgroundColor?: string;
  loaderColor?: string;
  duration?: number;
}

const AnimatedLoader: React.FC<AnimatedLoaderProps> = ({
  height = 4,
  backgroundColor = '#E5E7EB',
  loaderColor = '#3B82F6',
  duration = 1500,
}) => {
  const screenWidth = Dimensions.get('window').width; // Get screen width
  const progress = useSharedValue(-screenWidth); // Start outside the screen on the left

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(screenWidth, {
        duration,
        easing: Easing.linear,
      }),
      -1, // Repeat indefinitely
      false, // Do not reverse
    );
  }, [duration, screenWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: progress.value}],
  }));

  return (
    <View
      style={[
        tw`w-full`,
        {
          height,
          backgroundColor, // Background of the loader track
          overflow: 'hidden', // Ensure the loader doesn't go outside
        },
      ]}>
      <Animated.View
        style={[
          {
            height,
            width: screenWidth * 0.3, // Set loader width as a percentage of screen width
            backgroundColor: loaderColor, // Loader bar color
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};

export default AnimatedLoader;
