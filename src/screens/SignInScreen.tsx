import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useMemo} from 'react';
import tw from '../../tailwind';
import {AuthForm, ThemedView} from '../components';
import {signIn} from '../hooks/useAuth';
import {useAppDispatch, useAppSelector} from '../hooks/useReduxHooks';
import {RootStackParamList} from '../lib';
type Props = StackScreenProps<RootStackParamList, 'SignIn'>;
const SignInScreen: React.FC<Props> = ({navigation}) => {
  const {error, loading} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const {theme} = useAppSelector(state => state.theme);
  const isDarkMode = useMemo(() => theme === 'dark', [theme]);
  const onPressSignUp = useCallback(
    async (email: string, password: string) => {
      await signIn(email, password, dispatch, navigation);
    },
    [dispatch, navigation],
  );
  return (
    <ThemedView style={tw` flex-1  p-3`}>
      <AuthForm
        onPressAction={onPressSignUp}
        isLoading={loading}
        errMessage={error}
        navigation={navigation}
        isSignUp={false}
        isDarkMode={isDarkMode}
      />
    </ThemedView>
  );
};

export default React.memo(SignInScreen);
