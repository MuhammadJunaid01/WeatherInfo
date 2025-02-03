import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import tw from '../../tailwind';
import {ThemedText} from './shared';

const CustomDrawer = (props: any) => {
  return (
    <View style={tw` flex-1 relative`}>
      {/* Drawer Content */}
      <DrawerContentScrollView
        style={tw` flex-1`}
        contentContainerStyle={tw``} // Add this prop
        {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Custom Button at the bottom */}
      <View style={tw` p-4 text-gray-200`}>
        <TouchableOpacity>
          <ThemedText size="h3">Logout</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(CustomDrawer);
