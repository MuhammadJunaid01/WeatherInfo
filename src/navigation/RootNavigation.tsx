import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList} from '../lib/types';
import DrawerNavigator from './DrawerNavigator';
const Stack = createStackNavigator<RootStackParamList>();
const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
