import React, {memo, useCallback} from 'react';
import {Text, TextProps} from 'react-native';
import {scale} from 'react-native-size-matters';
import tw from '../../../tailwind';

type SIze = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface IProps extends TextProps {
  size: SIze;
  color?: string;
}

const ThemedText: React.FC<IProps> = ({
  size: variant,
  children,
  color = 'text-gray-500',
  style,
  ...rest
}) => {
  const textStyle = useCallback(() => {
    let styleIn = {};
    switch (variant) {
      case 'h1':
        styleIn = {
          fontSize: scale(21),
          fontWeight: 'bold' as 'bold',
        };
        break;
      case 'h2':
        styleIn = {
          fontSize: scale(17),
          fontWeight: 'bold' as 'bold',
        };
        break;
      case 'h3':
        styleIn = {
          fontSize: scale(13),
          fontWeight: '600' as '600',
        };
        break;
      case 'h4':
        styleIn = {
          fontSize: scale(12.5),
          lineHeight: 21,
          fontWeight: '500' as '500',
        };
        break;
      case 'h5':
        styleIn = {
          fontSize: scale(11),
          fontWeight: '400' as '400',
        };
        break;
      case 'h6':
        styleIn = {
          fontSize: scale(9),
          fontWeight: '300' as '300',
        };
        break;
      default:
        styleIn = {};
        break;
    }

    // Apply dynamic text color here
    return {
      ...styleIn,
      ...(typeof style === 'object' ? style : {}),
    };
  }, [style, variant]);

  const combinedStyle = textStyle();

  return (
    <Text style={[combinedStyle, tw`${color}`]} {...rest}>
      {children}
    </Text>
  );
};

export default memo(ThemedText);
