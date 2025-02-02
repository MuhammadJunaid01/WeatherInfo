import React, {useMemo} from 'react';
import {
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import tw from 'twrnc';
import {COLORS} from '../../config/constants';
import {useAppSelector} from '../../hooks/useReduxHooks';

interface IProps extends ViewProps {
  children?: React.ReactNode;
}

const ThemedView: React.FC<IProps> = ({style, children, ...rest}) => {
  const {theme} = useAppSelector(state => state.theme); // User-defined theme
  const systemTheme = useColorScheme(); // System theme detection: 'light' or 'dark'

  // Determine the active theme
  const activeTheme = theme === 'system' ? systemTheme : theme;

  // Memoize styles for better performance
  const dynamicStyle: StyleProp<ViewStyle> = useMemo(() => {
    return activeTheme === 'dark'
      ? {
          backgroundColor: COLORS.dark.primary,
        }
      : {
          backgroundColor: COLORS.light.primary,
        };
  }, [activeTheme]);

  return (
    <View style={[tw.style(dynamicStyle), style]} {...rest}>
      {children}
    </View>
  );
};

export default React.memo(ThemedView);
