/* eslint-disable react/no-unstable-nested-components */
// TabNavigator.tsx
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {HomeIcon, NewsIcon, WeatherIcon} from '../assets/icons';
import {COLORS, moderateVerticalScale, scale} from '../config/constants';
import {TabParamList} from '../lib/types';
import {HomeScreen, NewsScreen, WeatherInfoScreen} from '../screens';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: `${COLORS.primary}`,
      tabBarLabelStyle: {
        fontSize: scale(11), // Adjust font size
        fontWeight: '600', // Optional: Make text bold
        paddingTop: 3,
      },
      tabBarStyle: {
        height: moderateVerticalScale(55),
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: scale(10),
        paddingBottom: scale(10),
      },
    }}>
    <Tab.Screen
      name="Home"
      options={{
        tabBarIcon: ({focused}) => {
          return (
            <HomeIcon size={40} fill={focused ? COLORS.primary : '#6b7280'} />
          );
        },
      }}
      component={HomeScreen}
    />
    <Tab.Screen
      name="News"
      component={NewsScreen}
      options={{
        tabBarIcon: ({focused}) => {
          return (
            <NewsIcon size={40} fill={focused ? COLORS.primary : '#6b7280'} />
          );
        },
      }}
    />
    <Tab.Screen
      name="Weather"
      component={WeatherInfoScreen}
      options={{
        tabBarIcon: ({focused}) => {
          return (
            <WeatherIcon
              size={40}
              fill={focused ? COLORS.primary : '#6b7280'}
            />
          );
        },
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
