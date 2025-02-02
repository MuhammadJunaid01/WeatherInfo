import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';
import tw from '../../tailwind';
import {RootStackParamList} from '../lib';
type Props = StackScreenProps<RootStackParamList, 'SignIn'>;
const SignInScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={tw` flex-1 bg-white p-3`}>
      <Text>SignInScreen</Text>
    </View>
  );
};

export default React.memo(SignInScreen);
