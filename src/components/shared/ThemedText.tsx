import React, {memo, useMemo} from 'react';
import {Text, TextProps, TextStyle} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../config/constants';
import {useAppSelector} from '../../hooks/useReduxHooks';
import {Size} from '../../lib';

interface IProps extends TextProps {
  size: Size;
  color?: keyof typeof COLORS.light; // Restrict to keys in COLORS
}

const ThemedText: React.FC<IProps> = ({
  size: variant,
  children,
  color = 'secondary', // Default to secondary text color
  style,
  ...rest
}) => {
  const {theme} = useAppSelector(state => state.theme); // Get the active theme

  // Determine the active color scheme based on the theme
  const themeColors = useMemo(() => {
    return theme === 'dark' ? COLORS.dark : COLORS.light;
  }, [theme]);

  // Define text styles based on the size variant
  const textStyle = useMemo(() => {
    const baseStyle: TextStyle = {
      color: themeColors[color], // Use theme color dynamically
    };

    switch (variant) {
      case 'h1':
        return {
          ...baseStyle,
          fontSize: moderateScale(21),
          fontWeight: 'bold' as TextStyle['fontWeight'],
        };
      case 'h2':
        return {
          ...baseStyle,
          fontSize: moderateScale(17),
          fontWeight: 'bold' as TextStyle['fontWeight'],
        };
      case 'h3':
        return {
          ...baseStyle,
          fontSize: moderateScale(13),
          fontWeight: '600' as TextStyle['fontWeight'],
        };
      case 'h4':
        return {
          ...baseStyle,
          fontSize: moderateScale(12.5),
          lineHeight: 21,
          fontWeight: '500' as TextStyle['fontWeight'],
        };
      case 'h5':
        return {
          ...baseStyle,
          fontSize: moderateScale(11),
          fontWeight: '400' as TextStyle['fontWeight'],
        };
      case 'h6':
        return {
          ...baseStyle,
          fontSize: moderateScale(9),
          fontWeight: '300' as TextStyle['fontWeight'],
        };
      default:
        return baseStyle;
    }
  }, [variant, themeColors, color]);

  // Combine text styles with additional styles
  const combinedStyle = useMemo(() => {
    return [textStyle, style];
  }, [textStyle, style]);

  return (
    <Text style={combinedStyle} {...rest}>
      {children}
    </Text>
  );
};

export default memo(ThemedText);
