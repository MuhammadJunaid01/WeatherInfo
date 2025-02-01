/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Alert, Button, TextInput, View} from 'react-native';
import {signUp} from '../hooks/useAuth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      Alert.alert('Success', 'User signed up successfully!');
    } catch (error: any) {
      console.log(error.message);
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
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUp;
