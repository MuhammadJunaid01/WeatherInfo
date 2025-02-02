// TabNavigator.tsx
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {TabParamList} from '../lib/types';
import {HomeScreen, NewsScreen} from '../screens';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="News" component={NewsScreen} />
  </Tab.Navigator>
);

export default TabNavigator;
