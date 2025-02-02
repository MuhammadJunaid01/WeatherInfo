import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

// Screens
import RootNavigation from './RootNavigation';

// Create a Stack Navigator with typed param list

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default React.memo(AppNavigator);
