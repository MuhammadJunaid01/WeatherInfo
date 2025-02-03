import React from 'react';
import tw from '../../tailwind';
import {ThemedText, ThemedView} from '../components';

const NotificationScreen = () => {
  return (
    <ThemedView style={tw` flex-1  p-3`}>
      <ThemedText size="h3">NotificationScreen</ThemedText>
    </ThemedView>
  );
};

export default React.memo(NotificationScreen);
