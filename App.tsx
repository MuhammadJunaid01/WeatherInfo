/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NetworkProvider} from 'react-native-offline';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {AppNavigator} from './src/navigation';
import store, {persistor} from './src/services/store';
import tw from './tailwind';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NetworkProvider>
          <GestureHandlerRootView style={tw` flex-1`}>
            <BottomSheetModalProvider>
              <AppNavigator />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </NetworkProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
