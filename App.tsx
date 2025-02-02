/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';

import {NetworkProvider} from 'react-native-offline';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {AppNavigator} from './src/navigation';
import store, {persistor} from './src/services/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NetworkProvider>
          <AppNavigator />
        </NetworkProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
