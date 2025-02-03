import React from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {COLORS} from '../../config/constants';
import ThemedText from './ThemedText';
interface IProps {
  label: string;
  value: string | number;
  isDarkMode?: boolean;
}
const WeatherInfoCard: React.FC<IProps> = ({label, value, isDarkMode}) => {
  return (
    <View
      style={tw` ${
        isDarkMode ? `border border-[${COLORS.primary}]` : 'shadow'
      }  p-4 rounded-lg m-2`}>
      <ThemedText size="h4" style={tw` mb-1`}>
        {label}
      </ThemedText>
      <ThemedText size="h3" style={tw``}>
        {value}
      </ThemedText>
    </View>
  );
};

export default React.memo(WeatherInfoCard);
