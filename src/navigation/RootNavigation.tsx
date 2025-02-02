// RootNavigation.tsx
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList} from '../lib/types';
import DrawerNavigator from './DrawerNavigator';
import TabNavigator from './TabNavigator';

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

      {/* You could add any other screens to this stack */}
      {/* This will keep the TabNavigator always rendered */}
      {/* <Stack.Screen name="Tab" component={TabNavigator} /> */}
    </Stack.Navigator>
  );
};

export default RootNavigation;
