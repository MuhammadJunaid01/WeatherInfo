/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {HomeIcon, NewsIcon, WeatherIcon} from '../assets/icons';
import {COLORS, moderateVerticalScale, scale} from '../config/constants';
import {useAppSelector} from '../hooks/useReduxHooks';
import {TabParamList} from '../lib/types';
import {HomeScreen, NewsScreen, WeatherInfoScreen} from '../screens';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  const {theme} = useAppSelector(state => state.theme);

  // Dynamic styles based on theme
  const isDarkTheme = theme === 'dark';
  const tabBarBackgroundColor = isDarkTheme
    ? COLORS.dark.primary
    : COLORS.light.primary;
  const tabBarIconColor = isDarkTheme
    ? COLORS.dark.secondary
    : COLORS.light.secondary;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary, // Active icon color
        tabBarInactiveTintColor: tabBarIconColor, // Inactive icon color
        tabBarLabelStyle: {
          fontSize: scale(11),
          fontWeight: '600',
          paddingTop: 3,
        },
        tabBarStyle: {
          height: moderateVerticalScale(55),
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: scale(10),
          paddingBottom: scale(10),
          backgroundColor: tabBarBackgroundColor, // Dynamic background color
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <HomeIcon
              size={40}
              fill={focused ? COLORS.primary : tabBarIconColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <NewsIcon
              size={40}
              fill={focused ? COLORS.primary : tabBarIconColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Weather"
        component={WeatherInfoScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <WeatherIcon
              size={40}
              fill={focused ? COLORS.primary : tabBarIconColor}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
