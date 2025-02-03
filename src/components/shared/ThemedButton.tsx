import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import tw from '../../../tailwind';
import {COLORS} from '../../config/constants';
import {Size} from '../../lib';
import ThemedText from './ThemedText';
interface IProps extends TouchableOpacityProps {
  isDarkMode: boolean;
  size: Size;
  textAlign?: 'center' | 'start';
}
const ThemedButton: React.FC<IProps> = ({
  isDarkMode,
  size,
  style,
  children,
  textAlign = 'center',
  ...rest
}) => {
  const buttonStyle = isDarkMode
    ? tw`bg-[${COLORS.dark.primary}]`
    : tw`bg-[${COLORS.light.primary}]`;

  const textStyle = isDarkMode
    ? {color: COLORS.dark.secondary}
    : {color: COLORS.light.secondary};

  return (
    <TouchableOpacity
      style={[
        buttonStyle,
        tw`${
          isDarkMode ? `border border-[${COLORS.primary}]` : ''
        } rounded-lg p-4`,
        style,
      ]}
      {...rest}>
      <ThemedText
        size={size}
        style={[
          tw` ${textAlign === 'center' ? 'text-center' : ''} `,
          textStyle,
        ]}>
        {children}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default React.memo(ThemedButton);
