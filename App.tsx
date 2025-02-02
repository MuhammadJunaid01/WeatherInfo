/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View} from 'react-native';
import 'react-native-gesture-handler';

import {Provider} from 'react-redux';
import SignUp from './src/components/SignUp';
import store from './src/services/store';

function App(): React.JSX.Element {
  return (
    <View style={{flex: 1}}>
      <Provider store={store}>
        <SignUp />
      </Provider>
    </View>
  );
}

export default App;
