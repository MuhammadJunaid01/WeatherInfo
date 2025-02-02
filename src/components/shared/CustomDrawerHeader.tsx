import {DrawerHeaderProps} from '@react-navigation/drawer';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import {MenuIcon, NotificationIcon} from '../../assets/icons';
import {COLORS} from '../../config/constants';
import {FirebaseUser} from '../../lib/shared.interface';
import ThemedText from './ThemedText';

interface CustomDrawerHeaderProps extends DrawerHeaderProps {
  title?: string;
  showNotification?: boolean;
  notificationCount?: number;
  user?: FirebaseUser | null;
}

const CustomDrawerHeader: React.FC<CustomDrawerHeaderProps> = ({
  navigation,
  title = 'Home',
  showNotification = true,
  notificationCount = 0,
  user,
}) => {
  const handleMenuPress = () => {
    navigation.openDrawer();
  };

  const handleNotificationPress = () => {
    // Handle notification press
    navigation.navigate('Notification');
  };

  const handleProfilePress = () => {
    // Handle profile press
    navigation.navigate('Profile');
  };

  return (
    <View
      style={tw`bg-white h-16 flex-row items-center justify-between px-4 shadow-sm`}>
      {/* Left Section - Menu and Title */}
      <View style={tw`flex-row items-center`}>
        <TouchableOpacity
          onPress={handleMenuPress}
          style={tw`mr-3 p-2`}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <MenuIcon size={22} />
          {/* <Icon name="menu" size={24} style={tw`text-gray-800`} /> */}
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold text-gray-800`}>{title}</Text>
      </View>

      {/* Right Section - Notifications and Profile */}
      <View style={tw`flex-row items-center`}>
        {showNotification && (
          <TouchableOpacity
            onPress={handleNotificationPress}
            style={tw`mr-4 relative p-2`}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <NotificationIcon size={22} />
            {/* <Icon
              name="notifications-none"
              size={24}
              style={tw`text-gray-800`}
            /> */}
            {notificationCount > 0 && (
              <View
                style={tw`absolute top-0 right-0 bg-red-500 rounded-full h-5 w-5 items-center justify-center`}>
                <Text style={tw`text-white text-xs font-bold`}>
                  {notificationCount > 99 ? '99+' : notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={handleProfilePress}
          style={tw`relative`}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          {user && user?.photoURL ? (
            <Image
              source={{uri: user.photoURL}}
              style={tw`h-8 w-8 rounded-full`}
              resizeMode="cover"
            />
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}
              style={tw`h-8 w-auto px-4 rounded-full bg-[${COLORS.primary}] items-center justify-center`}>
              <ThemedText size="h4" color="text-white">
                SignUp
              </ThemedText>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawerHeader;
