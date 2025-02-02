import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import tw from '../../../tailwind';

const Loader = () => {
  return (
    <View style={tw`  items-center justify-center`}>
      <ActivityIndicator size={'small'} />
    </View>
  );
};

export default React.memo(Loader);
