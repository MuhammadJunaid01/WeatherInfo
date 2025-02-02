// RootNavigation.tsx
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList} from '../lib/types';
import {SignInScreen, SignUpScreen} from '../screens';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* Render Drawer Navigator */}
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{headerShown: false}} // Ensure no header is shown for Drawer screen
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false, animation: 'slide_from_right'}} // Ensure no header is shown for Drawer screen
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false, animation: 'slide_from_right'}} // Ensure no header is shown for Drawer screen
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
