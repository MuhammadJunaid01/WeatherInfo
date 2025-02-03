import React from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {Theme} from '../../lib';
import ThemedText from './ThemedText';
interface IProps {
  label: string;
  value: string | number;
  theme?: Theme;
}
const WeatherInfoCard: React.FC<IProps> = ({label, value}) => (
  <View style={tw`bg-gray-100 p-4 rounded-lg m-2`}>
    <ThemedText size="h4" style={tw` mb-1`}>
      {label}
    </ThemedText>
    <ThemedText size="h3" style={tw``}>
      {value}
    </ThemedText>
  </View>
);

export default React.memo(WeatherInfoCard);
