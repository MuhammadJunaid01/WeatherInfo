import React, {useCallback, useState} from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from '../../../tailwind';
import {moderateScale} from '../../config/constants';

interface IProps extends TextInputProps {
  isDarkMode: boolean;
  iconName: string;
  isPasswordField?: boolean;
  isShowInputIcon?: boolean;
  iconSize?: number;
  containerStyle?: StyleProp<ViewProps>;
}

const ThemedInput: React.FC<IProps> = ({
  isDarkMode,
  iconName,
  isPasswordField = false,
  isShowInputIcon = true,
  iconSize = 20,
  containerStyle,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const inputStyles = useCallback(() => {
    return tw.style(
      `h-full rounded-lg px-[${moderateScale(40)}px] py-3 text-[${moderateScale(
        14,
      )}px] `,
      isFocused
        ? isDarkMode
          ? 'border-blue-500 border-2 text-white'
          : 'border-blue-700 border-2'
        : isDarkMode
        ? 'bg-gray-800 text-white'
        : 'bg-gray-50 text-gray-800',
    );
  }, [isFocused, isDarkMode]);

  const getIconColor = useCallback(
    () => (isDarkMode ? 'text-white' : 'text-gray-400'),
    [isDarkMode],
  );
  return (
    <View style={tw`relative h-[${moderateScale(55)}px]`}>
      {isShowInputIcon && (
        <View
          style={[
            tw`absolute top-[${moderateScale(18)}px] left-3 z-10`,
            containerStyle,
          ]}>
          <Icon
            name={iconName}
            size={moderateScale(iconSize)}
            style={tw`${getIconColor()}`}
          />
        </View>
      )}
      <TextInput
        {...rest}
        secureTextEntry={isPasswordField && !showPassword}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={inputStyles()}
      />
      {isPasswordField && (
        <View
          style={tw`absolute top-[${moderateScale(
            18,
          )}px] right-[${moderateScale(12)}px] z-10`}>
          <Icon
            name={showPassword ? 'visibility' : 'visibility-off'}
            size={moderateScale(20)}
            style={tw`${getIconColor()}`}
            onPress={togglePasswordVisibility}
          />
        </View>
      )}
    </View>
  );
};

export default React.memo(ThemedInput);
