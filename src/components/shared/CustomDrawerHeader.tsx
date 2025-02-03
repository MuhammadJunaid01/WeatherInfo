import {DrawerHeaderProps} from '@react-navigation/drawer';
import React, {useCallback, useMemo} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import {MenuIcon, NotificationIcon} from '../../assets/icons';
import {COLORS} from '../../config/constants';
import {Theme} from '../../lib';
import {FirebaseUser} from '../../lib/shared.interface';
import ThemedText from './ThemedText';
import ThemedView from './ThemedView';

interface CustomDrawerHeaderProps extends DrawerHeaderProps {
  title?: string;
  showNotification?: boolean;
  notificationCount?: number;
  theme: Theme;
  user?: FirebaseUser | null;
}

const CustomDrawerHeader: React.FC<CustomDrawerHeaderProps> = ({
  navigation,
  title = 'Home',
  showNotification = true,
  notificationCount = 0,
  user,
  theme,
}) => {
  // Use useMemo to avoid unnecessary recalculations
  const {iconColor, signUpButtonColor} = useMemo(() => {
    const isDarkTheme = theme === 'dark';
    return {
      iconColor: isDarkTheme ? COLORS.dark.secondary : COLORS.light.secondary,
      signUpButtonColor: isDarkTheme ? COLORS.dark.primary : COLORS.primary,
    };
  }, [theme]);

  const handleMenuPress = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  const handleNotificationPress = useCallback(() => {
    navigation.navigate('Notification');
  }, [navigation]);

  return (
    <ThemedView
      style={tw`h-16 flex-row items-center justify-between px-4 shadow-sm`}>
      {/* Left Section - Menu and Title */}
      <View style={tw`flex-row items-center bg-transparent`}>
        <TouchableOpacity
          onPress={handleMenuPress}
          style={tw`mr-3 p-2`}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <MenuIcon size={22} fill={iconColor} />
        </TouchableOpacity>
        <ThemedText size="h3">{title}</ThemedText>
      </View>

      {/* Right Section - Notifications and Profile */}
      <View style={tw`flex-row items-center`}>
        {showNotification && (
          <TouchableOpacity
            onPress={handleNotificationPress}
            style={tw`mr-4 relative p-2`}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <NotificationIcon size={22} fill={iconColor} />
            {notificationCount > 0 && (
              <View
                style={tw`absolute top-0 right-0 bg-red-500 rounded-full h-5 w-5 items-center justify-center`}>
                <ThemedText size="h3" style={tw`text-white text-xs font-bold`}>
                  {notificationCount > 99 ? '99+' : notificationCount}
                </ThemedText>
              </View>
            )}
          </TouchableOpacity>
        )}

        {user && user.photoURL ? (
          <Image
            source={{uri: user.photoURL}}
            style={tw`h-8 w-8 rounded-full`}
            resizeMode="cover"
          />
        ) : !user ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}
            style={[
              tw`h-8 w-auto px-4 rounded-full items-center justify-center`,
              {backgroundColor: signUpButtonColor},
            ]}>
            <ThemedText size="h4" style={tw`text-white`}>
              SignUp
            </ThemedText>
          </TouchableOpacity>
        ) : null}
      </View>
    </ThemedView>
  );
};

export default CustomDrawerHeader;
