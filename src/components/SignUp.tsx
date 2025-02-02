/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import {Alert, Button, TextInput, View} from 'react-native';
import {signUp} from '../hooks/useAuth';
import {useAppDispatch} from '../hooks/useReduxHooks';
interface IState {
  email: string;
  password: string;
}
const initialState: IState = {
  email: '',
  password: '',
};
const SignUp = () => {
  const [state, setState] = useState<IState>(initialState);
  const dispatch = useAppDispatch();
  const handleSignUp = async () => {
    try {
      await signUp(state.email, state.password, dispatch);
      Alert.alert('Success', 'User signed up successfully!');
    } catch (error: any) {
      console.log(error.message);
      Alert.alert('Error', error.message);
    }
  };
  const onStateChange = useCallback(
    (key: keyof IState, val: string) =>
      setState(prev => ({...prev, [key]: val})),
    [],
  );
  return (
    <View style={{padding: 20}}>
      <TextInput
        style={{borderWidth: 1, marginBottom: 10, padding: 8}}
        placeholder="Email"
        onChangeText={text => onStateChange('email', text)}
      />
      <TextInput
        style={{borderWidth: 1, marginBottom: 10, padding: 8}}
        placeholder="Password"
        secureTextEntry
        onChangeText={text => onStateChange('password', text)}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUp;
