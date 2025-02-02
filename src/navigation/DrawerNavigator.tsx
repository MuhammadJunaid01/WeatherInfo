/* eslint-disable react/no-unstable-nested-components */
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {CustomDrawerHeader} from '../components';
import {DrawerParamList} from '../lib/types';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      header: props => (
        <CustomDrawerHeader
          {...props}
          title="Dashboard"
          showNotification={true}
          notificationCount={5}
          profileImage="https://imageplaceholder.net/100x100"
        />
      ),
    }}>
    <Drawer.Screen name="Main" component={TabNavigator} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
