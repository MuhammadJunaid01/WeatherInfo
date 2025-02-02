import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback} from 'react';
import {StatusBar, View} from 'react-native';
import tw from '../../tailwind';
import {AuthForm} from '../components';
import {signUp} from '../hooks/useAuth';
import {useAppDispatch, useAppSelector} from '../hooks/useReduxHooks';
import {RootStackParamList} from '../lib';
type Props = StackScreenProps<RootStackParamList, 'SignUp'>;
const SignUpScreen: React.FC<Props> = ({navigation}) => {
  const {error, loading} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const onPressSignUp = useCallback(
    async (email: string, password: string) => {
      await signUp(email, password, dispatch, navigation);
    },
    [dispatch, navigation],
  );
  return (
    <View style={tw` flex-1 bg-white p-3`}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <AuthForm
        onPressAction={onPressSignUp}
        isLoading={loading}
        errMessage={error}
        navigation={navigation}
        isSignUp
      />
    </View>
  );
};

export default React.memo(SignUpScreen);
