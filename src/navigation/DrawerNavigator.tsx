/* eslint-disable react/no-unstable-nested-components */
// DrawerNavigator.tsx
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {CustomDrawerHeader} from '../components';
import {useAppSelector} from '../hooks/useReduxHooks';
import {DrawerParamList} from '../lib/types';
import {NotificationScreen} from '../screens';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  const {user} = useAppSelector(state => state.auth);
  return (
    <Drawer.Navigator
      screenOptions={{
        header: props => (
          <CustomDrawerHeader
            {...props}
            title="Dashboard"
            showNotification={true}
            notificationCount={5}
            user={user}
          />
        ),
        headerShown: true, // Ensure header is shown in the Drawer
      }}>
      <Drawer.Screen name="Main" component={TabNavigator} />
      <Drawer.Screen name="Notification" component={NotificationScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
