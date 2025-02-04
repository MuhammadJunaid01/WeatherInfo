import NetInfo from '@react-native-community/netinfo';
import {apiSlice} from '../../services/apis/apiSlice';

export const customNetworkMiddleware =
  (_store: any) => (next: any) => async (action: any) => {
    const netInfo = await NetInfo.fetch();
    const isConnected = netInfo.isConnected;

    // If network is unavailable, block the request and return
    if (!isConnected && action.type.startsWith(apiSlice.reducerPath)) {
      console.warn('Network unavailable. Request blocked:', action.type);
      return;
    }

    return next(action);
  };
