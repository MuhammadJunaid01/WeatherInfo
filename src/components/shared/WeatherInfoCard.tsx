import React from 'react';
import {Text, View} from 'react-native';
import tw from 'twrnc';

const WeatherInfoCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <View style={tw`bg-gray-100 p-4 rounded-lg m-2`}>
    <Text style={tw`text-gray-600 text-sm mb-1`}>{label}</Text>
    <Text style={tw`text-gray-800 text-lg font-semibold`}>{value}</Text>
  </View>
);

export default React.memo(WeatherInfoCard);
