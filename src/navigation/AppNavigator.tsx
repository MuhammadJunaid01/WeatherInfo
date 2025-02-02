// AppNavigator.tsx
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

// Screens
import RootNavigation from './RootNavigation';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default React.memo(AppNavigator);
