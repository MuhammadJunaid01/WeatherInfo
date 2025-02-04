import NetInfo from '@react-native-community/netinfo';
import {apiSlice} from '../../services/apis/apiSlice';
import {showToast} from '../utils';

export const customNetworkMiddleware =
  (_store: any) => (next: any) => async (action: any) => {
    const netInfo = await NetInfo.fetch();
    const isConnected = netInfo.isConnected;

    // If network is unavailable, block the request and return
    if (!isConnected && action.type.startsWith(apiSlice.reducerPath)) {
      showToast('Network unavailable. Returning cached data.');
      return;
    }

    return next(action);
  };
