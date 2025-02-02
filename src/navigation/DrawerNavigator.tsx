// DrawerNavigator.tsx
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {DrawerParamList} from '../lib/types';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Main" component={TabNavigator} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
