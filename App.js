import React from 'react';
import AppNavigator from './src'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont()

import configureStore from './src/redux/store'
const { persistor, store } = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator/>
      </PersistGate>
    </Provider>
  )
};

export default App;
