import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useMemo} from 'react';
import tw from '../../tailwind';
import {AuthForm, ThemedView} from '../components';
import {signUp} from '../hooks/useAuth';
import {useAppDispatch, useAppSelector} from '../hooks/useReduxHooks';
import {RootStackParamList} from '../lib';
type Props = StackScreenProps<RootStackParamList, 'SignUp'>;
const SignUpScreen: React.FC<Props> = ({navigation}) => {
  const {error, loading} = useAppSelector(state => state.auth);
  const {theme} = useAppSelector(state => state.theme);
  const isDarkMode = useMemo(() => theme === 'dark', [theme]);
  const dispatch = useAppDispatch();
  const onPressSignUp = useCallback(
    async (email: string, password: string) => {
      await signUp(email, password, dispatch, navigation);
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
        isSignUp
        isDarkMode={isDarkMode}
      />
    </ThemedView>
  );
};

export default React.memo(SignUpScreen);
