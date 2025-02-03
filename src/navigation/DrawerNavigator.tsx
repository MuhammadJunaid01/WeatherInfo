/* eslint-disable react/no-unstable-nested-components */
// DrawerNavigator.tsx
import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useCallback} from 'react';
import {useColorScheme} from 'react-native';
import {CustomDrawer, CustomDrawerHeader} from '../components';
import {useAppDispatch, useAppSelector} from '../hooks/useReduxHooks';
import {DrawerParamList, Theme} from '../lib/types';
import {NotificationScreen} from '../screens';
import {setTheme} from '../services/features/themeSlice';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  // Single selector for better performance
  const {user} = useAppSelector(state => state.auth);
  const {theme} = useAppSelector(state => state.theme);

  const dispatch = useAppDispatch();
  const systemTheme = useColorScheme(); // Automatically re-calculates when system theme changes

  // Memoized callback for theme change handling
  const onThemeChange = useCallback(
    (themeVal: Theme) => {
      const resolvedTheme =
        themeVal === 'system'
          ? systemTheme === 'dark'
            ? 'dark'
            : 'light'
          : themeVal;

      if (resolvedTheme !== theme) {
        dispatch(setTheme(resolvedTheme));
      }
    },
    [dispatch, systemTheme, theme],
  );
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
      }}
      drawerContent={props => (
        <CustomDrawer
          props={props}
          theme={theme}
          onThemeChange={onThemeChange}
        />
      )}>
      <Drawer.Screen name="Main" component={TabNavigator} />
      <Drawer.Screen name="Notification" component={NotificationScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
