import {apiSlice} from '../../services/apis/apiSlice';

export const customNetworkMiddleware =
  (store: any) => (next: any) => (action: any) => {
    const state = store.getState();
    const isConnected = state.network.isConnected;

    // If network is unavailable, block the request and return
    if (!isConnected && action.type.startsWith(apiSlice.reducerPath)) {
      console.warn('Network unavailable. Request blocked:', action.type);
      return;
    }

    return next(action);
  };
