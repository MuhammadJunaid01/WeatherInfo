import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import tw from '../../tailwind';
import {Theme} from '../lib';
import {ThemedText, ThemedView, ThemeToggle} from './shared';
interface IProps {
  props: any;
  theme: Theme;
  onThemeChange?: (theme: Theme) => void;
}
const CustomDrawer: React.FC<IProps> = ({props, theme, onThemeChange}) => {
  return (
    <ThemedView style={tw` flex-1 relative`}>
      {/* Drawer Content */}
      <DrawerContentScrollView
        style={tw` flex-1`}
        contentContainerStyle={tw``} // Add this prop
        {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <ThemeToggle currentTheme={theme} onThemeChange={onThemeChange} />
      {/* Custom Button at the bottom */}
      <View style={tw` p-4 text-gray-200`}>
        <TouchableOpacity>
          <ThemedText size="h3">Logout</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

export default React.memo(CustomDrawer);
