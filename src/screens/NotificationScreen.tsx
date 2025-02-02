import React from 'react';
import {Text, View} from 'react-native';
import tw from '../../tailwind';

const NotificationScreen = () => {
  return (
    <View style={tw` flex-1 bg-white`}>
      <Text>NotificationScreen</Text>
    </View>
  );
};

export default React.memo(NotificationScreen);
