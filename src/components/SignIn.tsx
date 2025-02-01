/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Alert, Button, TextInput, View} from 'react-native';
import {signIn} from '../hooks/useAuth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      Alert.alert('Success', 'User signed in successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{padding: 20}}>
      <TextInput
        style={{borderWidth: 1, marginBottom: 10, padding: 8}}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{borderWidth: 1, marginBottom: 10, padding: 8}}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

export default SignIn;
