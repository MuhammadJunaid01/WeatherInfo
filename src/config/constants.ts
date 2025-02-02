import {Dimensions} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').width;
const COLORS = {
  primary: '#0CC6B6',
};
export {
  COLORS,
  moderateScale,
  moderateVerticalScale,
  scale,
  screenHeight,
  screenWidth,
  verticalScale,
};
