import {ToastAndroid} from 'react-native';

export const showToast = (msg = 'This is a toast message!') => {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
};
