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
  const {theme, activeTheme} = useAppSelector(state => state.theme);
  console.log('theme', theme);
  const dispatch = useAppDispatch();
  const systemTheme = useColorScheme(); // Automatically re-calculates when system theme changes

  // Memoized callback for theme change handling
  const onThemeChange = useCallback(
    (themeVal: Theme) => {
      // Resolve the final theme based on user selection or system preference
      const resolvedTheme =
        themeVal === 'system'
          ? systemTheme === 'dark'
            ? 'dark'
            : 'light'
          : themeVal;

      // Dispatch only if the theme has changed
      if (resolvedTheme !== activeTheme) {
        console.log(`Theme updated: ${resolvedTheme}`); // Optional: log theme changes
        dispatch(setTheme({theme: resolvedTheme, activeTheme: themeVal}));
      }
    },
    [activeTheme, dispatch, systemTheme],
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
          activeTheme={activeTheme}
        />
      )}>
      <Drawer.Screen name="Main" component={TabNavigator} />
      <Drawer.Screen name="Notification" component={NotificationScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
