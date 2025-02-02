import React from 'react';
import {ActivityIndicator, ActivityIndicatorProps, View} from 'react-native';
import tw from '../../../tailwind';
interface IProps extends ActivityIndicatorProps {
  // size?: number | 'small' | 'large';
}
const Loader: React.FC<IProps> = ({...rest}) => {
  return (
    <View style={tw`  items-center justify-center`}>
      <ActivityIndicator {...rest} />
    </View>
  );
};

export default React.memo(Loader);
