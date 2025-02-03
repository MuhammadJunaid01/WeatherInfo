import React, {useCallback, useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';
import {Theme} from '../../lib';

interface ThemeToggleProps {
  currentTheme: Theme;
  onThemeChange?: (theme: Theme) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const themes: Theme[] = useMemo(() => ['light', 'dark', 'system'], []);

  const getIcon = useCallback(
    (theme: Theme) => {
      const iconColor = currentTheme === theme ? '#000' : '#6B7280';

      switch (theme) {
        case 'light':
          return (
            <Icon name="white-balance-sunny" size={20} color={iconColor} />
          );
        case 'dark':
          return (
            <Icon name="moon-waning-crescent" size={20} color={iconColor} />
          );
        case 'system':
          return <Icon name="desktop-mac" size={20} color={iconColor} />;
      }
    },
    [currentTheme],
  );

  return (
    <View style={tw`flex-row  bg-transparent rounded-lg p-1`}>
      {themes.map(theme => (
        <TouchableOpacity
          key={theme}
          onPress={() => onThemeChange?.(theme)}
          style={tw`
            flex-1 
            flex-row 
            items-center 
            justify-center 
            px-3 
            py-2 
            rounded-md
            ${currentTheme === theme ? 'bg-white shadow-sm' : ''}
          `}>
          {getIcon(theme)}
          <Text
            style={tw`
              ml-2 
              text-sm 
              font-medium
              ${currentTheme === theme ? 'text-gray-900' : 'text-gray-500'}
            `}>
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default React.memo(ThemeToggle);
