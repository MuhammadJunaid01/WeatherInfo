import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback} from 'react';
import {StatusBar, View} from 'react-native';
import tw from '../../tailwind';
import {AuthForm} from '../components';
import {signIn} from '../hooks/useAuth';
import {useAppDispatch, useAppSelector} from '../hooks/useReduxHooks';
import {RootStackParamList} from '../lib';
type Props = StackScreenProps<RootStackParamList, 'SignIn'>;
const SignInScreen: React.FC<Props> = ({navigation}) => {
  const {error, loading} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const onPressSignUp = useCallback(
    async (email: string, password: string) => {
      await signIn(email, password, dispatch, navigation);
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
        isSignUp={false}
      />
    </View>
  );
};

export default React.memo(SignInScreen);
