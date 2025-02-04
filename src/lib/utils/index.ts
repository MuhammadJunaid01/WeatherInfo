import {ToastAndroid} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const showToast = (msg = 'This is a toast message!') => {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
};

export const isMobile = (): boolean => {
  const deviceType = DeviceInfo.getDeviceType(); // Returns 'Handset', 'Tablet', 'Tv', etc.
  return deviceType === 'Handset';
};
