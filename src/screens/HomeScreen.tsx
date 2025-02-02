import React, {useCallback} from 'react';
import {StatusBar, View} from 'react-native';
import tw from '../../tailwind';
import {AuthForm} from '../components';
import {signUp} from '../hooks/useAuth';
import {useAppDispatch, useAppSelector} from '../hooks/useReduxHooks';

const HomeScreen = () => {
  const {error, loading, user} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const onPressSignUp = useCallback(
    async (email: string, password: string) => {
      await signUp(email, password, dispatch);
    },
    [dispatch],
  );
  console.log('user', user);
  return (
    <View style={tw` flex-1 bg-white p-3 `}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <AuthForm
        onPressAction={onPressSignUp}
        isLoading={loading}
        errMessage={error}
      />
    </View>
  );
};

export default React.memo(HomeScreen);
