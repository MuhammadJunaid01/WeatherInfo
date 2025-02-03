/* eslint-disable react/no-unstable-nested-components */
// DrawerNavigator.tsx
import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useCallback, useMemo} from 'react';
import {useColorScheme} from 'react-native';
import {CustomDrawer, CustomDrawerHeader} from '../components';
import {COLORS} from '../config/constants'; // Ensure COLORS is imported correctly
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

      if (resolvedTheme !== activeTheme) {
        console.log(`Theme updated: ${resolvedTheme}`); // Optional: log theme changes
        dispatch(setTheme({theme: resolvedTheme, activeTheme: themeVal}));
      }
    },
    [activeTheme, dispatch, systemTheme],
  );

  const {activeItemColor, inactiveItemColor, drawerBackgroundColor} = useMemo(
    () => ({
      activeItemColor: COLORS.primary,
      inactiveItemColor:
        theme === 'dark' ? COLORS.dark.secondary : COLORS.light.secondary,
      drawerBackgroundColor:
        theme === 'dark' ? COLORS.dark.primary : COLORS.light.primary,
    }),
    [theme],
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
            theme={theme}
          />
        ),
        headerShown: true, // Ensure header is shown in the Drawer
        drawerStyle: {
          backgroundColor: drawerBackgroundColor, // Background color of the drawer
        },
        drawerActiveTintColor: activeItemColor, // Text color for active items
        drawerInactiveTintColor: inactiveItemColor, // Text color for inactive items
        drawerActiveBackgroundColor:
          theme === 'dark' ? COLORS.dark.secondary : COLORS.primary, // Background color for active items
        drawerInactiveBackgroundColor:
          theme === 'dark' ? COLORS.dark.primary : COLORS.light.primary, // Background color for inactive items
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

export default React.memo(DrawerNavigator);
