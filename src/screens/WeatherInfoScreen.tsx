import React from 'react';
import {Text, View} from 'react-native';
import tw from '../../tailwind';

const WeatherInfoScreen = () => {
  return (
    <View style={tw` `}>
      <Text>WeatherInfoScreen</Text>
    </View>
  );
};

export default React.memo(WeatherInfoScreen);
